'use client'

import { usePathname } from 'next/navigation'

import { navigation } from '@/lib/articles/navigation'

export function DocsHeader({ title }) {
  let pathname = usePathname()
  let section = navigation.find((section) => section.links.find((link) => link.href === pathname))

  if (!title && !section) {
    return null
  }

  return (
    <header className="mb-9 space-y-1">
      {section && <p className="font-display text-sm font-medium text-white">{section.title}</p>}
      {title && (
        <h1 className="text-3xl text-slate-900 dark:bg-gradient-to-r dark:from-indigo-300 dark:via-violet-400 dark:to-indigo-300 dark:bg-clip-text dark:font-display dark:text-3xl dark:font-semibold dark:tracking-tight dark:text-transparent">
          {title}
        </h1>
      )}
    </header>
  )
}
