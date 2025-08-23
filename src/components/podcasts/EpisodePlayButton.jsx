'use client'

import { useAudioPlayer } from '@/components/podcasts/AudioProvider'

export function EpisodePlayButton({ episode, playing, paused, ...props }) {
  let player = useAudioPlayer(episode)

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? 'Pause' : 'Play'} Episode ${episode.id}: ${
        episode.title
      }`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
