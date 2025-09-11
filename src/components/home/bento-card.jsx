'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Subheading } from './text'

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'group relative flex flex-col overflow-hidden rounded-lg',
        'shadow-xs bg-white ring-1 ring-black/5',
        'data-dark:bg-gray-800 data-dark:ring-white/15',
      )}
    >
      <div className="relative h-80 shrink-0">
        {graphic}
        {fade.includes('top') && (
          <div className="bg-linear-to-b group-data-dark:from-gray-800 group-data-dark:from-[-25%] absolute inset-0 from-white to-50%" />
        )}
        {fade.includes('bottom') && (
          <div className="bg-linear-to-t group-data-dark:from-gray-800 group-data-dark:from-[-25%] absolute inset-0 from-white to-50%" />
        )}
      </div>
      <div className="relative p-10">
        <Subheading as="h3" dark={dark}>
          {eyebrow}
        </Subheading>
        <p className="font-inter-semibold group-data-dark:text-white mt-1 text-2xl/8 tracking-tight text-gray-950">
          {title}
        </p>
        <p className="font-inter-semibold group-data-dark:text-gray-400 mt-2 max-w-[600px] text-sm/6 text-gray-600">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
