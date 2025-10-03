'use client'

import { Gradient } from '@/components/home/gradient'
import { Container } from '@/components/home/container'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'
import { Button } from '@/components/home/button'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'

export function Hero() {
  const { t, locale } = useTranslation()
  
  return (
    <div className="relative">
      <Gradient className="rounded-4xl absolute inset-2 bottom-0 ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar />
        <div className="pb-24 pt-16 text-center sm:pb-32 sm:pt-24 sm:text-left md:pb-48 md:pt-32">
          <Heading
            as="h1"
            className="text-balance text-6xl/[0.9] tracking-tight text-white sm:text-8xl/[0.8] md:text-9xl/[0.8]"
          >
            uOttawa Lab2Life
          </Heading>
          <p className="font-inter-semibold mx-auto mt-8 max-w-2xl text-xl/7 text-white/90 sm:mx-0 sm:text-2xl/8">
            {t('home.hero.description') || 'Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.'}
          </p>
          <div className="mt-12 flex flex-row justify-center gap-3 sm:justify-start sm:gap-6">
            <Button
              href={getLocalizedUrl('/general-member-sign-up', locale)}
              className="w-[70%] sm:w-auto px-4 py-2 text-center text-xs sm:px-6 sm:py-3 sm:text-base"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {t('home.hero.button') || 'General Member Sign-Up'}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
