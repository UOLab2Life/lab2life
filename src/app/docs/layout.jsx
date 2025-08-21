import localFont from 'next/font/local'
import clsx from 'clsx'
import { Providers } from './theme-provider'
import { Layout } from '@/components/docs/Layout'

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
      className={clsx('min-h-full bg-white dark:bg-slate-900', inter.variable, lexend.variable)}
    >
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </section>
  )
}
