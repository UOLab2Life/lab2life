'use client' // Client-side component for dark-light mode

import { ThemeProvider } from 'next-themes' // Theme context provider for mode management

export function Providers({ children }) {
  return (
    // Wraps all child components with ThemeProvider to enable theme switching
    // attribute="class" - Adds "light" or "dark" class to the <html> element
    // disableTransitionOnChange - Disable all CSS transitions when switching themes
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
