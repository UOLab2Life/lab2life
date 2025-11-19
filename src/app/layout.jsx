import '@/styles/global.css'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Providers from './providers'

export const metadata = {
  title: 'uOttawa Lab2Life',
  description:
    'Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.',
  icons: {
    icon: '/images/lab2life-no-bg.png',
  },
}

const switzer = localFont({
  src: [{ path: '../assets/home/fonts/switzer.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={switzer.variable} suppressHydrationWarning>
      <body className="bg-white text-gray-950 antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
