'use client'

export default function EventDetails({ event }) {
  if (!event) return null

  const {
    title = 'Untitled',
    description,
    location,
    type,
    registration,
    dateOnly,
    timeOnly,
  } = event

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {type && (
          <div>
            <span className="font-medium">Type:</span> {type}
          </div>
        )}
        {(dateOnly || timeOnly) && (
          <div>
            <span className="font-medium">Date:</span> {dateOnly}
            {timeOnly ? ` • ${timeOnly.slice(0, 5)}` : ''}
          </div>
        )}
        {location && (
          <div>
            <span className="font-medium">Location:</span> {location}
          </div>
        )}
      </div>

      {description && <p className="text-sm leading-relaxed">{description}</p>}

      {registration && (
        <a
          href={registration}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Register
        </a>
      )}
    </div>
  )
}
