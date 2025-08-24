'use client' // Client-side component

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/docs/Hero'
import { Logo } from '@/components/docs/Logo'
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
          ? 'dark:bg-tea-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
      {/*
      <Link href="/docs" aria-label="Home page">
        <Logo className="hidden h-9 w-auto fill-slate-700 lg:block dark:fill-violet-100" />
      </Link>
      \*/}
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0 items-center">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
        <ThemeSelector className="relative z-10" />
      </div>
    </header>
  )
}

export function Layout({ children }) {
  let pathname = usePathname()
  let isDocsPage = pathname === '/docs'
  return (
    <div className="flex w-full flex-col">
      <Header />
      {isDocsPage && <Hero />}
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
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
    </div>
  )
}
