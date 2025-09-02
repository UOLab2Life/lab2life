import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import dotenv from 'dotenv'
import { readdir, readFile, stat } from 'fs/promises'
import matter from 'gray-matter'
import OpenAI from 'openai'
import { basename, dirname, join, sep } from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

dotenv.config()

const DOCS_DIR = 'src/app/articles/newsletters'
const SOURCE = 'articles'
const PAGE_TYPE = 'markdown'
const MODEL = 'text-embedding-3-small'
const ignoredFiles = []

const toRoutePath = (absPath) => {
  const norm = absPath.replaceAll(sep, '/')
  const root = DOCS_DIR.replaceAll(sep, '/')
  let p = norm.replace(new RegExp(`^${root}`), '').replace(/\.md$/i, '')
  if (!p.startsWith('/')) p = `/${p}`
  return p
}

const slugify = (s) =>
  s
    ?.toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const sha256b64 = (text) => createHash('sha256').update(text).digest('base64')

function splitByHeadings(markdown) {
  const lines = markdown.split('\n')
  const sections = []
  let current = []
  const pushSection = () => {
    if (current.length) sections.push(current.join('\n').trim())
    current = []
  }
  for (const line of lines) {
    if (/^#{1,6}\s+/.test(line)) {
      pushSection()
      current.push(line)
    } else {
      current.push(line)
    }
  }
  pushSection()
  return sections.filter(Boolean)
}

async function walk(dir, parentPath) {
  const entries = await readdir(dir)
  const out = []
  for (const name of entries) {
    const p = join(dir, name)
    const s = await stat(p)
    if (s.isDirectory()) {
      const docName = `${basename(p)}.md`
      const hasDirDoc = entries.includes(docName)
      const newParent = hasDirDoc ? join(dirname(p), docName) : parentPath
      out.push(...(await walk(p, newParent)))
    } else if (s.isFile() && /\.md$/i.test(p)) {
      out.push({ path: p, parentPath })
    }
  }
  return out
    .sort((a, b) => a.path.localeCompare(b.path))
    .filter(({ path }) => !ignoredFiles.includes(path))
}

function processMarkdown(content) {
  const { content: md, data } = matter(content)
  const checksum = sha256b64(md)
  const rawSections = splitByHeadings(md)
  const sections = rawSections.map((sec) => {
    const headingMatch = sec.match(/^#{1,6}\s+(.+)$/m)
    const heading = headingMatch ? headingMatch[1].trim() : undefined
    const slug = heading ? slugify(heading) : undefined
    return { heading, slug, content: sec }
  })
  return { checksum, meta: Object.keys(data || {}).length ? data : undefined, sections }
}

async function main() {
  const argv = yargs(hideBin(process.argv)).option('refresh', {
    alias: 'r',
    type: 'boolean',
    description: 'Rebuild all pages (ignore checksum)',
  }).argv

  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_KEY } = process.env
  if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_KEY) {
    console.error(
      'Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_KEY',
    )
    process.exit(1)
  }

  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const openai = new OpenAI({ apiKey: OPENAI_KEY })

  const discovered = await walk(DOCS_DIR)
  const mdFiles = discovered.filter(({ path }) => /\.md$/i.test(path))
  console.log(`Discovered Markdown files: ${mdFiles.length} (root: ${DOCS_DIR})`)
  console.log(argv.refresh ? 'Full refresh mode' : 'Processing new/changed pages')

  for (const entry of mdFiles) {
    const filePath = entry.path
    const parentFilePath = entry.parentPath
    const routePath = toRoutePath(filePath)
    const parentRoutePath = parentFilePath ? toRoutePath(parentFilePath) : null

    try {
      const raw = await readFile(filePath, 'utf8')
      const { checksum, meta, sections } = processMarkdown(raw)

      const { data: existingPage, error: fetchErr } = await supabase
        .from('nods_page')
        .select('id, path, checksum, parent_page_id')
        .eq('path', routePath)
        .maybeSingle()
      if (fetchErr) throw fetchErr

      let parentPageId = null
      if (parentRoutePath) {
        const { data: parentPage, error: parentErr } = await supabase
          .from('nods_page')
          .select('id')
          .eq('path', parentRoutePath)
          .maybeSingle()
        if (parentErr) throw parentErr
        parentPageId = parentPage?.id ?? null
      }

      if (!argv.refresh && existingPage?.checksum === checksum) {
        if (existingPage?.parent_page_id !== parentPageId) {
          await supabase
            .from('nods_page')
            .update({ parent_page_id: parentPageId })
            .eq('id', existingPage.id)
          console.log(`[${routePath}] Updated parent relationship only`)
        } else {
          console.log(`[${routePath}] No changes; skipped`)
        }
        continue
      }

      if (existingPage?.id) {
        const { error: delErr } = await supabase
          .from('nods_page_section')
          .delete()
          .eq('page_id', existingPage.id)
        if (delErr) throw delErr
      }

      const { data: page, error: upsertErr } = await supabase
        .from('nods_page')
        .upsert(
          {
            path: routePath,
            type: PAGE_TYPE,
            source: SOURCE,
            meta,
            parent_page_id: parentPageId,
            checksum: null,
          },
          { onConflict: 'path' },
        )
        .select()
        .single()
      if (upsertErr) throw upsertErr

      console.log(`[${routePath}] Inserting ${sections.length} sections with embeddings`)
      for (const { slug, heading, content } of sections) {
        const input = content.replace(/\s+/g, ' ').trim()
        const emb = await openai.embeddings.create({ model: MODEL, input })
        const vector = emb.data[0].embedding
        const tokens = emb.usage?.total_tokens ?? null
        const { error: insErr } = await supabase.from('nods_page_section').insert({
          page_id: page.id,
          slug,
          heading,
          content,
          token_count: tokens,
          embedding: vector,
        })
        if (insErr) throw insErr
      }

      const { error: chkErr } = await supabase
        .from('nods_page')
        .update({ checksum })
        .eq('id', page.id)
      if (chkErr) throw chkErr

      console.log(`[${routePath}] Done`)
    } catch (e) {
      console.error(`[${routePath}] Error`)
      console.error(e)
    }
  }

  console.log('Embedding generation complete.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
