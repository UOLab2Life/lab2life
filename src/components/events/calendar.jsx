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

        return {
          id: row.event_id,
          title: row.event_name ?? 'Untitled',
          start,
          allDay: !row.event_time,
          extendedProps: {
            type: row.event_type,
            description: row.event_desription,
            location: row.event_location,
            registration: row.registration_link,
            dateOnly: row.event_date,
            timeOnly: row.event_time,
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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
        events={events}
        editable={false}
        selectable={false}
        dayMaxEvents={true}
        height="auto"
        eventClick={onEventClick}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        slotLabelInterval="01:00"
      />

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[640px] p-6">
        <EventDetails event={selected} />
      </Modal>
    </>
  )
}
