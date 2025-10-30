'use client'

import { Button } from '@/components/home/button'
import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'
import { AudioProvider, useAudioPlayer } from '@/components/podcasts/AudioProvider'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { PauseIcon } from '@/components/podcasts/PauseIcon'
import { ForwardButton } from '@/components/podcasts/player/ForwardButton'
import { MuteButton } from '@/components/podcasts/player/MuteButton'
import { PlaybackRateButton } from '@/components/podcasts/player/PlaybackRateButton'
import { PlayButton } from '@/components/podcasts/player/PlayButton'
import { RewindButton } from '@/components/podcasts/player/RewindButton'
import { Slider } from '@/components/podcasts/player/Slider'
import { PlayIcon } from '@/components/podcasts/PlayIcon'
import { useTranslation } from '@/contexts/LanguageContext'
import { getLocalizedUrl } from '@/lib/url-localization'
import { useEffect, useRef, useState } from 'react'

function parseTime(seconds) {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, seconds]
}

function formatHumanTime(seconds) {
  let [h, m, s] = parseTime(seconds)
  return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${
    m === 1 ? '' : 's'
  }, ${s} second${s === 1 ? '' : 's'}`
}

function CustomAudioPlayer({ onClose }) {
  const { t, locale } = useTranslation()
  let player = useAudioPlayer()
  let wasPlayingRef = useRef(false)
  let [currentTime, setCurrentTime] = useState(player.currentTime)

  useEffect(() => {
    setCurrentTime(null)
  }, [player.currentTime])

  if (!player.episode) {
    return null
  }

  const handleClose = () => {
    player.clear()
    onClose()
  }

  return (
    <div className="backdrop-blur-xs flex items-center gap-6 bg-white/90 px-4 py-4 shadow-sm shadow-slate-200/80 ring-1 ring-slate-900/5 md:px-6">
      <div className="hidden md:block">
        <PlayButton player={player} />
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        <div className="truncate text-center text-sm/6 font-bold md:text-left">
          {locale === 'fr' ? `Épisode ${player.episode.id}: ${player.episode.title} (anglais, aperçu)` : `Episode ${player.episode.id}: ${player.episode.title} (Preview)`}
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex items-center md:hidden">
            <MuteButton player={player} />
          </div>
          <div className="flex flex-none items-center gap-4">
            <RewindButton player={player} />
            <div className="md:hidden">
              <PlayButton player={player} />
            </div>
            <ForwardButton player={player} />
          </div>
          <Slider
            label="Current time"
            maxValue={player.duration}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([value]) => setCurrentTime(value)}
            onChangeEnd={([value]) => {
              player.seek(value)
              if (wasPlayingRef.current) {
                player.play()
              }
            }}
            numberFormatter={{ format: formatHumanTime }}
            onChangeStart={() => {
              wasPlayingRef.current = player.playing
              player.pause()
            }}
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <PlaybackRateButton player={player} />
            </div>
            <div className="hidden items-center md:flex">
              <MuteButton player={player} />
            </div>
            <button
              onClick={handleClose}
              className="focus:outline-hidden flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label="Close audio player"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PodcastPlayer({ mp3FileName }) {
  const { t, locale } = useTranslation()
  const episode = {
    id: 1,
    title: 'The Career Catalyst',
    audio: {
      src: mp3FileName
        ? `/podcast-previews/${mp3FileName}`
        : '/podcast-previews/episode-4-tcc-preview.mp3',
      type: 'audio/mp3',
    },
  }

  return (
    <div className="mx-auto w-11/12">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg shadow-[#003e3e]/20">
        <div className="mb-4 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-[#003e3e] sm:text-2xl">
            {t('home.podcastPreview.episodeTitle') || 'Episode 4: Reading Between the Scans with Dr. Yale Erenberg (Preview)'}
          </h3>
          <div className="hidden sm:flex sm:justify-end">
            <EpisodePlayButton
              episode={episode}
              className="focus:outline-hidden group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2"
              playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
              paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
            />
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          {t('home.podcastPreview.episodeDescription') || "Welcome to the March edition of the UOLab2Life podcast! This month, we're joined by Dr. Yale Erenberg, a radiologist working out of Southwestern Ontario. In this episode, we explore his role as a radiologist, advances in imaging technology, and career insights for aspiring students."}
        </div>

        <div className="mt-6 mb-2 flex justify-center sm:hidden">
          <EpisodePlayButton
            episode={episode}
            className="focus:outline-hidden group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2"
            playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
            paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
          />
        </div>
      </div>
    </div>
  )
}

export function PodcastPreview({ mp3FileName = 'episode-5-preview.mp3' }) {
  const { t, locale } = useTranslation()
  const [showAudioPlayer, setShowAudioPlayer] = useState(false)
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false)

  const handleCloseAudioPlayer = () => {
    setShowAudioPlayer(false)
    setHasStartedPlaying(false)
  }

  const handlePlayStarted = () => {
    setHasStartedPlaying(true)
    setShowAudioPlayer(true)
  }

  return (
    <AudioProvider>
      <div className="bg-white py-8 sm:py-16">
        <Container>
          <div className="mb-12 text-center">
            <Heading as="h2" className="mb-6 text-4xl font-bold text-[#003e3e]">
              {t('home.podcastPreview.title') || 'The Career Catalyst'}
            </Heading>
            <p className="mx-auto max-w-5xl text-xl text-gray-600">
              {t('home.podcastPreview.description') || "Through insightful conversations with professionals from various fields, we uncover career journeys, industry advancements, valuable advice for students and aspiring professionals. Tune in to discover professions and different pathways in research and science that shape our world!"}
            </p>
          </div>

          <PodcastPlayerWithSync
            mp3FileName={mp3FileName}
            onPlayStarted={handlePlayStarted}
            onClose={handleCloseAudioPlayer}
            isPlaying={showAudioPlayer}
          />

          <div className="mt-8 text-center">
            <Button
              href={getLocalizedUrl('/podcasts', locale)}
              className="mx-auto w-[70%] max-w-sm px-6 py-2 text-center text-base sm:px-8 sm:py-3 sm:text-lg lg:w-1/3"
            >
              {t('home.podcastPreview.viewAllEpisodes') || 'View All Episodes'}
            </Button>
          </div>
        </Container>
      </div>

      {showAudioPlayer && (
        <div className="fixed inset-x-0 bottom-0 z-10">
          <CustomAudioPlayer onClose={handleCloseAudioPlayer} />
        </div>
      )}
    </AudioProvider>
  )
}

function PodcastPlayerWithSync({ mp3FileName, onPlayStarted, onClose, isPlaying }) {
  const { t, locale } = useTranslation()
  const player = useAudioPlayer()
  const episode = {
    id: 5,
    title: 'Psychotherapy Unpacked with Giovanna Sacca',
    audio: {
      src: mp3FileName
        ? `/podcast-previews/${mp3FileName}`
        : '/podcast-previews/episode-5-preview.mp3',
      type: 'audio/mp3',
    },
  }

  useEffect(() => {
    if (player.episode && player.episode.id === episode.id && player.playing) {
      onPlayStarted()
    }
  }, [player.episode, player.playing, episode.id, onPlayStarted])

  useEffect(() => {
    if (player.episode && player.episode.id !== episode.id && isPlaying) {
      onClose()
    }
  }, [player.episode, episode.id, isPlaying, onClose])

  return (
    <div className="mx-auto w-11/12">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg shadow-[#003e3e]/20">
        <div className="mb-4 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold text-[#003e3e] sm:text-2xl">
            {locale === 'fr' 
              ? 'Épisode 5: Psychotherapy Unpacked with Giovanna S. (anglais, aperçu)'
              : 'Episode 5: Psychotherapy Unpacked with Giovanna Sacca (Preview)'}
          </h3>
          {!isPlaying && (
            <div className="hidden sm:flex sm:justify-end">
              <EpisodePlayButton
                episode={episode}
                className="focus:outline-hidden group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2"
                playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
                paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
              />
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          {locale === 'fr'
            ? "Dans cet épisode de « The Career Catalyst », nous rencontrons Giovanna S., psychothérapeute en cours d'agrément, pour explorer la réalité de la psychothérapie, ce que signifie accompagner autrui, les fondements scientifiques de la guérison émotionnelle et comment la thérapie peut être une source d'épanouissement pour les étudiants comme pour les professionnels. De son parcours professionnel à son utilisation d'approches validées scientifiquement telles que les thérapies cognitivo-comportementales (TCC), la thérapie d'acceptation et d'engagement (ACT), la thérapie centrée sur les émotions (EFT) et la pleine conscience, Giovanna partage des conseils pratiques pour toute personne intéressée par la santé mentale, le développement personnel ou les carrières en thérapie."
            : "In this episode of The Career Catalyst, we sit down with Giovanna Sacca, a Registered Psychotherapist (Qualifying), to explore the real-world side of psychotherapy, what it means to support others, the science behind emotional healing, and how therapy can empower students and professionals alike. From her journey into the field to her use of evidence-based approaches like CBT, ACT, EFT, and mindfulness, Giovanna shares practical insights for anyone curious about mental health, personal growth, or careers in therapy."}
        </div>

        {!isPlaying && (
          <div className="mt-6 mb-2 flex justify-center sm:hidden">
            <EpisodePlayButton
              episode={episode}
              className="focus:outline-hidden group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2"
              playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
              paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
