'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { TinyWaveFormIcon } from '@/components/podcasts/TinyWaveFormIcon'

export function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm/7 font-medium text-[#ffffff]">
        <TinyWaveFormIcon colors={['fill-[#b184e9]', 'fill-[#ffffff]']} className="h-2.5 w-2.5" />
        <span className="ml-2.5">About</span>
      </h2>
      <p className={clsx('mt-2 text-base/7 text-[#ffffff]/80', !isExpanded && 'lg:line-clamp-4')}>
        Through insightful conversations with professionals from various fields, we uncover career
        journeys, industry advancements, and valuable advice for students and aspiring
        professionals. Tune in to discover the many professions and different pathways in research
        and science that shape our world!
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm/6 font-bold text-[#b184e9] hover:text-[#9a6fd8] active:text-[#8a5fc8] lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
