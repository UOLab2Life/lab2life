import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'

import { Heading } from '@/components/home/text'

export const metadata = {
  title: 'Contact Us - uOttawa Lab2Life',
  description: 'Get in touch with uOttawa Lab2Life for questions, partnerships, or general inquiries.',
}

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
              Contact Us
            </Heading>
            <p className="mt-6 text-lg text-gray-600">
              Have any questions about our club? Get in touch with our team below!
            </p>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
