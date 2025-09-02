import { Layout } from '@/components/articles/Layout'
import clsx from 'clsx'
import localFont from 'next/font/local'
import { Providers } from './theme-provider'

const inter = localFont({
  src: [{ path: '../../assets/docs/fonts/inter.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const lexend = localFont({
  src: [{ path: '../../assets/docs/fonts/lexend.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-lexend',
  display: 'swap',
  preload: true,
})
export default function LayoutWrapper({ children }) {
  return (
    <section
      data-app="docs"
      className={clsx('min-h-full bg-white dark:bg-[#003e3e]', inter.variable, lexend.variable)}
    >
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </section>
  )
}
