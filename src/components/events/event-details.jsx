'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { formatEventDate, formatEventTime } from '@/lib/date-formatting'

export default function EventDetails({ event }) {
  const { t, locale } = useTranslation()
  
  if (!event) return null

  const { title, description, location, registration, date, time, end_time } = event

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#015555]">{title}</h3>

      <div className="space-y-1 text-sm text-gray-700">
        {date && (
          <div>
            <span className="font-medium">{t('events.eventDetails.date') || 'Date'}:</span> {formatEventDate(date, time, locale)}
          </div>
        )}
        {time && (
          <div>
            <span className="font-medium">{t('events.eventDetails.starts') || 'Starts'}:</span> {formatEventTime(time, locale)}
          </div>
        )}
        {end_time && (
          <div>
            <span className="font-medium">{t('events.eventDetails.ends') || 'Ends'}:</span> {formatEventTime(end_time, locale)}
          </div>
        )}

        {location && (
          <div>
            <span className="font-medium">{t('events.eventDetails.location') || 'Location'}:</span> {location}
          </div>
        )}
      </div>

      {description && <p className="text-sm leading-relaxed">{description}</p>}

      {registration && (
        <a
          href={registration}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-[#b184e9] px-4 py-2 text-sm font-medium text-white hover:bg-[#d3b4f8]"
        >
          {t('events.eventDetails.register') || 'Register'}
        </a>
      )}
    </div>
  )
}
