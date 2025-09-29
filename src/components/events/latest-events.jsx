'use client'

import EventDetails from '@/components/events/event-details'
import { Modal } from '@/components/events/modal'
import { useModal } from '@/components/events/use-modal'
import { supabase } from '@/lib/supabase/client'
import { useEffect, useMemo, useState } from 'react'

function mapRowToEvent(row) {
  const start = row.event_time ? `${row.event_date}T${row.event_time}` : row.event_date
  const end = row.event_end_time ? `${row.event_date}T${row.event_end_time}` : undefined

  return {
    id: row.event_id,
    title: row.event_name_en ?? 'Untitled',
    start,
    end,
    allDay: !row.event_time && !row.event_end_time,
    extendedProps: {
      type: row.event_type_en,
      description: row.event_description_en,
      location: row.event_location_en,
      registration: row.registration_link_en,
      date: row.event_date,
      time: row.event_time,
      end_time: row.event_end_time,
    },
  }
}

function toLocalDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  if (timeStr) {
    const [hh, mm = '0', ss = '0'] = timeStr.split(':')
    return new Date(y, m - 1, d, Number(hh), Number(mm), Number(ss))
  }
  return new Date(y, m - 1, d, 0, 0, 0, 0)
}

function isPastEvent(evt, now = new Date()) {
  const { date, time, end_time } = evt.extendedProps || {}
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

export default function LatestEvents() {
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const { isOpen, openModal, closeModal } = useModal(false)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('Events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) {
        console.error(error)
        return
      }
      setEvents((data ?? []).map(mapRowToEvent))
    }
    load()
  }, [])

  const getSortKey = (evt) => new Date(evt.start ?? evt.extendedProps?.date).getTime()

  const list = useMemo(() => {
    const now = new Date()
    const upcoming = []
    const past = []
    for (const evt of events) {
      ;(isPastEvent(evt, now) ? past : upcoming).push(evt)
    }
    upcoming.sort((a, b) => getSortKey(a) - getSortKey(b))
    past.sort((a, b) => getSortKey(a) - getSortKey(b))
    return [...upcoming, ...past]
  }, [events])

  const openFromCard = (evt) => {
    setSelected({
      id: evt.id,
      title: evt.title,
      ...evt.extendedProps,
    })
    openModal()
  }

  const formatDateLabel = (evt) => {
    const d = new Date(
      evt.extendedProps.date +
        (evt.extendedProps.time ? `T${evt.extendedProps.time}` : 'T00:00:00'),
    )
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      ...(evt.extendedProps.time ? { hour: '2-digit', minute: '2-digit' } : {}),
    })
  }

  return (
    <>
      <section className="mb-12 mt-12">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {list.map((evt) => {
                const past = isPastEvent(evt)
                const cardBase =
                  'relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition'
                const cardStyle = past
                  ? 'opacity-85 shadow-md grayscale-[30%] filter hover:shadow-md cursor-default'
                  : 'shadow-lg shadow-[#003e3e]/60 hover:shadow-xl cursor-pointer'

                return (
                  <article
                    key={evt.id}
                    className={[cardBase, cardStyle].join(' ')}
                    onClick={!past ? () => openFromCard(evt) : undefined}
                    aria-disabled={past ? true : undefined}
                  >
                    <div className="flex flex-1 flex-col p-8">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg
                          className={past ? 'h-4 w-4 text-gray-500' : 'h-4 w-4 text-[#003e3e]'}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={past ? 'text-gray-600' : ''}>{formatDateLabel(evt)}</span>
                      </div>

                      <h3
                        className={[
                          'mt-2 text-lg font-medium',
                          past ? 'text-gray-700' : 'text-[#003e3e]',
                        ].join(' ')}
                      >
                        {past ? (
                          <span className="text-left">{evt.title}</span>
                        ) : (
                          <button
                            type="button"
                            className="text-left transition-colors hover:text-[#003e3e]/80"
                            onClick={(e) => {
                              e.stopPropagation()
                              openFromCard(evt)
                            }}
                          >
                            {evt.title}
                          </button>
                        )}
                      </h3>

                      {evt.extendedProps?.description && (
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-500">
                          {evt.extendedProps.description}
                        </p>
                      )}

                      <div className="mt-6 flex items-center justify-between gap-3">
                        <div className={past ? 'text-xs text-gray-500' : 'text-xs text-gray-600'}>
                          {evt.extendedProps?.location ?? ''}
                        </div>

                        {past ? (
                          <span className="inline-flex cursor-default select-none items-center justify-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                            Done
                          </span>
                        ) : (
                          evt.extendedProps?.registration && (
                            <a
                              href={evt.extendedProps.registration}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-full bg-[#003e3e] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Register
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[640px] p-6">
        <EventDetails event={selected} />
      </Modal>
    </>
  )
}
