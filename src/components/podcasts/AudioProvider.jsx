'use client'

import { createContext, useContext, useMemo, useReducer, useRef } from 'react'

const ActionKind = {
  SET_META: 'SET_META',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
}

const AudioPlayerContext = createContext(null)

function audioReducer(state, action) {
  switch (action.type) {
    case ActionKind.SET_META:
      return { ...state, episode: action.payload }
    case ActionKind.PLAY:
      return { ...state, playing: true }
    case ActionKind.PAUSE:
      return { ...state, playing: false }
    case ActionKind.TOGGLE_MUTE:
      return { ...state, muted: !state.muted }
    case ActionKind.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case ActionKind.SET_DURATION:
      return { ...state, duration: action.payload }
  }
}

export function AudioProvider({ children }) {
  let [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    episode: null,
  })
  let playerRef = useRef(null)

  let actions = useMemo(() => {
    const play = (episode) => {
      const currentEpisode = episode || state.episode
      if (currentEpisode && currentEpisode.audio && currentEpisode.audio.src) {
        // If no episode is passed but we have one in state, just resume
        if (!episode && state.episode) {
          if (playerRef.current) {
            playerRef.current.play().catch((error) => {
              console.error('Error playing audio:', error)
            })
          }
          return
        }
        
        // Check if this is the same episode using ID (most reliable) or URL
        const isSameEpisodeById = state.episode && 
          currentEpisode.id && 
          state.episode.id === currentEpisode.id
        
        // Also check by URL (normalize for comparison)
        const currentSrc = playerRef.current?.currentSrc || ''
        const newSrc = currentEpisode.audio.src
        const getUrlPath = (url) => {
          if (!url) return ''
          try {
            if (url.startsWith('http://') || url.startsWith('https://')) {
              return new URL(url).pathname
            }
            return url
          } catch {
            // Extract filename from full URL if URL parsing fails
            const parts = url.split('/')
            return parts[parts.length - 1]
          }
        }
        const isSameEpisodeByUrl = playerRef.current && 
          currentSrc && 
          (getUrlPath(currentSrc) === getUrlPath(newSrc) || 
           currentSrc.includes(newSrc) || 
           newSrc.includes(getUrlPath(currentSrc)))
        
        const isSameEpisode = isSameEpisodeById || isSameEpisodeByUrl
        
        // If it's the same episode, just resume playback without resetting
        if (isSameEpisode && playerRef.current) {
          // Same episode - just resume from current position
          playerRef.current.play().catch((error) => {
            console.error('Error playing audio:', error)
          })
          return
        }
        
        // Different episode - load new audio
        dispatch({ type: ActionKind.SET_META, payload: currentEpisode })

        if (playerRef.current) {
          let playbackRate = playerRef.current.playbackRate
          playerRef.current.src = currentEpisode.audio.src
          playerRef.current.load()
          playerRef.current.pause()
          playerRef.current.playbackRate = playbackRate
          playerRef.current.currentTime = 0

          console.log('Loading audio from:', currentEpisode.audio.src)
          
          // Start playback after loading
          playerRef.current.play().catch((error) => {
            console.error('Error playing audio:', error)
          })
        }
      } else {
        console.warn('Episode or audio source is missing:', currentEpisode)
        return
      }
    }

    const pause = () => {
      if (playerRef.current) {
        playerRef.current.pause()
      }
    }

    const isPlaying = (episode) => {
      if (!playerRef.current) return false
      
      // Check if audio element is actually playing
      const audioIsPlaying = !playerRef.current.paused && 
        !playerRef.current.ended && 
        playerRef.current.readyState > 2
      
      if (!episode) {
        return audioIsPlaying && state.playing
      }
      
      // For a specific episode, check if it matches and is playing
      if (!episode.audio || !episode.audio.src) return false
      
      // Normalize URLs for comparison
      const getUrlPath = (url) => {
        if (!url) return ''
        try {
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return new URL(url).pathname
          }
          return url
        } catch {
          const parts = url.split('/')
          return parts[parts.length - 1]
        }
      }
      
      const currentSrc = playerRef.current.currentSrc || ''
      const episodeSrc = episode.audio.src
      const srcMatches = getUrlPath(currentSrc) === getUrlPath(episodeSrc) ||
        currentSrc.includes(episodeSrc) ||
        episodeSrc.includes(getUrlPath(currentSrc)) ||
        (episode.id && state.episode?.id === episode.id)
      
      return audioIsPlaying && state.playing && srcMatches
    }

    const toggle = (episode) => {
      const currentEpisode = episode || state.episode
      return isPlaying(currentEpisode) ? pause() : play(currentEpisode)
    }

    return {
      play,
      pause,
      toggle,
      seekBy(amount) {
        if (playerRef.current) {
          playerRef.current.currentTime += amount
        }
      },
      seek(time) {
        if (playerRef.current) {
          playerRef.current.currentTime = time
        }
      },
      playbackRate(rate) {
        if (playerRef.current) {
          playerRef.current.playbackRate = rate
        }
      },
      toggleMute() {
        dispatch({ type: ActionKind.TOGGLE_MUTE })
      },
      isPlaying,
      clear() {
        dispatch({ type: ActionKind.SET_META, payload: null })
        if (playerRef.current) {
          playerRef.current.pause()
        }
      },
    }
  }, [state.playing])

  let api = useMemo(() => ({ ...state, ...actions }), [state, actions])

  return (
    <>
      <AudioPlayerContext.Provider value={api}>{children}</AudioPlayerContext.Provider>
      <audio
        ref={playerRef}
        onPlay={() => dispatch({ type: ActionKind.PLAY })}
        onPause={() => dispatch({ type: ActionKind.PAUSE })}
        onTimeUpdate={(event) => {
          dispatch({
            type: ActionKind.SET_CURRENT_TIME,
            payload: Math.floor(event.currentTarget.currentTime),
          })
        }}
        onDurationChange={(event) => {
          dispatch({
            type: ActionKind.SET_DURATION,
            payload: Math.floor(event.currentTarget.duration),
          })
        }}
        onError={(event) => {
          console.error('Audio loading error:', event.currentTarget.error)
        }}
        onLoadStart={() => {
          console.log('Audio loading started')
        }}
        onCanPlay={() => {
          console.log('Audio can play')
        }}
        preload="metadata"
        muted={state.muted}
      />
    </>
  )
}

export function useAudioPlayer(episode) {
  let player = useContext(AudioPlayerContext)

  return useMemo(
    () => ({
      ...player,
      play() {
        player.play(episode)
      },
      toggle() {
        player.toggle(episode)
      },
      get playing() {
        return player.isPlaying(episode)
      },
    }),
    [player, episode],
  )
}
