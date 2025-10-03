import posterImage from '@/assets/podcasts/images/poster.png'
import { Container } from '@/components/home/container'
import { Footer } from '@/components/home/footer'
import { Gradient } from '@/components/home/gradient'
import { Navbar } from '@/components/home/navbar'
import { EpisodeEntry } from '@/components/podcasts/EpisodeEntry'
import { MobilePodcastContent } from '@/components/podcasts/MobilePodcastContent'
import { PodcastSidebar } from '@/components/podcasts/PodcastSidebar'
import { getAllEpisodes } from '@/lib/podcasts/episodes'
import Image from 'next/image'
import Link from 'next/link'


export default async function Home() {
  let episodes = await getAllEpisodes()

  return (
    <>
      <div className="relative hidden lg:block">
        <Gradient className="rounded-4xl absolute inset-2 bottom-0 ring-1 ring-inset ring-black/5" />
        <Container className="relative pb-12">
          <Navbar />
        </Container>
      </div>

      <div className="mb-2 bg-[#003e3e] lg:hidden">
        <div className="px-4 pb-4 -mt-2 pt-0 sm:mt-0 sm:pt-1 sm:px-6 md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-[#2e4954]/20 lg:px-6 lg:py-12 xl:px-8">
          <div className="mb-4 pb-4 sm:mb-6 sm:pb-0">
            <Navbar />
          </div>
          <MobilePodcastContent posterImage={posterImage} />
        </div>
      </div>

      <div className="flex min-h-screen pt-12 sm:pt-2">
        <PodcastSidebar />

        <div className="flex-1">
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

