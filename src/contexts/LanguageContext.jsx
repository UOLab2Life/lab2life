'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`../locales/${locale}.json`)
        setMessages(messages.default)
      } catch (error) {
        console.error('Failed to load messages for locale:', locale)
        // Fallback to English
        const fallbackMessages = await import(`../locales/en.json`)
        setMessages(fallbackMessages.default)
      }
    }

    loadMessages()
  }, [locale])

  const changeLanguage = (newLocale) => {
    setLocale(newLocale)
    localStorage.setItem('preferred-language', newLocale)
    
    if (typeof window !== 'undefined') {
      const { getLocalizedUrl, parseLocalizedPath } = require('../lib/url-localization')
      const currentPath = window.location.pathname
      const parsed = parseLocalizedPath(currentPath)
      
      if (parsed) {
        const newUrl = getLocalizedUrl(parsed.originalPath, newLocale)
        if (newUrl !== currentPath) {
          window.history.pushState({}, '', newUrl)
        }
      } else {
        const newUrl = getLocalizedUrl(currentPath, newLocale)
        if (newUrl !== currentPath) {
          window.history.pushState({}, '', newUrl)
        }
      }
    }
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && ['en', 'fr'].includes(savedLanguage)) {
      setLocale(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslation() {
  const { locale, changeLanguage, messages } = useLanguage()
  
  const t = (key) => {
    if (!messages || Object.keys(messages).length === 0) {
      return undefined
    }
    
    const keys = key.split('.')
    let value = messages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key "${key}" not found`)
        return key
      }
    }
    
    return value
  }

  return { t, locale, changeLanguage, messages }
}
