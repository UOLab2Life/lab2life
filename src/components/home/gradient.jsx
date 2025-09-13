import { clsx } from 'clsx'

export function Gradient({ className, ...props }) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'bg-linear-115 sm:bg-linear-145 from-[#003e3e] from-35% via-[#b184e9] via-80% to-[#b184e9]',
      )}
    />
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'w-xl absolute -right-60 -top-44 h-60 transform-gpu md:right-0',
          'bg-linear-115 from-28% from-[#fff1be] via-[#ee87cb] via-70% to-[#b060ff]',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
