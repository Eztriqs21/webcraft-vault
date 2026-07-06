import { useState } from 'react'
import { motion } from 'framer-motion'

const CARDS = [
  { id: 1, color: '#6366f1', label: 'Drag me' },
  { id: 2, color: '#f43f5e', label: 'Spring physics' },
  { id: 3, color: '#10b981', label: 'Bouncy feel' },
]

export function SpringyCards() {
  const [cards, setCards] = useState(CARDS)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            drag
            dragConstraints={{ left: -80, right: 80, top: -60, bottom: 60 }}
            dragElastic={0.6}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
            whileDrag={{ scale: 1.1, zIndex: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-32 md:w-28 md:h-36 rounded-xl cursor-grab active:cursor-grabbing flex flex-col items-center justify-center gap-2 select-none"
            style={{
              background: `linear-gradient(135deg, ${card.color}, ${card.color}88)`,
              boxShadow: `0 8px 32px ${card.color}33`,
            }}
            data-cursor="grab"
          >
            <span className="text-white text-xs font-bold">{card.label}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white/60"
            >
              <path
                d="M10 2L10 18M2 10L18 10M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
