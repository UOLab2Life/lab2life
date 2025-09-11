'use client'

export default function EventDetails({ event }) {
  if (!event) return null

  const { title, description, location, registration, date, time, end_time } = event

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#015555]">{title}</h3>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {date && (
          <div>
            <span className="font-medium">Date:</span> {date}
          </div>
        )}
        {time && (
          <div>
            <span className="font-medium">Starts:</span> {time}
          </div>
        )}
        {end_time && (
          <div>
            <span className="font-medium">Ends:</span> {end_time}
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
          className="inline-flex items-center rounded-lg bg-[#b184e9] px-4 py-2 text-sm font-medium text-white hover:bg-[#d3b4f8] dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Register
        </a>
      )}
    </div>
  )
}
