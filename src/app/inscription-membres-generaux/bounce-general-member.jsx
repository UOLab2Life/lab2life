import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'
import { useTranslation } from '@/contexts/LanguageContext'

export function BounceGeneralMember() {
  const { t, locale } = useTranslation()
  
  // Use French dashboard URL for French language, English for others
  const bounceUrl = locale === 'fr' 
    ? 'https://www.bouncelife.com/organizations/6883b3e4772d78e56dfd977c/dashboard'
    : 'https://www.bouncelife.com/organizations/6883b3e4772d78e56dfd977c'

  return (
    <>
      <style jsx>{`
        @keyframes ringPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 62, 62, 1);
          }
          50% {
            box-shadow: 0 0 0 2px rgba(0, 62, 62, 0.6);
          }
        }
        .ring-pulse {
          animation: ringPulse 1.5s ease-in-out infinite;
        }
        .desktop-zoom {
          transform: scale(1.25);
          transform-origin: center;
        }
         @media (max-width: 640px) {
           .mobile-zoom {
             transform: scale(1.7);
             transform-origin: center;
             animation: ringPulse 1.5s ease-in-out infinite;
             border-radius: 1rem;
           }
         }
      `}</style>
      <div className="bg-white py-4 sm:py-8">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
          <div className="flex-shrink-0">
            <a
              href={bounceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-white p-6 shadow-lg ring-2 ring-[#003e3e] transition-all duration-300 hover:ring-4 hover:shadow-xl ring-pulse"
            >
               <img
                 src="/images/home/bouncelifelogo.png"
                 alt="Bounce Life Logo"
                 className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-cover object-center mobile-zoom desktop-zoom"
               />
            </a>
          </div>

          <div className="text-center lg:ml-12 lg:text-left lg:flex-1">
            <Heading as="h3" className="mb-3 font-bold text-[#003e3e] text-lg lg:text-xl">
              {t('memberSignUp.successModal.bounce.title') || 'Register for our events through Bounce'}
            </Heading>
            <p className="text-sm lg:text-base text-gray-600">
              {t('memberSignUp.successModal.bounce.description') || 'New with the 2025-2026 academic year, the University of Ottawa has partnered up with Bounce to provide you with an easy yet accessible way to register for our events. You\'ll also be able to submit photos of our events through Bounce to share the fun times you had with everyone!'}
            </p>
          </div>
        </div>
      </Container>
    </div>
    </>
  )
}
