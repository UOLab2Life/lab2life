'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({ start, end, decimals = 0 }) {
  let ref = useRef(null)
  let isInView = useInView(ref, { once: true, amount: 0.5 })

  let value = useMotionValue(start)
  let spring = useSpring(value, { damping: 80, stiffness: 100 })
  let display = useTransform(spring, (num) => num.toFixed(decimals))

  useEffect(() => {
    if (isInView) {
      value.set(end)
    }
  }, [start, end, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
