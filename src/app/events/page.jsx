import Calendar from '@/components/events/calendar'
import LatestEvents from '@/components/events/latest-events'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'

export const metadata = {
  title: 'Events - uOttawa Lab2Life',
  description:
    'Stay updated with upcoming uOttawa Lab2Life events, workshops, and networking opportunities.',
}

export default function Events() {
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
          <div className="mx-auto max-w-6xl text-center">
            <Heading as="h2" className="mx-auto max-w-3xl">
              Events
            </Heading>
            <p className="mb-6 mt-6 text-xl font-inter text-gray-600">
              Join uOttawa Lab2Life and for some amazing healthcare-related events! <br /> Click an
              event to view detailed information!
            </p>
            <Calendar />
            <LatestEvents />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
