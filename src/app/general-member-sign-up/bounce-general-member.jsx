import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'

export function BounceGeneralMember() {
  return (
    <>
      <style jsx>{`
        @keyframes ringPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 62, 62, 1);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(0, 62, 62, 0.6);
          }
        }
        .ring-pulse {
          animation: ringPulse 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="bg-white py-4 sm:py-8">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div className="flex-shrink-0">
            <a
              href="https://www.bouncelife.com/organizations/6883b3e4772d78e56dfd977c"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-white p-6 shadow-lg ring-2 ring-[#003e3e] transition-all duration-300 hover:ring-4 hover:shadow-xl ring-pulse"
            >
              <img
                src="/images/home/bouncelifelogo.png"
                alt="Bounce Life Logo"
                className="h-26 w-26 sm:h-34 sm:w-34 lg:h-44 lg:w-44"
              />
            </a>
          </div>

          <div className="text-center lg:ml-12 lg:text-left lg:flex-1">
            <Heading as="h3" className="mb-4 font-bold text-[#003e3e]">
              Register our events through Bounce
            </Heading>
            <p className="text-lg text-gray-600">
              New with the 2025-2026 academic year, the University of Ottawa has partnered up with
              Bounce to provide you with an easy yet accessible way to register for our events.
              You'll also be able to submit photos of our events through Bounce to share the fun
              times you had with everyone!
            </p>
          </div>
        </div>
      </Container>
    </div>
    </>
  )
}
