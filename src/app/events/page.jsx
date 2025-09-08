import Calendar from '@/components/events/calendar'
import { Countdown } from '@/components/events/countdown'
import LatestEvents from '@/components/events/latest-events'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'

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

      <div className="mt-8">
        <Container>
          <div className="mx-auto max-w-6xl text-center">
            <Countdown />
            <Calendar />
            <LatestEvents />
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
