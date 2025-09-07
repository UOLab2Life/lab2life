import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { Heading } from '@/components/home/text'

export const metadata = {
  title: 'General Member Sign-Up - uOttawa Lab2Life',
  description:
    'Join uOttawa Lab2Life as a general member and start exploring healthcare career opportunities.',
}

export default function GeneralMemberSignUp() {
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
              General Member Sign-Up
            </Heading>
            <p className="mt-6 text-lg text-gray-600">
              Join uOttawa Lab2Life and explore healthcare career opportunities with other
              passionate students.
            </p>

            <div className="mt-16">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfdv9Ik4bUylJax_Cupn21rFw6P-tImmtBkk_2TuSUTJSSZAw/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="uOttawa Lab2Life General Member Sign-Up 2025-2026"
                className="shadow-3xl rounded-lg shadow-lg shadow-[#003e3e]/60"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
