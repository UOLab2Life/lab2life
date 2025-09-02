import Calendar from '@/components/events/calendar'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'

export default function Events() {
  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <Heading as="h2" className="mx-auto max-w-3xl">
              Events
            </Heading>
            <p className="mt-6 text-lg text-gray-600">
              Join uOttawa Lab2Life and for some amazing healthcare-related events!
            </p>
            <Calendar />
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
