'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/home/button'
import { Container } from '@/components/home/container'
import { Heading } from '@/components/home/text'
import { AudioProvider, useAudioPlayer } from '@/components/podcasts/AudioProvider'
import { EpisodePlayButton } from '@/components/podcasts/EpisodePlayButton'
import { PauseIcon } from '@/components/podcasts/PauseIcon'
import { PlayIcon } from '@/components/podcasts/PlayIcon'
import { ForwardButton } from '@/components/podcasts/player/ForwardButton'
import { MuteButton } from '@/components/podcasts/player/MuteButton'
import { PlaybackRateButton } from '@/components/podcasts/player/PlaybackRateButton'
import { PlayButton } from '@/components/podcasts/player/PlayButton'
import { RewindButton } from '@/components/podcasts/player/RewindButton'
import { Slider } from '@/components/podcasts/player/Slider'

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
    <div className="flex items-center gap-6 bg-white/90 px-4 py-4 shadow-sm ring-1 shadow-slate-200/80 ring-slate-900/5 backdrop-blur-xs md:px-6">
      <div className="hidden md:block">
        <PlayButton player={player} />
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        <div className="truncate text-center text-sm/6 font-bold md:text-left">
          Episode {player.episode.id}: {player.episode.title}
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
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-hidden transition-colors"
              aria-label="Close audio player"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PodcastPlayer({ mp3FileName }) {
  const episode = {
    id: 1,
    title: "The Career Catalyst",
    audio: {
      src: mp3FileName ? `/podcast-previews/${mp3FileName}` : '/podcast-previews/episode-4-tcc-preview.mp3',
      type: 'audio/mp3',
    },
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 shadow-[#003e3e]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#003e3e]">Episode 4: Reading Between the Scans with Dr. Yale Erenberg (Preview)</h3>
          <EpisodePlayButton
            episode={episode}
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2 focus:outline-hidden"
            playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
            paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
          />
        </div>
        
        <div className="text-gray-600">
            Welcome to the March edition of the UOLab2Life podcast! This month, we're joined by Dr. Yale Erenberg,
            a radiologist working out of Southwestern Ontario. In this episode, we explore his role as a radiologist, 
            advances in imaging technology, and career insights for aspiring students.
        </div>
      </div>
    </div>
  )
}

export function PodcastPreview({ mp3FileName = "episode-4-tcc-preview.mp3" }) {
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
      <div className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <Heading as="h2" className="text-4xl font-bold text-[#003e3e] mb-6">
              The Career Catalyst
            </Heading>
            <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Through insightful conversations with professionals from various fields, we uncover career journeys, 
            industry advancements, valuable advice for students and aspiring professionals. Tune in to discover 
            professions and different pathways in research and science that shape our world!
            </p>
          </div>
          
          <PodcastPlayerWithSync 
            mp3FileName={mp3FileName} 
            onPlayStarted={handlePlayStarted}
            onClose={handleCloseAudioPlayer}
            isPlaying={showAudioPlayer}
          />
          
          <div className="text-center mt-8">
            <Button
              href="/podcasts"
              className="text-base px-6 py-2 sm:text-lg sm:px-8 sm:py-3 text-center w-64"
            >
              View All Episodes
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
  const player = useAudioPlayer()
  const episode = {
    id: 4,
    title: "Reading Between the Scans with Dr. Yale Erenberg (Preview)",
    audio: {
      src: mp3FileName ? `/podcast-previews/${mp3FileName}` : '/podcast-previews/episode-4-tcc-preview.mp3',
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
    <div className="w-11/12 mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 shadow-[#003e3e]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#003e3e]">Episode 4: Reading Between the Scans with Dr. Yale Erenberg (Preview)</h3>
          {!isPlaying && (
            <EpisodePlayButton
              episode={episode}
              className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2 focus:outline-hidden"
              playing={<PauseIcon className="h-5 w-5 fill-[#003e3e]" />}
              paused={<PlayIcon className="h-5 w-5 fill-[#003e3e]" />}
            />
          )}
        </div>
        
        <div className="text-gray-600">
          Welcome to the March edition of the UOLab2Life podcast! This month, we're joined by Dr. Yale Erenberg,
          a radiologist working out of Southwestern Ontario. In this episode, we explore his role as a radiologist, 
          advances in imaging technology, and career insights for aspiring students.
        </div>
      </div>
    </div>
  )
}
