'use client'

import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/contexts/LanguageContext'

export default function SignUpSuccess() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="rounded-4xl absolute inset-2 bottom-0 ring-1 ring-inset ring-black/5" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <Heading as="h2" className="mb-4 text-3xl font-bold text-[#003e3e]">
              {t('memberSignUp.successModal.title') || 'Success!'}
            </Heading>
            <p className="mb-12 text-xl text-[#003e3e]">
              {t('memberSignUp.successModal.message') || 'Thank you for signing up as a uOttawa Lab2Life general member!'}
            </p>

            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <button
                onClick={() => router.push('/general-member-sign-up')}
                className="w-[65%] rounded-full bg-[#99c96f] px-8 py-3 font-semibold text-[#003e3e] shadow-md transition-all duration-300 hover:bg-white hover:border hover:border-[#003e3e]"
              >
                {t('memberSignUp.successModal.buttons.backToForm') || 'Back to Form'}
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-[65%] rounded-full bg-[#003e3e] px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-white hover:border hover:border-[#003e3e] hover:text-[#003e3e]"
              >
                {t('memberSignUp.successModal.buttons.backToHomepage') || 'Back to Homepage'}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
