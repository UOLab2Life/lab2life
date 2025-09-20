import { Layout } from '@/components/articles/layout'
import clsx from 'clsx'
import localFont from 'next/font/local'

export const metadata = {
  title: 'Articles - uOttawa Lab2Life',
  description:
    'Find our monthly articles passionately written by our representatives covering diverse medical themes.',
  icons: {
    icon: '/lab2life-no-bg.png',
  },
}

const inter = localFont({
  src: [{ path: '../../assets/articles/fonts/inter.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const lexend = localFont({
  src: [{ path: '../../assets/articles/fonts/lexend.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-lexend',
  display: 'swap',
  preload: true,
})
export default function LayoutWrapper({ children }) {
  return (
    <section
      data-app="articles"
      className={clsx('min-h-full bg-white dark:bg-[#003e3e]', inter.variable, lexend.variable)}
    >
      <Layout>{children}</Layout>
    </section>
  )
}
