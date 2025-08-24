'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/docs/Hero'
import { MobileNavigation } from '@/components/docs/MobileNavigation'
import { Navigation } from '@/components/docs/Navigation'
import { Search } from '@/components/docs/Search'
import { ThemeSelector } from '@/components/docs/ThemeSelector'

function Header() {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-teal-900/10 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/10'
          : 'dark:bg-transparent',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center" />
      <div className="-my-5 mr-6 items-center sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        <ThemeSelector className="relative z-10" />
      </div>
    </header>
  )
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 10
      setVisible(atBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={scrollToTop}
      className={clsx(
        'fixed right-7 bottom-14 z-50 h-12 w-12 rounded-full',
        'bg-white text-slate-700 shadow-md ring-1 ring-black/10 hover:shadow-lg',
        'transition-all duration-200 focus:outline-none focus-visible:ring',
        'dark:bg-teal-900/80 dark:text-white dark:ring-white/10',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="mx-auto h-6 w-6">
        <path d="M10 4l6 6-1.4 1.4L11 7.8V16H9V7.8L5.4 11.4 4 10l6-6z" fill="currentColor" />
      </svg>
      <span className="sr-only">Go to top</span>
    </button>
  )
}

export function Layout({ children }) {
  let pathname = usePathname()
  let isDocsPage = pathname === '/docs'

  return (
    <div className="flex w-full flex-col">
      <Header />
      {isDocsPage && <Hero />}
      <div className="max-w-8xl relative mx-auto flex w-full flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 right-0 bottom-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
            <Navigation />
          </div>
        </div>
        {children}
      </div>
      <ScrollToTopButton />
    </div>
  )
}
