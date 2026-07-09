import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

const features = [1, 2, 3, 4, 5, 6]

export function IconFeatureGridDemo({ isExpanded }: { isExpanded: boolean }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-3 gap-2 ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      role="group"
      aria-label="Feature grid with staggered entrance animation"
    >
      {features.map((n) => (
        <motion.div
          key={n}
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          animate={visible ? { opacity: 1, scale: 1 } : undefined}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: n * 0.08, type: 'spring', stiffness: 300 }}
          className={`rounded-xl flex items-center justify-center transition-all duration-200 ${
            hovered === n ? 'scale-105 bg-[rgba(6,182,212,0.12)]' : ''
          } ${isExpanded ? 'p-4' : 'p-2'}`}
          style={{ background: hovered === n ? undefined : 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.06)' }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={`rounded-lg ${isExpanded ? 'w-8 h-8' : 'w-3 h-3'}`} style={{ background: 'rgba(6,182,212,0.15)' }} />
        </motion.div>
      ))}
    </div>
  )
}
