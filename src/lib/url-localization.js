const urlMappings = {
  en: {
    '/articles': '/articles',
    '/podcasts': '/podcasts', 
    '/events': '/events',
    '/contact-us': '/contact-us',
    '/general-member-sign-up': '/general-member-sign-up',
    '/articles/clinical-support': '/articles/power-clinical-support'
  },
  fr: {
    '/articles': '/articles',
    '/podcasts': '/podcasts',
    '/events': '/evenements', 
    '/contact-us': '/contactez-nous',
    '/general-member-sign-up': '/inscription-membres-generaux',
    '/articles/clinical-support': '/articles/pouvoir-soutien-clinique',
    // Ensure mapping also works when provided the actual route key used in navigation
    '/articles/power-clinical-support': '/articles/pouvoir-soutien-clinique',
    '/articles/nuclear-medicine-technologists': '/articles/technologue-medecine-nucleaire'
  }
}

const reverseUrlMappings = {
  en: {
    '/articles/power-clinical-support': '/articles/clinical-support',
    '/articles/nuclear-medicine-technologists': '/articles/nuclear-medicine-technologists',
  },
  fr: {
    '/articles': '/articles',
    '/podcasts': '/podcasts',
    '/evenements': '/events',
    '/contactez-nous': '/contact-us', 
    '/inscription-membres-generaux': '/general-member-sign-up',
    // Map the French clinical support path back to the actual route key used in navigation
    '/articles/pouvoir-soutien-clinique': '/articles/power-clinical-support',
    '/articles/technologue-medecine-nucleaire': '/articles/nuclear-medicine-technologists'
  }
}

/**
 * Get localized URL for a given path and language
 * @param {string} path - The original English path
 * @param {string} locale - The target locale (en, fr)
 * @returns {string} - The localized URL
 */
export function getLocalizedUrl(path, locale = 'en') {
  const mappings = urlMappings[locale]
  if (!mappings) return path
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
  // Check French localized paths first
  const frMappings = reverseUrlMappings.fr
  for (const [localizedPath, originalPath] of Object.entries(frMappings)) {
    if (path === localizedPath) return { locale: 'fr', originalPath }
  }

  // Check English localized paths that differ from originals
  const enReverse = reverseUrlMappings.en
  for (const [localizedPath, originalPath] of Object.entries(enReverse)) {
    if (path === localizedPath) return { locale: 'en', originalPath }
  }

  // Fallback: if path matches a known English route value, assume EN
  const enMappings = urlMappings.en
  for (const [, localized] of Object.entries(enMappings)) {
    if (path === localized) return { locale: 'en', originalPath: path }
  }

  return null
}
