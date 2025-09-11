import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-6 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-[#99c96f] shadow-md',
    'whitespace-nowrap text-base font-semibold text-[#003e3e]',
    'data-disabled:bg-[#003e3e] data-disabled:opacity-40 data-hover:border-1 data-hover:border-[#003e3e] data-hover:bg-white transition-all duration-300 ease-in-out',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-6 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'whitespace-nowrap text-base font-semibold text-white',
    'data-disabled:bg-white/15 data-disabled:opacity-40 data-hover:bg-white/20 transition-all duration-300 ease-in-out',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
    'rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
    'whitespace-nowrap text-sm font-semibold text-gray-950',
    'data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50 transition-all duration-300 ease-in-out',
  ),
}

export function Button({ variant = 'primary', className, ...props }) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
