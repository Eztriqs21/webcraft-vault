import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SectionTransitionProps {
  accent?: string
  children: React.ReactNode
  sectionKey: string
}

export function SectionTransition({ accent = '#6366f1', children, sectionKey }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((prev) => (prev === 'exiting' ? 'visible' : prev === 'hidden' ? 'entering' : prev))
        }
      },
      { threshold: 0.1, rootMargin: '-5% 0px' }
    )

    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setPhase((prev) => (prev === 'visible' || prev === 'entering' ? 'exiting' : prev))
        }
      },
      { threshold: 0.05, rootMargin: '-90% 0px 0px 0px' }
    )

    enterObserver.observe(el)
    exitObserver.observe(el)

    return () => {
      enterObserver.disconnect()
      exitObserver.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = () => {
      window.dispatchEvent(
        new CustomEvent('section-accent-change', { detail: { accent } })
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handler()
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [accent])

  const isVisible = phase === 'visible' || phase === 'entering'
  const isExiting = phase === 'exiting'

  if (prefersReducedMotion) {
    return (
      <div ref={ref} data-section={sectionKey} className="relative">
        {children}
        <div
          className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
        />
      </div>
    )
  }

  return (
    <div ref={ref} data-section={sectionKey} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(8px)' }}
        animate={
          isExiting
            ? { opacity: 0, y: -30, scale: 0.99, filter: 'blur(4px)' }
            : isVisible
            ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: 60, scale: 0.98, filter: 'blur(8px)' }
        }
        transition={{ duration: isExiting ? 0.4 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Gradient divider line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          isExiting
            ? { opacity: 0, scaleX: 0 }
            : isVisible
            ? { opacity: 1, scaleX: 1 }
            : { opacity: 0, scaleX: 0 }
        }
        transition={{ duration: 1.2, delay: isExiting ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none origin-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
        }}
      />
    </div>
  )
}
