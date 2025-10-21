import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'

import { navigation } from '@/lib/articles/navigation'

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()
  const { locale } = useLanguage()

  const categoryTranslationsFr = {
    'Clinical Support': 'Soutien clinique',
    'Medical Law': 'Droit médical',
    Rehabilitation: 'Réadaptation',
    'Mental Health': 'Santé mentale',
    'Psychology/Mental Health': 'Psychologie/Santé mentale',
    Pediatrics: 'Pédiatrie',
  }

  const frenchArticleTitleOverrides = {
    '/articles/power-clinical-support': 'Le pouvoir du soutien clinique',
    '/articles/body-mind-psyche': 'Le corps, l\'esprit et la psyché',
  }

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {locale === 'fr' ? categoryTranslationsFr[section.title] ?? section.title : section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-200/50"
            >
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={getLocalizedUrl(link.href, locale)}
                    onClick={onLinkClick}
                    className={clsx(
                      'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                      (pathname === getLocalizedUrl(link.href, locale) || pathname === link.href)
                        ? 'font-inter-semibold bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-300 bg-clip-text text-transparent'
                        : 'font-inter-medium text-slate-500/70 before:hidden before:bg-slate-300 hover:bg-gradient-to-r hover:from-indigo-300 hover:via-violet-400 hover:to-indigo-300 hover:bg-clip-text hover:text-transparent hover:before:block dark:text-slate-300/90 dark:before:bg-white dark:hover:text-slate-300',
                    )}
                  >
                    {locale === 'fr'
                      ? (frenchArticleTitleOverrides[link.href]
                          ? frenchArticleTitleOverrides[link.href]
                          : link.href === '/articles/nuclear-medicine-technologists'
                            ? 'Technologue en médecine nucléaire'
                            : `${link.title} (anglais)`)
                      : (link.href === '/articles/power-clinical-support'
                          ? 'The Power of Clinical Support'
                          : link.href === '/articles/nuclear-medicine-technologists'
                            ? 'Nuclear Medicine Technologists'
                            : link.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
