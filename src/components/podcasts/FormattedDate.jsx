'use client'

import { useTranslation } from '@/contexts/LanguageContext'

export function FormattedDate({ date, ...props }) {
  const { locale } = useTranslation()
  
  const dateFormatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedDate = dateFormatter.format(date)
  
  // For French, add "le" prefix
  const displayDate = locale === 'fr' ? `le ${formattedDate}` : formattedDate

  return (
    <time dateTime={date.toISOString()} {...props}>
      {displayDate}
    </time>
  )
}
