import { clsx } from 'clsx'

export function Heading({ className, as: Element = 'h2', dark = false, ...props }) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'data-dark:text-white text-pretty text-4xl font-medium tracking-tighter text-[#003e3e] sm:text-6xl',
      )}
    />
  )
}

export function Subheading({ className, as: Element = 'h2', dark = false, ...props }) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'data-dark:text-gray-400 font-mono text-lg/6 font-medium uppercase tracking-widest text-gray-500',
      )}
    />
  )
}

export function Lead({ className, ...props }) {
  return <p className={clsx(className, 'text-2xl font-semibold text-gray-500')} {...props} />
}
