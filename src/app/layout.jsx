import '@/styles/tailwind.css'

export const metadata = {
  title: 'uOttawa Lab2Life',
  description: 'Dedicated to promoting and helping students explore various careers in the field of healthcare and medicine.',
  icons: {
    icon: [
      {
        url: '/images/home/uolab2life_logo_no_bg.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/home/uolab2life_logo_no_bg.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/home/uolab2life_logo_no_bg.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/images/home/uolab2life_logo_no_bg.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
