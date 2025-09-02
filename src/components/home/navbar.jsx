'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'

const links = [
  { href: '/about-us', label: 'About Us' },
  { href: '/articles', label: 'Articles' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/events', label: 'Events' },
  { href: '/contact-us', label: 'Contact Us' },
]

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-semibold text-white bg-blend-multiply data-hover:bg-white/10"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-white/10 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6 text-white" />
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-semibold text-white">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ showBanner = true, shortText = false }) {
  // paste Bounce Link Here
  const defaultBanner = (
    <Link
      href="https://www.bouncelife.com/events/68b1e5c58c7d8ac1d03a23f9"
      target="_blank"
      className="flex items-center gap-1 rounded-full bg-[#99c96f]/35 px-2 py-0.5 text-xs font-semibold text-white data-hover:bg-[#99c96f]/30 sm:px-3 sm:text-sm/6"
    >
      {shortText ? (
        <>
          <span className="xs:inline hidden">Club Fair - Sept 3rd, 2025</span>
          <span className="xs:hidden">Club Fair - Sept 3rd, 2025</span>
        </>
      ) : (
        <>
          <span className="xs:inline hidden">uOttawa Lab2Life Club Fair - September 3rd, 2025</span>
          <span className="xs:hidden">uOttawa Lab2Life Club Fair - September 3rd, 2025</span>
        </>
      )}
      <ChevronRightIcon className="size-3 sm:size-4" />
    </Link>
  )

  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {showBanner && (
              <div className="relative hidden items-center py-3 lg:flex">{defaultBanner}</div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}
