const urlMappings = {
  en: {
    '/articles': '/articles',
    '/podcasts': '/podcasts', 
    '/events': '/events',
    '/contact-us': '/contact-us',
    '/general-member-sign-up': '/general-member-sign-up'
  },
  fr: {
    '/articles': '/articles',
    '/podcasts': '/podcasts',
    '/events': '/evenements', 
    '/contact-us': '/contactez-nous',
    '/general-member-sign-up': '/inscription-membres-generaux'
  }
}

const reverseUrlMappings = {
  fr: {
    '/articles': '/articles',
    '/podcasts': '/podcasts',
    '/evenements': '/events',
    '/contactez-nous': '/contact-us', 
    '/inscription-membres-generaux': '/general-member-sign-up'
  }
}

/**
 * Get localized URL for a given path and language
 * @param {string} path - The original English path
 * @param {string} locale - The target locale (en, fr)
 * @returns {string} - The localized URL
 */
export function getLocalizedUrl(path, locale = 'en') {
  if (locale === 'en') {
    return path
  }
  
  const mappings = urlMappings[locale]
  if (!mappings) {
    return path
  }
  
  return mappings[path] || path
}

/**
 * Get the original English path from a localized URL
 * @param {string} localizedPath - The localized path
 * @param {string} locale - The current locale
 * @returns {string} - The original English path
 */
export function getOriginalPath(localizedPath, locale = 'en') {
  if (locale === 'en') {
    return localizedPath
  }
  
  const mappings = reverseUrlMappings[locale]
  if (!mappings) {
    return localizedPath
  }
  
  return mappings[localizedPath] || localizedPath
}

/**
 * Get all available localized URLs for a given path
 * @param {string} path - The original English path
 * @returns {Object} - Object with locale as key and localized URL as value
 */
export function getAllLocalizedUrls(path) {
  const result = {}
  
  Object.keys(urlMappings).forEach(locale => {
    result[locale] = getLocalizedUrl(path, locale)
  })
  
  return result
}

/**
 * Check if a path is a localized URL
 * @param {string} path 
 * @returns {Object|null}
 */
export function parseLocalizedPath(path) {
  const frMappings = reverseUrlMappings.fr
  for (const [localizedPath, originalPath] of Object.entries(frMappings)) {
    if (path === localizedPath) {
      return { locale: 'fr', originalPath }
    }
  }
  
  const enMappings = urlMappings.en
  for (const [originalPath] of Object.entries(enMappings)) {
    if (path === originalPath) {
      return { locale: 'en', originalPath: path }
    }
  }
  
  return null
}
