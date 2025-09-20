import localFont from 'next/font/local'

export const metadata = {
  title: 'Podcasts - uOttawa Lab2Life',
  description: 'Listen to our podcasts featuring healthcare professionals and career insights.',
  icons: {
    icon: '/images/lab2life-no-bg.png',
  },
}

const satoshi = localFont({
  src: [{ path: '../../assets/podcasts/fonts/satoshi.woff2', weight: '300 900', style: 'normal' }],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})

export default function LayoutWrapper({ children }) {
  return (
    <section data-app="podcasts" className={satoshi.variable + ' flex min-h-full'}>
      <div className="w-full">{children}</div>
    </section>
  )
}
