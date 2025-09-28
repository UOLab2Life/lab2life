import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'

export const metadata = {
  title: 'Événements - uOttawa Lab2Life',
  description:
    'Rejoignez uOttawa Lab2Life pour des événements incroyables liés aux soins de santé! Cliquez sur un événement pour voir les informations détaillées.',
  icons: {
    icon: '/images/lab2life-no-bg.png',
  },
}

export default function EvenementsLayout({ children }) {
  return (
    <main className="overflow-hidden">
      <div className="relative">
        <Gradient className="rounded-4xl absolute inset-2 bottom-0 ring-1 ring-inset ring-black/5" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>
      {children}
      <Footer />
    </main>
  )
}
