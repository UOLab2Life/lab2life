'use client'

import Calendar from '@/components/events/calendar'
import LatestEvents from '@/components/events/latest-events'
import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'
import { useTranslation } from '@/contexts/LanguageContext'

export default function EvenementsPage() {
  const { t } = useTranslation()

  return (
    <div className="py-8 sm:py-18">
      <Container>
        <div className="mx-auto max-w-6xl text-center">
          <Heading as="h2" className="mx-auto max-w-3xl">
            {t('events.title') || 'Événements'}
          </Heading>
          <p className="mb-6 mt-6 text-xl font-inter text-gray-600">
            {t('events.description') || 'Rejoignez uOttawa Lab2Life pour des événements incroyables liés aux soins de santé! Cliquez sur un événement pour voir les informations détaillées!'}
          </p>
          <Calendar />
          <LatestEvents />
        </div>
      </Container>
    </div>
  )
}
