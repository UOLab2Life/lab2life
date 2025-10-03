'use client'

import { navigation } from '@/lib/articles/navigation'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getOriginalPath } from '@/lib/url-localization'

export function DocsHeader({ title }) {
  const { locale } = useLanguage()
  let pathname = usePathname()
  const originalPath = getOriginalPath(pathname, locale)
  let section = navigation.find((section) => section.links.find((link) => link.href === originalPath))

  const categoryTranslationsFr = {
    'Clinical Support': 'Soutien clinique',
    'Medical Law': 'Droit médical',
    Rehabilitation: 'Réadaptation',
    'Mental Health': 'Santé mentale',
    Pediatrics: 'Pédiatrie',
  }

  if (!title && !section) {
    return null
  }

  return (
    <header className="mb-9 space-y-1">
      {section && (
        <p className="font-display text-sm font-medium text-white">
          {locale === 'fr' ? categoryTranslationsFr[section.title] ?? section.title : section.title}
        </p>
      )}
      {title && (
        <h1 className="text-3xl text-slate-900 dark:bg-gradient-to-r dark:from-indigo-300 dark:via-violet-400 dark:to-indigo-300 dark:bg-clip-text dark:font-display dark:text-3xl dark:font-semibold dark:tracking-tight dark:text-transparent">
          {title}
        </h1>
      )}
    </header>
  )
}
