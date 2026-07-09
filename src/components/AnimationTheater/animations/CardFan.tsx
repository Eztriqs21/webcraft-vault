import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export function CardFan() {
  const prefersReducedMotion = useReducedMotion()
  const cards = [
    { color: '#6366f1', rotate: -30, delay: 0 },
    { color: '#f43f5e', rotate: -15, delay: 0.1 },
    { color: '#10b981', rotate: 0, delay: 0.2 },
    { color: '#a855f7', rotate: 15, delay: 0.3 },
    { color: '#06b6d4', rotate: 30, delay: 0.4 },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: 600 }} aria-hidden="true">
      <div className="relative w-32 h-44">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl"
            style={{
              background: card.color,
              transformOrigin: 'bottom center',
              backfaceVisibility: 'hidden',
            }}
            initial={{ rotateZ: 0, y: 0 }}
            whileHover={prefersReducedMotion ? {} : { rotateZ: card.rotate * 2, y: -20, scale: 1.1 }}
            animate={{
              rotateZ: prefersReducedMotion ? card.rotate * 0.5 : card.rotate,
              y: i * 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: prefersReducedMotion ? 0 : card.delay,
            }}
            data-cursor="pointer"
          />
        ))}
      </div>
    </div>
  )
}
