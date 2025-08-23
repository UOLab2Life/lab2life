import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/podcasts/Container'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { FormattedDate } from '@/components/podcasts/FormattedDate'
import { PauseIcon } from '@/components/podcasts/PauseIcon'
import { PlayIcon } from '@/components/podcasts/PlayIcon'
import { getAllEpisodes } from '@/lib/podcasts/episodes'

const getEpisode = cache(async (id) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id.toString() === id)

  if (!episode) {
    notFound()
  }

  return episode
})

export async function generateMetadata({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)

  return {
    title: `Lab2Life - Episode ${episode.id}: ${episode.title}`,
  }
}

export default async function Episode({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)
  let date = new Date(episode.published)

  return (
    <article className="py-16 lg:py-36">
      <Container>
        <header className="flex flex-col">
          <div className="flex items-center gap-6">
            <EpisodePlayButton
              episode={episode}
              className="group relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-3 focus:ring-[#b184e9] focus:ring-offset-4 focus:outline-hidden"
              playing={
                <PauseIcon className="h-9 w-9 fill-[#2e4954] group-active:fill-[#2e4954]/80" />
              }
              paused={
                <PlayIcon className="h-9 w-9 fill-[#2e4954] group-active:fill-[#2e4954]/80" />
              }
            />
                         <div className="flex flex-col">
               <h1 className="mt-2 text-4xl font-bold text-[#2e4954]">
                 Episode {episode.id}: {episode.title}
               </h1>
               <FormattedDate
                 date={date}
                 className="order-first font-mono text-sm/7 text-[#2e4954]/60"
               />
             </div>
          </div>
                     <p className="mt-3 ml-24 text-lg/8 font-medium text-[#2e4954]/80">
             {episode.description}
           </p>
        </header>
                 <hr className="my-12 border-[#99c96f]/20" />
      </Container>
    </article>
  )
}
