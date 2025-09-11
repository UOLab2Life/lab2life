import { Button } from '@/components/home/button'
import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'

export function Bounce() {
  return (
    <div className="bg-white py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div className="flex-shrink-0">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
              <img
                src="/images/home/bouncelifelogo.png"
                alt="Bounce Life Logo"
                className="h-32 w-32 sm:h-48 sm:w-48 lg:h-80 lg:w-80"
              />
            </div>
          </div>

          <div className="text-center lg:ml-12 lg:text-left">
            <Heading as="h3" className="mb-4 font-bold text-[#003e3e]">
              Register our events through Bounce
            </Heading>
            <p className="mb-8 max-w-2xl text-lg text-gray-600">
              New with the 2025-2026 academic year, the University of Ottawa has partnered up with
              Bounce to provide you with an easy yet accessible way to register for our events.
              You'll also be able to submit photos of our events through Bounce to share the fun
              times you had with everyone!
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                href="https://www.bouncelife.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="!visible !block w-full max-w-sm text-center lg:w-1/3"
              >
                Follow Us on Bounce
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
