'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'

import { Navigation } from '@/components/articles/navigation'

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
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span
            className={`absolute h-0.5 w-3 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'top-0'}`}
          ></span>
          <span
            className={`absolute h-0.5 w-3 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-1.5'}`}
          ></span>
          <span
            className={`absolute h-0.5 w-3 transform bg-slate-500 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'top-3'}`}
          ></span>
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
        <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 sm:px-6 dark:bg-teal-900">
          <div className="flex items-center">
            <button type="button" onClick={() => close()} aria-label="Close navigation">
              <div className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute h-0.5 w-3 rotate-45 transform bg-slate-500"></span>
                <span className="absolute h-0.5 w-3 -rotate-45 transform bg-slate-500"></span>
              </div>
            </button>
          </div>
          <Navigation className="mt-5 px-1" onLinkClick={onLinkClick} />
        </DialogPanel>
      </Dialog>
    </>
  )
}
