'use client'

import { useState, useEffect } from 'react'
import { Container } from './container'
import { Gradient } from './gradient'
import { Heading, Subheading } from './text'
import { Button } from './button'

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const targetDate = new Date('2025-09-03T10:00:00-04:00').getTime()

  useEffect(() => {
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

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className="relative bg-white">
      <Container className="relative py-16 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <Subheading>Upcoming Event</Subheading>
          <Heading as="h2" className="mt-2 text-4xl sm:text-5xl font-inter-semibold text-[#003e3e]">
            uOttawa Lab2Life Club Fair
          </Heading>
          <p className="mt-6 text-lg/7 font-inter-semibold text-gray-600 max-w-5xl mx-auto">
            Join us for an exciting day of learning more about what our club is all about! Don't forget to come to our table and spin the wheel for a chance
            to win amazing prizes!
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-base font-inter-semibold text-[#003e3e]">September 3rd, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-base font-inter-semibold text-[#003e3e]">10:00 AM - 12:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#003e3e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-base font-inter-semibold text-[#003e3e]">Grand Alley (85 University Private)</span>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center gap-4 sm:gap-8">
            {timeUnits.map((unit) => (
              <div key={unit.label} className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Gradient className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
                <div className="relative rounded-xl p-1 shadow-lg h-full flex flex-col justify-center items-center">
                                          <div className="text-3xl sm:text-4xl font-bold text-white">
                          {unit.value.toString().padStart(2, '0')}
                        </div>
                        <p className="mt-1 text-xs font-inter-medium text-[#ffffff] tracking-wide">
                          {unit.label}
                        </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <Button 
              href="https://www.bouncelife.com/events/68b1e5c58c7d8ac1d03a23f9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base px-6 py-2 sm:text-lg sm:px-8 sm:py-3 text-center w-64"
            >
              Register
            </Button>
            <Button 
              href="/events"
              rel="noopener noreferrer"
              className="text-base px-6 py-2 sm:text-lg sm:px-8 sm:py-3 text-center w-64 bg-[#b184e9] hover:bg-[#9d6fd6] text-white hover:text-[#003e3e] font-semibold rounded-full shadow-lg"
            >
              View All Events
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
