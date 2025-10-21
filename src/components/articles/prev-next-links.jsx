'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

import { navigation } from '@/lib/articles/navigation'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z" />
    </svg>
  )
}

function PageLink({ title, href, dir = 'next', ...props }) {
  return (
    <div {...props}>
      <dd className="mt-1">
        <Link
          href={href}
          className={clsx(
            'flex items-center gap-x-1 text-base font-semibold text-gray-600 dark:text-white',
            dir === 'previous' && 'flex-row-reverse',
          )}
        >
          {title}
          <ArrowIcon
            className={clsx('h-4 w-4 flex-none fill-current', dir === 'previous' && '-scale-x-100')}
          />
        </Link>
      </dd>
    </div>
  )
}

export function PrevNextLinks() {
  const { locale } = useLanguage()
  let pathname = usePathname()
  let allLinks = navigation[locale].flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === pathname)
  let previousPage = linkIndex > -1 ? allLinks[linkIndex - 1] : null
  let nextPage = linkIndex > -1 ? allLinks[linkIndex + 1] : null

  if (!nextPage && !previousPage) {
    return null
  }

  return (
    <dl className="mt-12 flex pt-6">
      {previousPage && <PageLink dir="previous" {...previousPage} />}
      {nextPage && <PageLink className="ml-auto text-right" {...nextPage} />}
    </dl>
  )
}
