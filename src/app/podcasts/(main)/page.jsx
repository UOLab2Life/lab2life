import Link from 'next/link'

import { Container } from '@/components/podcasts/Container'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { FormattedDate } from '@/components/podcasts/FormattedDate'
import { getAllEpisodes } from '@/lib/podcasts/episodes'

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

  return (
         <article
       aria-labelledby={`episode-${episode.id}-title`}
       className="py-4 sm:py-6"
     >
      <Container>
        <div className="flex flex-col items-start p-8 bg-white/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/70 hover:shadow-lg">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-3xl font-bold text-[#2e4954]"
          >
            <Link href={`/podcasts/${episode.id}`}>
              Episode {episode.id}: {episode.title}
            </Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-bold font-mono text-md/7 text-[#003e3e]/60"
          />
          <p className="mt-1 text-base/7 text-[#2e4954]/80">
            {episode.description}
          </p>
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
      </Container>
    </article>
  )
}

export default async function Home() {
  let episodes = await getAllEpisodes()

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-5xl/7 font-bold text-[#003e3e]">Lab2Life Episodes</h1>
      </Container>
             <div className="sm:mt-4 lg:mt-8">
        {episodes.length > 0 ? (
          episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))
        ) : (
          <div className="py-10 sm:py-12">
            <Container>
              <p className="text-base/7 text-[#003e3e]/80">
                No episodes found. Please check your database connection and
                ensure the Episodes table exists.
              </p>
            </Container>
          </div>
        )}
      </div>
    </div>
  )
}

export const revalidate = 10