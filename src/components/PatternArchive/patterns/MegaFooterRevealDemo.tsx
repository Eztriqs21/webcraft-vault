import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export function MegaFooterRevealDemo({ isExpanded }: { isExpanded: boolean }) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-end ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      role="group"
      aria-label="Footer reveal on scroll"
    >
      <motion.div
        initial={prefersReducedMotion ? { height: '100%', opacity: 1 } : { height: '0%', opacity: 0 }}
        animate={revealed ? { height: '100%', opacity: 1 } : undefined}
        transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 25 }}
        className="rounded-xl overflow-hidden"
        style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.08)' }}
      >
        <div className={`${isExpanded ? 'p-4 space-y-2' : 'p-2 space-y-1'}`}>
          <div className={`rounded ${isExpanded ? 'h-3 w-24' : 'h-1 w-10'}`} style={{ background: 'rgba(6,182,212,0.2)' }} />
          <div className={`rounded ${isExpanded ? 'h-2 w-40' : 'h-1 w-14'}`} style={{ background: 'rgba(6,182,212,0.08)' }} />
          <div className={`rounded ${isExpanded ? 'h-2 w-32' : 'h-1 w-10'}`} style={{ background: 'rgba(6,182,212,0.08)' }} />
        </div>
      </motion.div>
    </div>
  )
}
