import { useRef, useLayoutEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SectionTransitionProps {
  accent?: string
  children: React.ReactNode
  sectionKey: string
}

export function SectionTransition({ accent = '#6366f1', children, sectionKey }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const prefersReducedMotion = useReducedMotion()

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
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 60, scale: 0.98, filter: 'blur(8px)' }}
        animate={isInView
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 60, scale: 0.98, filter: 'blur(8px)' }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Gradient divider line */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        animate={isInView
          ? { opacity: 1, scaleX: 1 }
          : prefersReducedMotion ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
        }
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none origin-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
        }}
      />
    </div>
  )
}
