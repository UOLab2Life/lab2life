'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'

import { Navigation } from '@/components/articles/navigation'

const topLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/events', label: 'Events' },
  { href: '/contact-us', label: 'Contact Us' },
]

function CloseOnNavigation({ close }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    close()
  }, [pathname, searchParams, close])
  return null
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const close = useCallback(() => setIsOpen(false), [])

  function onLinkClick(event) {
    const link = event.currentTarget
    if (
      link.pathname + link.search + link.hash ===
      window.location.pathname + window.location.search + window.location.hash
    ) {
      close()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <div className="relative flex h-5 w-5 items-center justify-center">
          <span
            className={`absolute h-0.5 w-4 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute h-0.5 w-4 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-2'}`}
          />
          <span
            className={`absolute h-0.5 w-4 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'top-4'}`}
          />
        </div>
      </button>

      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>

      <Dialog
        open={isOpen}
        onClose={close}
        className="fixed inset-0 z-[60] flex items-start overflow-y-auto bg-black/40 pr-10 backdrop-blur-sm lg:hidden"
        aria-label="Navigation"
      >
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 sm:px-6 dark:bg-teal-900">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-base font-semibold text-slate-700 dark:text-white/90">Menu</span>
            <button type="button" onClick={close} aria-label="Close navigation">
              <div className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute h-0.5 w-4 rotate-45 transform bg-slate-500" />
                <span className="absolute h-0.5 w-4 -rotate-45 transform bg-slate-500" />
              </div>
            </button>
          </div>

          <nav aria-label="Primary (mobile)" className="mb-6 space-y-1">
            {topLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-black/5 dark:text-white/85 dark:hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-200 pt-4 dark:border-white/10">
            <Navigation className="px-1" onLinkClick={onLinkClick} />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}
