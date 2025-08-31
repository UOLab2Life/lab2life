import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

import { Container } from '@/components/home/container'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { FormattedDate } from '@/components/podcasts/FormattedDate'
import { getAllEpisodes } from '@/lib/podcasts/episodes'
import { Navbar } from '@/components/home/navbar'
import { Gradient } from '@/components/home/gradient'

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

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  const categories = episode.category ? episode.category.split(',').map(cat => cat.trim()).filter(cat => cat) : []

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-4 sm:py-6"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start p-8 bg-white/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/70 hover:shadow-lg">
          <div className="w-full pb-4 sm:pb-0">
            <h2
              id={`episode-${episode.id}-title`}
              className="mt-2 text-3xl font-bold text-[#2e4954] mb-4"
            >
              <Link href={`/podcasts/${episode.id}`}>
                Episode {episode.id}: {episode.title}
              </Link>
            </h2>
          </div>
          <FormattedDate
            date={date}
            className="order-first font-bold font-mono text-md/7 text-[#003e3e]/60 mb-4"
          />
          <p className="mt-1 text-base/7 text-[#2e4954]/80">
            {episode.description}
          </p>
          
          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#003e3e] text-white"
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
                  <span aria-hidden="true">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-[#2e4954]/40"
            >
              |
            </span>
            <Link
              href={`/podcasts/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-[#b184e9] hover:text-[#9a6fd8] active:text-[#8a5fc8]"
              aria-label={`Show notes for Episode ${episode.id}: ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default async function Home() {
  let episodes = await getAllEpisodes()

  return (
    <>
      <div className="relative">
        <Gradient className="absolute inset-1 sm:inset-2 bottom-0 rounded-2xl sm:rounded-4xl ring-1 ring-black/5 ring-inset" />
        <Container className="relative pb-8 sm:pb-12">
          <Navbar
            banner={
              <Link
                href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
                className="flex items-center gap-1 rounded-full bg-[#99c96f]/35 px-2 sm:px-3 py-0.5 text-xs sm:text-sm/6 font-inter-semibold text-white data-hover:bg-[#99c96f]/30"
              >
                <span className="hidden xs:inline">uOttawa Lab2Life Club Fair - September 3rd, 2025</span>
                <span className="xs:hidden">Club Fair - Sept 3rd, 2025</span>
                <ChevronRightIcon className="size-3 sm:size-4" />
              </Link>
            }
          />
        </Container>
      </div>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl/7 font-bold text-[#003e3e] text-center sm:text-left">All Episodes</h1>
        </div>
        <div className="sm:mt-4 lg:mt-8">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <EpisodeEntry key={episode.id} episode={episode} />
            ))
          ) : (
            <div className="py-10 sm:py-12">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <p className="text-base/7 text-[#003e3e]/80">
                  No episodes found. Please check your database connection and
                  ensure the Episodes table exists.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const revalidate = 10