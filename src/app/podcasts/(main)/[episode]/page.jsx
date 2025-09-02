import { notFound } from 'next/navigation'
import { cache } from 'react'

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

  // Parse categories and create pills
  const categories = episode.category
    ? episode.category
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat)
    : []

  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null

    // Handle different YouTube URL formats
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    )

    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`
    }

    return url
  }

  const embedUrl = getYouTubeEmbedUrl(episode.youtube_url)

  return (
    <article className="py-16 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
                className="text-md/7 order-first font-mono font-bold text-[#003e3e]/60"
              />
            </div>
          </div>
          <p className="mt-3 ml-24 text-lg/8 font-medium text-[#2e4954]/80">
            {episode.description}
          </p>

          {/* Category Pills */}
          {categories.length > 0 && (
            <div className="mt-4 ml-24 flex flex-wrap gap-2">
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
        </header>

        {/* YouTube Video Embed */}
        {episode.youtube_url && embedUrl && (
          <div className="mt-12">
            <div className="relative mx-auto w-full max-w-5xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={embedUrl}
                className="absolute top-0 left-0 h-full w-full rounded-lg"
                title={`Episode ${episode.id} - ${episode.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
