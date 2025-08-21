import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import dotenv from 'dotenv'
import { readdir, readFile, stat } from 'fs/promises'
import GithubSlugger from 'github-slugger'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import matter from 'gray-matter'
import { basename, dirname, join } from 'path'
import { u } from 'unist-builder'
import { inspect } from 'util'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const DOCS_DIR = 'src/app/docs/newsletters'

// Optional: ignore specific files (relative to project root)
const ignoredFiles = [
  // e.g., 'src/app/docs/newsletters/drafts/example.md'
]

/**
 * Split a mdast tree into multiple trees at nodes matching `predicate`.
 * The splitting node is included at the start of the new tree.
 */
function splitTreeBy(tree, predicate) {
  return tree.children.reduce((trees, node) => {
    const [lastTree] = trees.slice(-1)
    if (!lastTree || predicate(node)) {
      const t = u('root', [node])
      return trees.concat(t)
    }
    lastTree.children.push(node)
    return trees
  }, [])
}

/**
 * Process Markdown content:
 * - compute checksum
 * - parse optional YAML front-matter as `meta`
 * - strip any non-markdown (safety filter—handles edge cases)
 * - split into sections by headings
 */
function processMarkdownForSearch(fileContents) {
  // Extract YAML front-matter (if any)
  const { content, data } = matter(fileContents)
  const checksum = createHash('sha256').update(content).digest('base64')

  const mdTree = fromMarkdown(content)

  const cleanTree = mdTree

  const sectionTrees = splitTreeBy(cleanTree, (node) => node.type === 'heading')
  const slugger = new GithubSlugger()

  const sections = sectionTrees.map((tree) => {
    const [firstNode] = tree.children
    const heading = firstNode?.type === 'heading' ? toString(firstNode) : undefined
    const slug = heading ? slugger.slug(heading) : undefined
    return {
      content: toMarkdown(tree),
      heading,
      slug,
    }
  })

  return {
    checksum,
    meta: Object.keys(data || {}).length ? data : undefined,
    sections,
  }
}

/**
 * Recursively walk a directory, capturing files and optional parent doc path.
 * If a directory contains a doc named after the directory, we treat it as a parent.
 */
async function walk(dir, parentPath) {
  const immediateFiles = await readdir(dir)
  const recursiveFiles = await Promise.all(
    immediateFiles.map(async (file) => {
      const path = join(dir, file)
      const stats = await stat(path)
      if (stats.isDirectory()) {
        // A directory-level doc named like the directory establishes hierarchy
        const docPath = `${basename(path)}.md`
        return walk(
          path,
          immediateFiles.includes(docPath) ? join(dirname(path), docPath) : parentPath,
        )
      } else if (stats.isFile()) {
        return [{ path, parentPath }]
      } else {
        return []
      }
    }),
  )

  const flattened = recursiveFiles.reduce((all, x) => all.concat(x), [])
  return flattened.sort((a, b) => a.path.localeCompare(b.path))
}

class BaseEmbeddingSource {
  constructor(source, path, parentPath) {
    this.source = source
    this.path = path
    this.parentPath = parentPath
    this.checksum = undefined
    this.meta = undefined
    this.sections = undefined
  }
  async load() {
    throw new Error('load() must be implemented by subclasses')
  }
}

class MarkdownEmbeddingSource extends BaseEmbeddingSource {
  type = 'markdown'
  constructor(source, filePath, parentFilePath) {
    // Convert a file system path inside DOCS_DIR to a route-like path
    // e.g., src/app/docs/newsletters/2024/wk-01.md  ->  /2024/wk-01
    const routePath = filePath.replace(new RegExp(`^${DOCS_DIR}`), '').replace(/\.md$/, '')
    const parentRoutePath =
      parentFilePath && parentFilePath.replace(new RegExp(`^${DOCS_DIR}`), '').replace(/\.md$/, '')
    super(source, routePath, parentRoutePath)
    this.filePath = filePath
    this.parentFilePath = parentFilePath
  }

  async load() {
    const contents = await readFile(this.filePath, 'utf8')
    const { checksum, meta, sections } = processMarkdownForSearch(contents)
    this.checksum = checksum
    this.meta = meta
    this.sections = sections
    return { checksum, meta, sections }
  }
}

async function generateEmbeddings() {
  const argv = yargs(hideBin(process.argv)).option('refresh', {
    alias: 'r',
    description: 'Refresh data',
    type: 'boolean',
  }).argv

  const shouldRefresh = argv.refresh

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.OPENAI_KEY
  ) {
    console.log(
      'Environment variables NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_KEY are required: skipping embeddings generation',
    )
    return
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )

  const discovered = (await walk(DOCS_DIR))
    .filter(({ path }) => /\.md$/.test(path))
    .filter(({ path }) => !ignoredFiles.includes(path))

  const embeddingSources = discovered.map(
    (entry) => new MarkdownEmbeddingSource('newsletter', entry.path, entry.parentPath),
  )

  console.log(`Discovered ${embeddingSources.length} Markdown files under ${DOCS_DIR}`)

  console.log(
    shouldRefresh
      ? 'Refresh flag set, re-generating all pages'
      : 'Checking which pages are new or have changed',
  )

  const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY })
  const openai = new OpenAIApi(configuration)

  for (const embeddingSource of embeddingSources) {
    const { type, source, path, parentPath } = embeddingSource

    try {
      const { checksum, meta, sections } = await embeddingSource.load()

      // Look up existing page by path
      const { error: fetchPageError, data: existingPage } = await supabase
        .from('nods_page')
        .select('id, path, checksum, parentPage:parent_page_id(id, path)')
        .filter('path', 'eq', path)
        .limit(1)
        .maybeSingle()

      if (fetchPageError) throw fetchPageError

      const existingParentPage = existingPage?.parentPage

      if (!shouldRefresh && existingPage?.checksum === checksum) {
        // Parent change only
        if (existingParentPage?.path !== parentPath) {
          console.log(`[${path}] Parent page changed -> '${parentPath}'`)
          const { error: fetchParentPageError, data: parentPage } = await supabase
            .from('nods_page')
            .select()
            .filter('path', 'eq', parentPath)
            .limit(1)
            .maybeSingle()
          if (fetchParentPageError) throw fetchParentPageError

          const { error: updatePageError } = await supabase
            .from('nods_page')
            .update({ parent_page_id: parentPage?.id })
            .filter('id', 'eq', existingPage.id)
          if (updatePageError) throw updatePageError
        }
        continue
      }

      if (existingPage) {
        console.log(
          `[${path}] ${shouldRefresh ? 'Refreshing' : 'Changed'} -> deleting old sections`,
        )
        const { error: deleteSectionsErr } = await supabase
          .from('nods_page_section')
          .delete()
          .filter('page_id', 'eq', existingPage.id)
        if (deleteSectionsErr) throw deleteSectionsErr
      }

      // Resolve parent page (if any)
      const { error: fetchParentPageError, data: parentPage } = await supabase
        .from('nods_page')
        .select()
        .filter('path', 'eq', parentPath)
        .limit(1)
        .maybeSingle()
      if (fetchParentPageError) throw fetchParentPageError

      // Upsert the page (blank checksum until sections are created)
      const { error: upsertErr, data: page } = await supabase
        .from('nods_page')
        .upsert(
          { checksum: null, path, type, source, meta, parent_page_id: parentPage?.id },
          { onConflict: 'path' },
        )
        .select()
        .limit(1)
        .single()
      if (upsertErr) throw upsertErr

      console.log(`[${path}] Adding ${sections.length} sections (with embeddings)`)

      for (const { slug, heading, content } of sections) {
        const input = content.replace(/\n/g, ' ')

        try {
          // Updated to a newer model
          const embeddingResponse = await openai.createEmbedding({
            model: 'text-embedding-3-small',
            input,
          })

          if (embeddingResponse.status !== 200) {
            throw new Error(inspect(embeddingResponse.data, false, 2))
          }

          const [responseData] = embeddingResponse.data.data

          const { error: insertErr } = await supabase
            .from('nods_page_section')
            .insert({
              page_id: page.id,
              slug,
              heading,
              content,
              token_count: embeddingResponse.data.usage.total_tokens,
              embedding: responseData.embedding,
            })
            .select()
            .limit(1)
            .single()
          if (insertErr) throw insertErr
        } catch (err) {
          console.error(
            `Failed to generate embeddings for '${path}' section starting '${input.slice(0, 40)}...'`,
          )
          throw err
        }
      }

      const { error: updateChecksumErr } = await supabase
        .from('nods_page')
        .update({ checksum })
        .filter('id', 'eq', page.id)
      if (updateChecksumErr) throw updateChecksumErr
    } catch (err) {
      console.error(
        `Page '${path}' or one/multiple sections failed to store properly. Checksum left null to signal regeneration is needed.`,
      )
      console.error(err)
    }
  }

  console.log('Embedding generation complete')
}

async function main() {
  await generateEmbeddings()
}

main().catch((err) => console.error(err))