import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'
import { formatEventDate } from '@/lib/date-formatting'

import { navigation } from '@/lib/articles/navigation'

const articleMetaByHref = {
  '/articles/field-sports-medicine': { author: 'Maroun Tarabey', date: '2026-02-01' },
  '/articles/clinical-pharmacometricians-modern-medicine': { author: 'Anoosha Rehman', date: '2026-01-25' },
  '/articles/science-safety-toxicology': { author: 'Lacey Mullin', date: '2026-01-21' },
  '/articles/world-pharmacology-pharmacy-business': { author: 'Maroun Tarabey', date: '2026-01-19' },
  '/articles/closer-look-forensic-pathology': { author: 'Lacey Mullin', date: '2025-11-28' },
  '/articles/regard-approfondi-pathologie-medico-legale': { author: 'Lacey Mullin', date: '2025-11-28' },
  '/articles/forensic-scientists-bring-justice': { author: 'Anoosha Rehman', date: '2025-11-15' },
  '/articles/investigating-cells-crime': { author: 'Maroun Tarabey', date: '2025-11-03' },
  '/articles/crisis-intervention-workers': { author: 'Anoosha Rehman', date: '2025-11-02' },
  '/articles/psychometrists-mental-health': { author: 'Lacey Mullin', date: '2025-10-24' },
  '/articles/body-mind-psyche': { author: 'Maroun Tarabey', date: '2025-10-13' },
  '/articles/nuclear-medicine-technologists': { author: 'Lacey Mullin', date: '2025-09-30' },
  '/articles/power-clinical-support': { author: 'Anoosha Rehman', date: '2025-09-16' },
}

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()
  const { locale } = useLanguage()
  const isMedicalLawSection = (section) =>
    section.links?.some(
      (link) =>
        link.href === '/articles/legal-nurse-consultant' ||
        link.href === '/articles/medical-law-introduction',
    )

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        <li>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
            2025-26
          </h2>
        </li>
        {navigation[locale].map((section) => (
          <li key={section.title}>
            {isMedicalLawSection(section) && (
              <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
                2024-25
              </h2>
            )}
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-200/50"
            >
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  {(() => {
                    const isActive =
                      pathname === getLocalizedUrl(link.href, locale) || pathname === link.href
                    const meta = articleMetaByHref[link.href]
                    const author = meta?.author || 'uOttawa Lab2Life'
                    const dateLabel = meta?.date
                      ? locale === 'fr'
                        ? `Le ${formatEventDate(meta.date, null, 'fr')}`
                        : formatEventDate(meta.date, null, 'en')
                      : locale === 'fr'
                        ? 'À venir'
                        : 'TBD'
                    const byline = `${author} | ${dateLabel}`

                    return (
                  <Link
                    href={getLocalizedUrl(link.href, locale)}
                    onClick={onLinkClick}
                    className={clsx(
                      'group block w-full pl-3.5 pr-4 before:pointer-events-none before:absolute before:top-[0.65rem] before:-left-1 before:h-1.5 before:w-1.5 before:rounded-full',
                      isActive
                        ? 'before:block before:bg-violet-400'
                        : 'before:hidden before:bg-slate-300 hover:before:block dark:before:bg-white',
                    )}
                  >
                    <span
                      className={clsx(
                        'block text-base leading-snug lg:text-lg',
                        isActive
                          ? 'font-inter-semibold bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-300 bg-clip-text text-transparent'
                          : 'font-inter-medium text-slate-600 group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-violet-400 group-hover:to-indigo-300 group-hover:bg-clip-text group-hover:text-transparent dark:text-slate-300/90',
                      )}
                    >
                      {link.title}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-slate-400 dark:text-slate-400/90">
                      {byline}
                    </span>
                  </Link>
                    )
                  })()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
