'use client'

import { Container } from '@/components/home/container'
import { Gradient } from '@/components/home/gradient'
import { Heading, Subheading } from '@/components/home/text'
import { Button } from '@/components/home/button'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'
import { supabase } from '@/lib/supabase/client'
import { formatEventDate, formatEventTime } from '@/lib/date-formatting'
import { useEffect, useState } from 'react'

export function Countdown() {
  const { t, locale } = useTranslation()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from('Events')
          .select('*')
          .order('event_id', { ascending: false })
          .limit(1)

        if (error) {
          console.error('Error fetching event:', error)
          setLoading(false)
          return
        }

        if (data && data.length > 0) {
          setEventData(data[0])
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [])

  const targetDate = eventData && eventData.event_date && eventData.event_time
    ? (() => {
        const [year, month, day] = eventData.event_date.split('-').map(Number)
        const [hours, minutes, seconds = 0] = eventData.event_time.split(':').map(Number)
        return new Date(year, month - 1, day, hours, minutes, seconds).getTime()
      })()
    : null

  useEffect(() => {
    if (!targetDate) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const eventTitle = eventData
    ? (locale === 'fr'
        ? (eventData.event_name_fr || eventData.event_name_en || '')
        : (eventData.event_name_en || eventData.event_name_fr || ''))
    : (t('home.countdown.title') || 'uOttawa Lab2Life Club Fair')

  const eventDescription = eventData
    ? (locale === 'fr'
        ? (eventData.event_description_fr || eventData.event_description_en || '')
        : (eventData.event_description_en || eventData.event_description_fr || ''))
    : (t('home.countdown.description') || "Join us for an exciting day of learning more about what our club is all about! Don't forget to come to our table and spin the wheel for a chance to win amazing prizes!")

  const eventDate = eventData && eventData.event_date
    ? (locale === 'fr'
        ? `Le ${formatEventDate(eventData.event_date, null, 'fr')}`
        : formatEventDate(eventData.event_date, null, 'en'))
    : (t('home.countdown.date') || (locale === 'fr' ? 'Le 3 septembre 2025' : 'September 3rd, 2025'))

  const eventTime = eventData && eventData.event_time && eventData.event_end_time
    ? `${formatEventTime(eventData.event_time, locale)} - ${formatEventTime(eventData.event_end_time, locale)}`
    : eventData && eventData.event_time
    ? formatEventTime(eventData.event_time, locale)
    : (t('home.countdown.time') || '10:00 AM - 12:00 PM')

  const eventLocation = eventData
    ? (locale === 'fr'
        ? (eventData.event_location_fr || eventData.event_location_en || '')
        : (eventData.event_location_en || eventData.event_location_fr || ''))
    : (t('home.countdown.location') || 'Grand Alley (85 University Private)')

  const registrationLink = eventData
    ? (locale === 'fr'
        ? (eventData.registration_link_fr || eventData.registration_link_en || '')
        : (eventData.registration_link_en || eventData.registration_link_fr || ''))
    : 'https://www.bouncelife.com/events/68f963f6b64c137556790d44'

  const timeUnits = [
    { label: t('home.countdown.timeUnits.days') || 'Days', value: timeLeft.days },
    { label: t('home.countdown.timeUnits.hours') || 'Hours', value: timeLeft.hours },
    { label: t('home.countdown.timeUnits.minutes') || 'Minutes', value: timeLeft.minutes },
    { label: t('home.countdown.timeUnits.seconds') || 'Seconds', value: timeLeft.seconds },
  ]

  if (loading) {
    return (
      <div className="relative bg-white">
        <Container className="relative pt-12 pb-8 sm:pt-16 sm:pb-12">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="relative bg-white">
      <Container className="relative pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="mx-auto max-w-7xl text-center">
                <Subheading className="text-lg">{t('home.countdown.upcomingEvent') || 'Upcoming Event'}</Subheading>
                <Heading as="h2" className="font-inter-semibold mt-4 text-4xl font-bold text-[#003e3e]">
                  {eventTitle}
                </Heading>
                <p className="font-inter-semibold mx-auto mt-8 max-w-6xl text-xl text-gray-600">
            {eventDescription}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
            <div className="flex items-center gap-4">
              <svg className="h-8 w-8 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-inter-semibold text-lg text-[#003e3e] sm:text-xl">
                {eventDate}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg className="h-8 w-8 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-inter-semibold text-lg text-[#003e3e] sm:text-xl">
                {eventTime}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <svg className="h-8 w-8 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-inter-semibold text-sm text-[#003e3e] sm:text-lg md:text-xl whitespace-nowrap">
                {eventLocation}
              </span>
            </div>
          </div>

          <div className="mt-16 flex justify-center gap-6 sm:gap-12">
            {timeUnits.map((unit) => (
               <div key={unit.label} className="relative h-28 w-32 sm:h-32 sm:w-36 lg:h-36 lg:w-40">
                <Gradient className="absolute inset-0 h-full w-full rounded-2xl ring-1 ring-inset ring-black/5" />
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-2xl p-2 shadow-lg">
                  <div className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <p className="font-inter-medium mt-2 text-sm tracking-wide text-[#ffffff] sm:text-base">
                    {unit.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-4">
            {registrationLink && (
              <Button
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto w-[70%] max-w-sm px-6 py-2 text-center text-base sm:px-8 sm:py-3 sm:text-lg lg:w-1/3"
              >
                {t('home.countdown.registerNow') || 'Register Now'}
              </Button>
            )}
            <a
              href={getLocalizedUrl('/events', locale)}
              className="mx-auto w-[70%] max-w-sm px-6 py-2 text-center text-base sm:px-8 sm:py-3 sm:text-lg lg:w-1/3 inline-flex items-center justify-center rounded-full border border-transparent shadow-md whitespace-nowrap font-semibold transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: '#b184e9',
                color: 'white',
                border: '1px solid transparent',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.borderColor = '#b184e9'
                e.target.style.color = '#b184e9'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#b184e9'
                e.target.style.borderColor = 'transparent'
                e.target.style.color = 'white'
              }}
            >
              {t('home.countdown.viewAllEvents') || 'View All Events'}
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
