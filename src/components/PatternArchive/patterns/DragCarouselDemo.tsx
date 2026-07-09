import { useState, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const cards = [
  { name: 'Alex', text: 'Incredible work on the new dashboard.' },
  { name: 'Sam', text: 'The attention to detail is remarkable.' },
  { name: 'Jordan', text: 'Best design system I have used.' },
]

export function DragCarouselDemo({ isExpanded }: { isExpanded: boolean }) {
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50
    if (info.offset.x < -threshold || info.velocity.x < -200) {
      setActive((prev) => Math.min(prev + 1, cards.length - 1))
    } else if (info.offset.x > threshold || info.velocity.x > 200) {
      setActive((prev) => Math.max(prev - 1, 0))
    }
    animate(x, -active * (isExpanded ? 220 : 100), { type: 'spring', stiffness: 300, damping: 30 })
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${isExpanded ? 'min-h-[300px]' : ''}`}
      role="group"
      aria-label="Draggable testimonial carousel"
    >
      <motion.div
        className="flex gap-3 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -(cards.length - 1) * (isExpanded ? 220 : 100), right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd as never}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex-shrink-0 rounded-xl p-4 ${isExpanded ? 'w-52' : 'w-24'}`}
            style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.08)' }}
          >
            <div className={`font-medium text-vault-text-bright mb-1 ${isExpanded ? 'text-sm' : 'text-xs'}`}>
              {card.name}
            </div>
            <p className={`text-[#999] ${isExpanded ? 'text-xs' : 'text-[10px]'}`}>{card.text}</p>
          </div>
        ))}
      </motion.div>
      <div className="flex justify-center gap-1.5 mt-3">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              active === i ? 'bg-[rgba(6,182,212,0.5)]' : 'bg-[rgba(6,182,212,0.15)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
