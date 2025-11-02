'use client'

import EventDetails from '@/components/events/event-details'
import { Modal } from '@/components/events/modal'
import { useModal } from '@/components/events/use-modal'
import { supabase } from '@/lib/supabase/client'
import { useTranslation } from '@/contexts/LanguageContext'
import { formatEventDate, formatEventTime } from '@/lib/date-formatting'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const { isOpen, openModal, closeModal } = useModal(false)
  const { t, locale, messages } = useTranslation()

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

        // Use language-specific fields with fallbacks
        const eventName = locale === 'fr' 
          ? (row.event_name_fr || row.event_name_en || 'Sans titre')
          : (row.event_name_en || row.event_name_fr || 'Untitled')
        
        const eventType = locale === 'fr'
          ? (row.event_type_fr || row.event_type_en || '')
          : (row.event_type_en || row.event_type_fr || '')
        
        const eventDescription = locale === 'fr'
          ? (row.event_description_fr || row.event_description_en || '')
          : (row.event_description_en || row.event_description_fr || '')
        
        const eventLocation = locale === 'fr'
          ? (row.event_location_fr || row.event_location_en || '')
          : (row.event_location_en || row.event_location_fr || '')
        
        const registrationLink = locale === 'fr'
          ? (row.registration_link_fr || row.registration_link_en || '')
          : (row.registration_link_en || row.registration_link_fr || '')

        return {
          id: row.event_id,
          title: eventName,
          start,
          end,
          allDay: !row.event_time && !row.event_end_time,
          extendedProps: {
            type: eventType,
            description: eventDescription,
            location: eventLocation,
            registration: registrationLink,
            date: row.event_date,
            time: row.event_time,
            end_time: row.event_end_time,
          },
        }
      })

      setEvents(mapped)
    }

    loadEvents()
  }, [locale])

  const onEventClick = (info) => {
    setSelected({
      id: info.event.id,
      title: info.event.title,
      ...info.event.extendedProps,
    })
    openModal()
  }

  const handleViewChange = (view) => {
    setCurrentView(view.view.type)
  }

  // Create button text object only when translations are loaded
  const buttonText = messages && typeof messages === 'object' && Object.keys(messages).length > 0 ? {
    today: t('events.calendar.today') || 'Today',
    month: t('events.calendar.month') || 'Month',
    week: t('events.calendar.week') || 'Week',
    day: t('events.calendar.day') || 'Day',
    allDay: t('events.calendar.allDay') || 'all-day'
  } : {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    allDay: 'all-day'
  }

  return (
    <>
      <div className="mt-16 mb-16 lab2life-calendar [&_.fc-button]:px-2 [&_.fc-button]:py-1 [&_.fc-button]:text-[0.85rem] [&_.fc-toolbar-title]:whitespace-nowrap [&_.fc-toolbar-title]:text-[clamp(0.9rem,2.2vw,1.25rem)] [&_.fc-toolbar-title]:leading-[1.1]">
        <FullCalendar
          key={`calendar-${locale}-${messages && typeof messages === 'object' ? Object.keys(messages).length : 0}`}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView={currentView}
          initialDate={new Date()}
          locale={locale}
          headerToolbar={{ 
            left: 'prev,next', 
            center: 'title', 
            right: 'dayGridMonth,timeGridWeek' 
          }}
          buttonText={buttonText}
          allDayText={messages && typeof messages === 'object' && Object.keys(messages).length > 0 
            ? (t('events.calendar.allDay') || 'all-day')
            : 'all-day'
          }
          moreLinkText={messages && typeof messages === 'object' && Object.keys(messages).length > 0 
            ? (t('events.calendar.more') || 'more')
            : 'more'
          }
          noEventsText={messages && typeof messages === 'object' && Object.keys(messages).length > 0 
            ? (t('events.calendar.noEvents') || 'No events to display')
            : 'No events to display'
          }
          events={events}
          eventDisplay="block"
          dayMaxEvents
          height="auto"
          eventClick={onEventClick}
          viewDidMount={handleViewChange}
          slotMinTime="07:00:00"
          slotMaxTime="23:00:00"
          slotLabelInterval="01:00"
          dayCellClassNames={(dateInfo) => {
            const today = new Date()
            const cellDate = new Date(dateInfo.date)
            const isToday = cellDate.toDateString() === today.toDateString()
            return isToday ? 'fc-today-highlight' : ''
          }}
          views={{
            dayGridMonth: {
              displayEventTime: false, 
            },
            timeGridWeek: {
              slotLabelFormat: locale === 'en' 
                ? { hour: 'numeric', minute: '2-digit', hour12: true }
                : { hour: '2-digit', minute: '2-digit', hour12: false },
              eventTimeFormat: locale === 'en'
                ? { hour: 'numeric', minute: '2-digit', hour12: true }
                : { hour: '2-digit', minute: '2-digit', hour12: false },
            },
          }}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[640px] p-6">
        <EventDetails event={selected} />
      </Modal>
    </>
  )
}
