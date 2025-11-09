'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'
import { LanguageDropdown } from './language-dropdown'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'

function getLinks(t, locale) {
  return [
    { href: getLocalizedUrl('/articles', locale), label: t('navbar.articles') || 'Articles' },
    { href: getLocalizedUrl('/podcasts', locale), label: t('navbar.podcasts') || 'Podcasts' },
    { href: getLocalizedUrl('/events', locale), label: t('navbar.events') || 'Events' },
    { href: getLocalizedUrl('/contact-us', locale), label: t('navbar.contactUs') || 'Contact Us' },
  ]
}

function DesktopNav() {
  const { t, locale } = useTranslation()
  const links = getLinks(t, locale)
  
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="data-hover:bg-white/10 flex items-center px-4 py-3 text-base font-semibold text-white bg-blend-multiply"
          >
            {label}
          </Link>
          {label === (t('navbar.contactUs') || 'Contact Us') && (
            <div className="ml-1 flex items-center">
              <LanguageDropdown />
            </div>
          )}
        </PlusGridItem>
      ))}
    </nav>
  )
}

function MobileLanguageDropdown() {
  const { locale, changeLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' }
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="data-hover:bg-white/20 flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-white/20"
        aria-label="Select language"
      >
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span>{currentLanguage.name}</span>
        <svg 
          className={`h-2.5 w-2.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-20 rounded-md bg-white shadow-lg ring-1 ring-black/5">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-1 px-2 py-1.5 text-left text-xs transition-colors first:rounded-t-md last:rounded-b-md ${
                language.code === locale
                  ? 'bg-[#003e3e] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg lg:hidden"
      aria-label="Open main menu"
    >
      {({ open }) => (
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span
            className={`absolute h-0.5 w-3 transform bg-white transition-all duration-300 ease-in-out ${open ? 'rotate-45' : 'top-0'}`}
          ></span>
          <span
            className={`absolute h-0.5 w-3 transform bg-white transition-all duration-300 ease-in-out ${open ? 'opacity-0' : 'top-1.5'}`}
          ></span>
          <span
            className={`absolute h-0.5 w-3 transform bg-white transition-all duration-300 ease-in-out ${open ? '-rotate-45' : 'top-3'}`}
          ></span>
        </div>
      )}
    </DisclosureButton>
  )
}

function MobileNav() {
  const { t, locale } = useTranslation()
  const links = getLinks(t, locale)
  
  return (
    <DisclosurePanel className="lg:hidden" key={locale}>
      <div className="flex flex-col gap-6 py-4 pl-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={`${href}-${locale}`}
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
  const { t, locale } = useTranslation()
  
  const bannerHref = getLocalizedUrl('/podcasts/6', locale)
  const bannerText =
    locale === 'fr'
      ? 'NOUVEAU! Psychology of Motivation & Procrastination w/ Dr. Rylee Oram'
      : 'NEW! Psychology of Motivation & Procrastination with Dr. Rylee Oram'

  const defaultBanner = (
    <Link
      href={bannerHref}
      className="data-hover:bg-[#99c96f]/30 flex items-center gap-1 rounded-full bg-[#99c96f]/35 px-2 py-0.5 text-xs font-semibold text-white sm:px-3 sm:text-sm/6"
    >
      {shortText ? (
        <>
          <span className="xs:inline hidden">{bannerText}</span>
          <span className="xs:hidden">{bannerText}</span>
        </>
      ) : (
        <>
          <span className="xs:inline hidden">{bannerText}</span>
          <span className="xs:hidden">{bannerText}</span>
        </>
      )}
      <ChevronRightIcon className="size-3 sm:size-4" />
    </Link>
  )

  return (
    <Disclosure as="header" className="relative z-40 pt-12 sm:pt-16">
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
          <div className="flex items-center gap-2 lg:hidden">
            <MobileLanguageDropdown />
            <MobileNavButton />
          </div>
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}
