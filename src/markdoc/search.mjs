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

            let mdFiles = glob.sync('**/page.md', { cwd: pagesDir })
            let jsxFiles = glob.sync('**/page.jsx', { cwd: pagesDir })
            
            let processMdFile = (file) => {
              let url = file === 'page.md' ? '/' : \`/\${file.replace(/\\/page\\.md$/, '')}\`
              let md = fs.readFileSync(path.join(pagesDir, file), 'utf8')

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title = ast.attributes?.frontmatter?.match(/^title:\\s*(.*?)\\s*$/m)?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            }

            let processJsxFile = (file) => {
              let url = \`/\${file.replace(/\\/page\\.jsx$/, '')}\`
              let content = fs.readFileSync(path.join(pagesDir, file), 'utf8')

              // Extract markdown from englishContent template string
              // Match: const englishContent = `...` (handles multi-line with [\\s\\S])
              let mdMatch = content.match(/const\\s+englishContent\\s*=\\s*\`([\\s\\S]*?)\`/)
              if (!mdMatch) {
                return null
              }

              let md = mdMatch[1]

              let sections

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title = ast.attributes?.frontmatter?.match(/^title:\\s*(.*?)\\s*$/m)?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            }

            let data = [
              ...mdFiles.map(processMdFile),
              ...jsxFiles.map(processJsxFile).filter(Boolean)
            ]

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: ['title', 'section', 'content'],
                  store: ['title', 'pageTitle', 'section', 'content'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                let pageTitle = sections[0]?.[0] || null
                let allBodyText = []
                
                for (let [title, hash, content] of sections) {
                  if (hash === null) {
                    // This is the page title - add as title-only entry
                    sectionIndex.add({
                      url: url,
                      title: title,
                      section: '',
                      content: '',
                      pageTitle: title,
                    })
                  } else {
                    // This is a section heading
                    allBodyText.push(...content)
                    sectionIndex.add({
                      url: url + (hash ? ('#' + hash) : ''),
                      title: pageTitle || title,
                      section: title,
                      content: content.join('\\n'),
                      pageTitle: pageTitle,
                    })
                  }
                }
                
                // Add a full-page entry for body text search (without hash)
                if (allBodyText.length > 0 && pageTitle) {
                  sectionIndex.add({
                    url: url,
                    title: pageTitle,
                    section: '',
                    content: allBodyText.join('\\n'),
                    pageTitle: pageTitle,
                  })
                }
              }

              export function search(query, options = {}) {
                let limit = options.limit || 5
                let seen = new Set()
                let results = []
                
                // Search title field first (highest priority)
                let titleResults = sectionIndex.search(query, {
                  limit: limit * 2,
                  enrich: true,
                  field: 'title',
                })
                
                if (titleResults.length > 0 && titleResults[0].result) {
                  for (let item of titleResults[0].result) {
                    let key = item.id.split('#')[0] // Use base URL to avoid duplicates
                    if (!seen.has(key) && results.length < limit) {
                      seen.add(key)
                      results.push({
                        url: item.id,
                        title: item.doc.title,
                        pageTitle: item.doc.pageTitle,
                      })
                    }
                  }
                }
                
                // Search section field second (medium priority)
                if (results.length < limit) {
                  let sectionResults = sectionIndex.search(query, {
                    limit: limit * 2,
                    enrich: true,
                    field: 'section',
                  })
                  
                  if (sectionResults.length > 0 && sectionResults[0].result) {
                    for (let item of sectionResults[0].result) {
                      let key = item.id.split('#')[0]
                      if (!seen.has(key) && results.length < limit) {
                        seen.add(key)
                        results.push({
                          url: item.id,
                          title: item.doc.title,
                          pageTitle: item.doc.pageTitle,
                        })
                      }
                    }
                  }
                }
                
                // Search content field last (lowest priority)
                if (results.length < limit) {
                  let contentResults = sectionIndex.search(query, {
                    limit: limit * 2,
                    enrich: true,
                    field: 'content',
                  })
                  
                  if (contentResults.length > 0 && contentResults[0].result) {
                    for (let item of contentResults[0].result) {
                      let key = item.id.split('#')[0]
                      if (!seen.has(key) && results.length < limit) {
                        seen.add(key)
                        results.push({
                          url: item.id,
                          title: item.doc.title,
                          pageTitle: item.doc.pageTitle,
                        })
                      }
                    }
                  }
                }
                
                return results
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
