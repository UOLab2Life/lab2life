'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'

import { Navigation } from '@/components/articles/Navigation'

function MenuIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  )
}

function CloseOnNavigation({ close }) {
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    close()
  }, [pathname, searchParams, close])

  return null
}

export function MobileNavigation() {
  let [isOpen, setIsOpen] = useState(false)
  let close = useCallback(() => setIsOpen(false), [setIsOpen])

  function onLinkClick(event) {
    let link = event.currentTarget
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
        <div className="relative w-4 h-4 flex items-center justify-center">
          <span className={`absolute w-3 h-0.5 bg-slate-500 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'top-0'}`}></span>
          <span className={`absolute w-3 h-0.5 bg-slate-500 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-1.5'}`}></span>
          <span className={`absolute w-3 h-0.5 bg-slate-500 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'top-3'}`}></span>
        </div>
      </button>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>
      <Dialog
        open={isOpen}
        onClose={() => close()}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-teal-900/50 pr-10 backdrop-blur-sm lg:hidden"
        aria-label="Navigation"
      >
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 sm:px-6 dark:bg-teal-900">
          <div className="flex items-center">
            <button type="button" onClick={() => close()} aria-label="Close navigation">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <span className="absolute w-3 h-0.5 bg-slate-500 transform rotate-45"></span>
                <span className="absolute w-3 h-0.5 bg-slate-500 transform -rotate-45"></span>
              </div>
            </button>
          </div>
          <Navigation className="mt-5 px-1" onLinkClick={onLinkClick} />
        </DialogPanel>
      </Dialog>
    </>
  )
}
