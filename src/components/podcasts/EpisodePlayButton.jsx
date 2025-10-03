'use client'

import { useAudioPlayer } from '@/components/podcasts/AudioProvider'

export function EpisodePlayButton({ episode, playing, paused, ...props }) {
  let player = useAudioPlayer(episode)

  const hasAudio = episode && episode.audio && episode.audio.src

  return (
    <button
      type="button"
      onClick={() => hasAudio ? player.toggle() : console.warn('No audio available for this episode')}
      aria-label={`${player.playing ? 'Pause' : 'Play'} Episode ${episode.id}: ${episode.title}`}
      disabled={!hasAudio}
      className={!hasAudio ? 'opacity-50 cursor-not-allowed' : ''}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
