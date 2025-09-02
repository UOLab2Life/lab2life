import { DocsHeader } from '@/components/articles/DocsHeader'
import { PrevNextLinks } from '@/components/articles/PrevNextLinks'
import { Prose } from '@/components/articles/Prose'
import { TableOfContents } from '@/components/articles/TableOfContents'
import { collectSections } from '@/lib/docs/sections'

export function DocsLayout({ children, frontmatter: { title }, nodes }) {
  let tableOfContents = collectSections(nodes)

  return (
    <>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
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
