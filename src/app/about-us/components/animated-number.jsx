'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({ start, end, decimals = 0 }) {
  let ref = useRef(null)
  let isInView = useInView(ref, { once: true, amount: 0.5 })

  let value = useMotionValue(start)
  let spring = useSpring(value, { damping: 50, stiffness: 150 })
  let display = useTransform(spring, (num) => num.toFixed(decimals))

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        value.set(end)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [start, end, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
