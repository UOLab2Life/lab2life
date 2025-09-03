import '@/styles/tailwind.css'
import localFont from 'next/font/local'

export const metadata = {
  title: 'uOttawa Lab2Life',
  description:
    'Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.',
  icons: {
    icon: '/lab2life-no-bg.png',
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
    <html lang="en" className={switzer.variable}>
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
