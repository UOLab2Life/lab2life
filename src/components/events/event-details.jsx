'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { formatEventDate, formatEventTime } from '@/lib/date-formatting'

function toLocalDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  if (timeStr) {
    const [hh, mm = '0', ss = '0'] = timeStr.split(':')
    return new Date(y, m - 1, d, Number(hh), Number(mm), Number(ss))
  }
  return new Date(y, m - 1, d, 0, 0, 0, 0)
}

function isPastEvent(event, now = new Date()) {
  const { date, time, end_time } = event || {}
  if (!date) return false
  const endLocal = end_time
    ? toLocalDate(date, end_time)
    : (() => {
        const d = toLocalDate(date, time || '00:00:00')
        d.setHours(23, 59, 59, 999)
        return d
      })()
  return endLocal < now
}

export default function EventDetails({ event }) {
  const { t, locale } = useTranslation()
  
  if (!event) return null

  const { title, description, location, registration, date, time, end_time } = event
  const isPast = isPastEvent({ date, time, end_time })

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
          href={isPast ? undefined : registration}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
            isPast
              ? 'cursor-not-allowed bg-gray-200 text-gray-600'
              : 'bg-[#b184e9] text-white hover:bg-[#d3b4f8]'
          }`}
          onClick={(e) => {
            if (isPast) {
              e.preventDefault()
            }
          }}
        >
          {t('events.eventDetails.register') || 'Register'}
        </a>
      )}
    </div>
  )
}
