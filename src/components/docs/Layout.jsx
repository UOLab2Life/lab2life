'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/docs/Hero'
import { MobileNavigation } from '@/components/docs/MobileNavigation'
import { Navigation } from '@/components/docs/Navigation'
import { Search } from '@/components/docs/Search'
import { ThemeSelector } from '@/components/docs/ThemeSelector'
import { Link } from '@/components/home/link'



const links = [
  { href: '/about-us', label: 'About Us' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/events', label: 'Events' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: 'https://docs.google.com/forms/d/e/1FAIpQLSewC51k_HA8eiH2uq7czDqACoDJOycguuuLbUzcqT1td8glkg/viewform', label: 'Sign Up' },
]


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
    'sticky top-0 z-50 bg-white/95 backdrop-blur px-4 py-2 sm:px-6 lg:px-8 shadow-md shadow-slate-900/5 transition-[padding] duration-300 dark:shadow-none',
    isScrolled
      ? 'dark:bg-teal-900/10 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/10'
      : 'dark:bg-transparent',
  )}
>
  <div className="w-full">
    <div className="grid w-full grid-cols-2 md:grid-cols-3 items-center gap-x-4 min-h-[48px]">

      <div className="hidden md:flex items-center justify-start">
<div className="hidden md:flex items-center justify-start">
          <Link href="/" title="Home" className="group flex items-center gap-3">
    <img src="/lab2life-no-bg.png" alt="Lab2Life" className="h-8 w-auto" />
    <span
      className="
        font-display tracking-tight leading-none
        text-lg lg:text-xl xl:text-2xl
        text-slate-700
        dark:text-transparent dark:bg-clip-text
        dark:bg-gradient-to-r dark:from-indigo-300 dark:via-violet-400 dark:to-indigo-300
        transition-[background-size,color] duration-200
        dark:group-hover:via-violet-500
      "
    >
      Lab2Life
    </span>
  </Link>
</div>



      </div>

      <div className="min-w-0 flex justify-center">
        <div className="w-full max-w-lg">
          <Search />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="mr-2 flex lg:hidden">
          <MobileNavigation />
        </div>

<nav className="hidden items-center lg:flex gap-1">
  {links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className="group relative flex items-center px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-md"
    >
<span
  className="
    font-display tracking-tight leading-none text-lg
    text-slate-600
    dark:text-transparent dark:bg-clip-text
    dark:bg-gradient-to-r dark:from-indigo-300 dark:via-violet-400 dark:to-indigo-300
    transition-[background-size] duration-200
    dark:group-hover:via-violet-500
  "
>
  {label}
</span>


    </Link>
  ))}
</nav>


        <ThemeSelector className="relative z-10" />
      </div>
    </div>
  </div>
</header> 
)}

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
