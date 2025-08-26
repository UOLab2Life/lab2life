import localFont from 'next/font/local'
//import Header from '@/components/general/Header'
//import Footer from '@/components/general/Footer'

const satoshi = localFont({
  src: [{ path: '../../assets/podcasts/fonts/satoshi.woff2', weight: '300 900', style: 'normal' }],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})

export default function LayoutWrapper({ children }) {
  return (
    <section data-app="podcasts" className={satoshi.variable + ' flex min-h-full'}>
      <div className="w-full">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </section>
  )
}
