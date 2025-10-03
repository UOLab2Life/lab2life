/**
 * Format date and time for French locale
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @param {string} timeStr - Time string in HH:MM:SS format (optional)
 * @param {string} locale - Locale ('en' or 'fr')
 * @returns {string} - Formatted date string
 */
export function formatEventDate(dateStr, timeStr = null, locale = 'en') {
  if (!dateStr) return ''
  
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number)
    date.setHours(hours, minutes, 0, 0)
  }
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(timeStr && { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  
  return date.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', options)
}

/**
 * Format time for French locale
 * @param {string} timeStr - Time string in HH:MM:SS format
 * @param {string} locale - Locale ('en' or 'fr')
 * @returns {string} - Formatted time string
 */
export function formatEventTime(timeStr, locale = 'en') {
  if (!timeStr) return ''
  
  const [hours, minutes] = timeStr.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  
  return date.toLocaleTimeString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

/**
 * Get localized month names
 * @param {string} locale - Locale ('en' or 'fr')
 * @returns {Object} - Object with month names
 */
export function getMonthNames(locale = 'en') {
  if (locale === 'fr') {
    return {
      0: 'janvier', 1: 'février', 2: 'mars', 3: 'avril',
      4: 'mai', 5: 'juin', 6: 'juillet', 7: 'août',
      8: 'septembre', 9: 'octobre', 10: 'novembre', 11: 'décembre'
    }
  }
  
  return {
    0: 'January', 1: 'February', 2: 'March', 3: 'April',
    4: 'May', 5: 'June', 6: 'July', 7: 'August',
    8: 'September', 9: 'October', 10: 'November', 11: 'December'
  }
}

/**
 * Get localized day names
 * @param {string} locale - Locale ('en' or 'fr')
 * @returns {Object} - Object with day names
 */
export function getDayNames(locale = 'en') {
  if (locale === 'fr') {
    return {
      0: 'dimanche', 1: 'lundi', 2: 'mardi', 3: 'mercredi',
      4: 'jeudi', 5: 'vendredi', 6: 'samedi'
    }
  }
  
  return {
    0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
    4: 'Thursday', 5: 'Friday', 6: 'Saturday'
  }
}
