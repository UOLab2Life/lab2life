import { DocsHeader } from '@/components/articles/docs-header'
import { PrevNextLinks } from '@/components/articles/prev-next-links'
import { Prose } from '@/components/articles/prose'
import { TableOfContents } from '@/components/articles/table-of-contents'
import { collectSections } from '@/lib/articles/sections'

export function DocsLayout({ children, frontmatter: { title }, nodes }) {
  let tableOfContents = collectSections(nodes)

  return (
    <>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:pl-16 xl:pr-4">
        <article>
          <DocsHeader title={title} />
          <Prose>{children}</Prose>
        </article>
        <PrevNextLinks />
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  )
}
