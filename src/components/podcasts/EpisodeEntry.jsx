'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { EpisodePlayButton } from './EpisodePlayButton'
import { FormattedDate } from './FormattedDate'
import Link from 'next/link'

function PauseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

export function EpisodeEntry({ episode }) {
  const { t, locale } = useTranslation()
  let date = new Date(episode.published)

  const description = locale === 'fr' 
    ? (episode.description_fr || episode.description_en || '')
    : (episode.description_en || episode.description_fr || '')
  
  const categoryString = locale === 'fr' 
    ? (episode.category_fr || episode.category_en || '')
    : (episode.category_en || episode.category_fr || '')

  const categories = categoryString
    ? categoryString
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat)
    : []

  const getTitle = () => {
    const episodeText = t('podcasts.episode') || 'Episode'
    if (locale === 'fr') {
      return `${episodeText} ${episode.id}: ${episode.title} (anglais)`
    }
    return `${episodeText} ${episode.id}: ${episode.title}`
  }

  return (
    <article aria-labelledby={`episode-${episode.id}-title`} className="pt-0 pb-4 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start rounded-2xl bg-white/50 p-8 transition-all duration-300 hover:scale-105 hover:bg-white/70 hover:shadow-lg">
          <div className="w-full pb-4 sm:pb-0">
            <h2
              id={`episode-${episode.id}-title`}
              className="mb-4 mt-2 text-3xl font-bold text-[#2e4954]"
            >
              <Link href={`/podcasts/${episode.id}`}>
                {getTitle()}
              </Link>
            </h2>
          </div>
          <FormattedDate
            date={date}
            className="text-md/7 order-first mb-4 font-mono font-bold text-[#003e3e]/60"
          />
          <p className="mt-1 text-base/7 text-[#2e4954]/80">{description}</p>

          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-[#003e3e] px-3 py-1 text-sm font-medium text-white"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm/6 font-bold text-[#b184e9] hover:text-[#9a6fd8] active:text-[#8a5fc8]"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">{t('podcasts.listen') || 'Listen'}</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">{t('podcasts.listen') || 'Listen'}</span>
                </>
              }
            />
            <span aria-hidden="true" className="text-sm font-bold text-[#2e4954]/40">
              |
            </span>
            <Link
              href={`/podcasts/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-[#b184e9] hover:text-[#9a6fd8] active:text-[#8a5fc8]"
              aria-label={`More details for Episode ${episode.id}: ${episode.title}`}
            >
              {t('podcasts.more') || 'More'}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
