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
    '/articles/pouvoir-soutien-clinique': '/articles/power-clinical-support',
    '/articles/technologue-medecine-nucleaire': '/articles/nuclear-medicine-technologists'
  }
}

export function getLocalizedUrl(path, locale = 'en') {
  const mappings = urlMappings[locale]
  if (!mappings) return path
  return mappings[path] || path
}

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

export function getAllLocalizedUrls(path) {
  const result = {}
  
  Object.keys(urlMappings).forEach(locale => {
    result[locale] = getLocalizedUrl(path, locale)
  })
  
  return result
}

export function parseLocalizedPath(path) {
  const frMappings = reverseUrlMappings.fr
  for (const [localizedPath, originalPath] of Object.entries(frMappings)) {
    if (path === localizedPath) return { locale: 'fr', originalPath }
  }

  const enReverse = reverseUrlMappings.en
  for (const [localizedPath, originalPath] of Object.entries(enReverse)) {
    if (path === localizedPath) return { locale: 'en', originalPath }
  }

  const enMappings = urlMappings.en
  for (const [, localized] of Object.entries(enMappings)) {
    if (path === localized) return { locale: 'en', originalPath: path }
  }

  return null
}
