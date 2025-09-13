import { PauseIcon } from '@/components/podcasts/PauseIcon'
import { PlayIcon } from '@/components/podcasts/PlayIcon'

export function PlayButton({ player }) {
  let Icon = player.playing ? PauseIcon : PlayIcon

  return (
    <button
      type="button"
      className="focus:outline-hidden group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#99c96f] hover:bg-[#8ab85e] focus:ring-2 focus:ring-[#99c96f] focus:ring-offset-2 md:h-14 md:w-14"
      onClick={() => player.toggle()}
      aria-label={player.playing ? 'Pause' : 'Play'}
    >
      <div className="absolute -inset-3 md:hidden" />
      <Icon className="h-5 w-5 fill-[#003e3e] group-active:fill-[#003e3e]/80 md:h-7 md:w-7" />
    </button>
  )
}
