import { useRef, useLayoutEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionTransitionProps {
  accent?: string
  children: React.ReactNode
  sectionKey: string
}

export function SectionTransition({ accent = '#6366f1', children, sectionKey }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

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

  return (
    <div ref={ref} data-section={sectionKey} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
        }}
      />
    </div>
  )
}
