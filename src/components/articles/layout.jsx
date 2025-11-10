'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Footer } from '@/components/articles/footer'
import { Hero } from '@/components/articles/hero'
import { MobileNavigation } from '@/components/articles/mobile-navigation'
import { Navigation } from '@/components/articles/navigation'
import { Search } from '@/components/articles/search'
import { ThemeSelector } from '@/components/articles/theme-selector'
import { Link } from '@/components/home/link'
import { LanguageDropdown } from '@/components/home/language-dropdown'
import { MobileLanguageDropdown } from '@/components/articles/mobile-language-dropdown'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'

function getTopLinks(t, locale) {
  return [
    { href: getLocalizedUrl('/articles', locale), label: t('navbar.articles') },
    { href: getLocalizedUrl('/podcasts', locale), label: t('navbar.podcasts') },
    { href: getLocalizedUrl('/events', locale), label: t('navbar.events') },
    { href: getLocalizedUrl('/contact-us', locale), label: t('navbar.contactUs') },
  ]
}

function Header() {
  const { t, locale } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const topLinks = getTopLinks(t, locale)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 bg-white/95 px-4 py-2 shadow-md shadow-slate-900/5 backdrop-blur transition-[padding] duration-300 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-teal-900/10 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/10'
          : 'dark:bg-transparent',
      )}
    >
      <div className="w-full">
        <div className="grid min-h-[48px] w-full grid-cols-3 items-center gap-x-4 md:grid-cols-3">
          <div className="flex items-center justify-start md:hidden">
            <Link href="/" title="Home" className="group flex items-center gap-2">
              <img src="/images/lab2life-no-bg.png" alt="Lab2Life" className="h-10 w-auto" />
              <span className="inline-block origin-center transform-gpu bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-300 bg-clip-text text-lg font-semibold text-transparent transition-transform duration-300 ease-out group-hover:scale-110 group-hover:via-violet-500 motion-reduce:transition-none motion-reduce:hover:scale-100">
                Lab2Life
              </span>
            </Link>
          </div>

          <div className="hidden items-center justify-start md:flex">
            <Link href="/" title="Home" className="group flex items-center gap-3">
              <img src="/images/lab2life-no-bg.png" alt="Lab2Life" className="h-14 w-auto" />
              <span className="inline-block origin-center transform-gpu bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-300 bg-clip-text text-2xl font-semibold text-transparent transition-transform duration-300 ease-out group-hover:scale-110 group-hover:via-violet-500 motion-reduce:transition-none motion-reduce:hover:scale-100">
                Lab2Life
              </span>
            </Link>
          </div>

          <div className="flex min-w-0 justify-center">
            <div className="hidden w-full max-w-lg md:block">
              <Search />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="mr-2 flex items-center gap-2 lg:hidden">
              <MobileLanguageDropdown />
              <MobileNavigation />
            </div>

            <nav aria-label="Primary" className="relative hidden lg:flex">
              {topLinks.map(({ href, label }) => {
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`)
                return (
                  <div key={href} className="flex items-center">
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={clsx(
                        'inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                        'data-hover:bg-black/5 dark:data-hover:bg-white/10 focus:outline-none focus-visible:ring',
                        'text-slate-700 dark:text-white/80',
                      )}
                    >
                      {label}
                    </Link>
                    {label === t('navbar.contactUs') && (
                      <div className="ml-2">
                        <LanguageDropdown />
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <ThemeSelector className="relative z-10" />
          </div>
        </div>
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
        'right-30 bottom-124 fixed z-50 h-12 w-12 rounded-full',
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
  let isIntroPage = pathname === '/articles'

  return (
    <div className="flex w-full flex-col">
      <Header />
      {isIntroPage && <Hero />}
      <div className="max-w-8xl relative mx-auto flex w-full flex-auto justify-center sm:px-2 lg:max-w-full lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-white dark:hidden" />
          <div className="bg-linear-to-t absolute bottom-0 right-0 top-16 hidden h-12 w-px from-slate-800 dark:block" />
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div className="top-19 sticky -ml-0.5 h-[calc(100vh-4.75rem)] w-[26rem] overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-2 xl:w-[26rem] xl:pr-4">
            <Navigation />
          </div>
        </div>
        {children}
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}
