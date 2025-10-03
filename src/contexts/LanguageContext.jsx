'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const getInitialLocale = () => {
  // Always return 'en' for server-side rendering to prevent hydration mismatch
  return 'en'
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale)
  const [messages, setMessages] = useState({})
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferred-language')
      
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
        setLocale(savedLocale)
      } else {
        const currentPath = window.location.pathname
        const isFrenchPath = currentPath.startsWith('/inscription-membres-generaux') || 
                            currentPath.startsWith('/evenements') || 
                            currentPath.startsWith('/contactez-nous')
        
        if (isFrenchPath) {
          setLocale('fr')
          localStorage.setItem('preferred-language', 'fr')
        } else {
          setLocale('en')
          localStorage.setItem('preferred-language', 'en')
        }
      }
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`../locales/${locale}.json`)
        setMessages(messages.default)
      } catch (error) {
        console.error('Failed to load messages for locale:', locale)
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

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, messages, isInitialized }}>
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
  const { locale, changeLanguage, messages, isInitialized } = useLanguage()
  
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
  
  return { t, locale, changeLanguage, messages, isInitialized }
}
