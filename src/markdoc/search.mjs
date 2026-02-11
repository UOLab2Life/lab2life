import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
    }
  }
}

function extractEnglishContentFromJsx(source) {
  let match = source.match(/const\s+englishContent\s*=\s*`([\s\S]*?)`/)
  return match ? match[1] : null
}

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let pagesDir = path.join(process.cwd(), 'src/app')
            this.addContextDependency(pagesDir)

            let markdownFiles = glob.sync('**/page.md', { cwd: pagesDir })
            let jsxArticleFiles = glob.sync('articles/**/page.jsx', { cwd: pagesDir })

            let mdData = markdownFiles.map((file) => {
              let url = file === 'page.md' ? '/' : `/${file.replace(/\/page\.md$/, '')}`
              let md = fs.readFileSync(path.join(pagesDir, file), 'utf8')

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title = ast.attributes?.frontmatter?.match(/^title:\s*(.*?)\s*$/m)?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            })

            let jsxData = jsxArticleFiles
              .map((file) => {
                let url = `/${file.replace(/\/page\.jsx$/, '')}`
                let source = fs.readFileSync(path.join(pagesDir, file), 'utf8')
                let md = extractEnglishContentFromJsx(source)
                if (!md) return null

                let sections

                if (cache.get(file)?.[0] === md) {
                  sections = cache.get(file)[1]
                } else {
                  let ast = Markdoc.parse(md)
                  let title = ast.attributes?.frontmatter?.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1]
                  sections = [[title, null, []]]
                  extractSections(ast, sections)
                  cache.set(file, [md, sections])
                }

                return { url, sections }
              })
              .filter(Boolean)

            // Prefer markdown pages when both representations exist for the same URL.
            let dataByUrl = new Map()
            for (let item of jsxData) dataByUrl.set(item.url, item)
            for (let item of mdData) dataByUrl.set(item.url, item)
            let data = [...dataByUrl.values()]

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'forward',
                document: {
                  id: 'url',
                  index: ['title', 'pageTitle', 'content'],
                  store: ['title', 'pageTitle', 'content'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                  })
                }
              }

              export function search(query, options = {}) {
                let normalizedQuery = String(query || '').trim().toLowerCase()
                if (!normalizedQuery) {
                  return []
                }

                let requestedLimit = Math.max(1, Number(options.limit ?? 5))
                let candidateLimit = requestedLimit * 6
                let scoreById = new Map()
                let docById = new Map()

                let searches = [
                  { index: 'title', weight: 7 },
                  { index: 'pageTitle', weight: 4 },
                  { index: 'content', weight: 1 },
                ]

                for (let searchConfig of searches) {
                  let resultGroups = sectionIndex.search(normalizedQuery, {
                    ...options,
                    enrich: true,
                    suggest: true,
                    index: searchConfig.index,
                    limit: candidateLimit,
                  })

                  for (let group of resultGroups || []) {
                    let rankedResults = group?.result || []
                    for (let rank = 0; rank < rankedResults.length; rank++) {
                      let item = rankedResults[rank]
                      if (!item?.id || !item?.doc) continue

                      let previousScore = scoreById.get(item.id) || 0
                      let rrfScore = searchConfig.weight / (rank + 1)
                      scoreById.set(item.id, previousScore + rrfScore)
                      docById.set(item.id, item.doc)
                    }
                  }
                }

                // Exact substring boosts improve precision for short queries.
                for (let [id, doc] of docById.entries()) {
                  let title = String(doc.title || '').toLowerCase()
                  let pageTitle = String(doc.pageTitle || '').toLowerCase()
                  let content = String(doc.content || '').toLowerCase()
                  let boost = 0
                  if (title.includes(normalizedQuery)) boost += 20
                  if (pageTitle.includes(normalizedQuery)) boost += 8
                  if (content.includes(normalizedQuery)) boost += 2
                  scoreById.set(id, (scoreById.get(id) || 0) + boost)
                }

                return [...scoreById.entries()]
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, requestedLimit)
                  .map(([id]) => {
                    let doc = docById.get(id) || {}
                    return {
                      url: id,
                      title: doc.title,
                      pageTitle: doc.pageTitle,
                    }
                  })
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
