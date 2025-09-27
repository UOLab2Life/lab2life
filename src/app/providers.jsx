'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LanguageProvider>
  )
}
