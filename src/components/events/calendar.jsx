'use client'

import EventDetails from '@/components/events/event-details'
import { Modal } from '@/components/events/modal'
import { useModal } from '@/components/events/use-modal'
import { supabase } from '@/lib/supabase/client'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const { isOpen, openModal, closeModal } = useModal(false)

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase
        .from('Events')
        .select('*')
        .order('event_date', { ascending: true })

      if (error) {
        console.error(error)
        return
      }
      const mapped = (data ?? []).map((row) => {
        const start = row.event_time ? `${row.event_date}T${row.event_time}` : row.event_date
        const end = row.event_end_time ? `${row.event_date}T${row.event_end_time}` : undefined

        return {
          id: row.event_id,
          title: row.event_name ?? 'Untitled',
          start,
          end,
          allDay: !row.event_time && !row.event_end_time,
          extendedProps: {
            type: row.event_type,
            description: row.event_description,
            location: row.event_location,
            registration: row.registration_link,
            date: row.event_date,
            time: row.event_time,
            end_time: row.event_end_time,
          },
        }
      })

      setEvents(mapped)
    }

    loadEvents()
  }, [])

  const onEventClick = (info) => {
    setSelected({
      id: info.event.id,
      title: info.event.title,
      ...info.event.extendedProps,
    })
    openModal()
  }

  return (
    <>
      <div className="lab2life-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'prev,next', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
          events={events}
          eventDisplay="block"
          dayMaxEvents
          height="auto"
          eventClick={onEventClick}
          slotMinTime="07:00:00"
          slotMaxTime="23:00:00"
          slotLabelInterval="01:00"
          validRange={(nowDate) => {
            const start = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
            return { start }
          }}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[640px] p-6">
        <EventDetails event={selected} />
      </Modal>
    </>
  )
}
