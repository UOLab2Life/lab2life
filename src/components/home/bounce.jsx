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

          <div className="flex-1 text-center lg:text-left lg:ml-16">
            <Heading as="h3" className="mb-4 text-3xl font-bold text-[#6bc5f7]">
              Bounce Life
            </Heading>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Discover exciting opportunities and connect with like-minded individuals through our comprehensive platform designed for students and professionals in healthcare and medicine.
            </p>
            
            {/* Button underneath description */}
            <div className="flex justify-center lg:justify-start">
              <Button
                href="https://www.bouncelife.com"
                target="_blank"
                rel="noopener noreferrer"
                className="!bg-[#68b4f8] hover:!bg-white text-white hover:text-[#68b4f8] px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
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
