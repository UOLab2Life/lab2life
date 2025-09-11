import { AudioProvider } from '@/components/podcasts/AudioProvider'
import { AudioPlayer } from '@/components/podcasts/player/AudioPlayer'

export default function MainLayout({ children }) {
  return (
    <AudioProvider>
      <main className="relative">
        <div className="relative">{children}</div>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-10">
        <AudioPlayer />
      </div>
    </AudioProvider>
  )
}
