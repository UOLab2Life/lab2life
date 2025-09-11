import posterImage from '@/assets/podcasts/images/poster.png'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { FormattedDate } from '@/components/podcasts/FormattedDate'
import { PodcastSidebar } from '@/components/podcasts/PodcastSidebar'
import { TinyWaveFormIcon } from '@/components/podcasts/TinyWaveFormIcon'
import { getAllEpisodes } from '@/lib/podcasts/episodes'
import Image from 'next/image'
import Link from 'next/link'

function SpotifyIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

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

  const categories = episode.category
    ? episode.category
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat)
    : []

  return (
    <article aria-labelledby={`episode-${episode.id}-title`} className="py-4 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start rounded-2xl bg-white/50 p-8 transition-all duration-300 hover:scale-105 hover:bg-white/70 hover:shadow-lg">
          <div className="w-full pb-4 sm:pb-0">
            <h2
              id={`episode-${episode.id}-title`}
              className="mb-4 mt-2 text-3xl font-bold text-[#2e4954]"
            >
              <Link href={`/podcasts/${episode.id}`}>
                Episode {episode.id}: {episode.title}
              </Link>
            </h2>
          </div>
          <FormattedDate
            date={date}
            className="text-md/7 order-first mb-4 font-mono font-bold text-[#003e3e]/60"
          />
          <p className="mt-1 text-base/7 text-[#2e4954]/80">{episode.description}</p>

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
            <span aria-hidden="true" className="text-sm font-bold text-[#2e4954]/40">
              |
            </span>
            <Link
              href={`/podcasts/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-[#b184e9] hover:text-[#9a6fd8] active:text-[#8a5fc8]"
              aria-label={`More details for Episode ${episode.id}: ${episode.title}`}
            >
              More
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
      <div className="relative hidden lg:block">
        <Gradient className="sm:rounded-4xl absolute inset-1 bottom-0 rounded-2xl ring-1 ring-inset ring-black/5 sm:inset-2" />
        <Container className="relative pb-8 sm:pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="mb-2 bg-[#003e3e] lg:hidden">
        <div className="px-4 pb-4 pt-2 sm:px-6 md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-[#2e4954]/20 lg:px-6 lg:py-12 xl:px-8">
          <div className="mb-4 sm:mb-6">
            <Navbar />
          </div>
          <Link
            href="https://open.spotify.com/show/2FOKjKAM3BkI0fRO4IiFrl?si=0137e6a883a442f5"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 sm:w-56 sm:rounded-xl md:w-64 md:rounded-2xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="w-full"
              src={posterImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, (min-width: 640px) 14rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl md:rounded-2xl lg:rounded-2xl" />
          </Link>
          <div className="mt-6 text-center sm:mt-8 md:mt-10 lg:mt-12 lg:text-left">
            <h2 className="text-2xl font-bold text-[#99c96f] sm:text-3xl">The Career Catalyst</h2>
            <p className="mt-3 text-sm/6 text-white sm:text-base/7">
              Through insightful conversations with professionals from various fields, we uncover
              career journeys, industry advancements, valuable advice for students and aspiring
              professionals. Tune in to discover professions and different pathways in research and
              science that shape our world!
            </p>
          </div>
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm/7 font-medium text-[#ffffff] lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-[#b184e9]', 'fill-[#8a5fc8]']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Listen on</span>
            </h2>
            <div className="bg-linear-to-r h-px from-[#ffffff]/0 via-[#ffffff]/30 to-[#ffffff]/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base/7 font-medium text-[#ffffff]/80 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                [
                  'Spotify',
                  SpotifyIcon,
                  'https://open.spotify.com/show/2FOKjKAM3BkI0fRO4IiFrl?si=0137e6a883a442f5',
                ],
                [
                  'Apple Podcasts',
                  ApplePodcastIcon,
                  'https://open.spotify.com/show/2FOKjKAM3BkI0fRO4IiFrl?si=0137e6a883a442f5',
                ],
              ].map(([label, Icon, href]) => (
                <li key={label} className="flex">
                  <Link
                    href={href}
                    className="group flex items-center"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-8 w-8 fill-[#ffffff]/60 group-hover:fill-[#b184e9]" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="flex min-h-screen">
        <PodcastSidebar />

        <div className="flex-1 pt-4 lg:pt-12">
          <div className="mt-0">
            {episodes.length > 0 ? (
              episodes.map((episode) => <EpisodeEntry key={episode.id} episode={episode} />)
            ) : (
              <div className="py-10 sm:py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <p className="text-base/7 text-[#003e3e]/80">
                    No episodes found. Please check your database connection and ensure the Episodes
                    table exists.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-12 sm:pt-2">
        <Footer />
      </div>
    </>
  )
}

export const revalidate = 10
