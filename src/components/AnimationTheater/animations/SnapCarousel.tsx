import { useState } from 'react'
import { motion } from 'framer-motion'

const items = [
  { id: 0, color: '#6366f1', label: '01' },
  { id: 1, color: '#f43f5e', label: '02' },
  { id: 2, color: '#10b981', label: '03' },
  { id: 3, color: '#a855f7', label: '04' },
  { id: 4, color: '#06b6d4', label: '05' },
]

const ITEM_WIDTH = 128

export function SnapCarousel() {
  const [active, setActive] = useState(0)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-48 overflow-hidden rounded-xl">
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={{ left: -(items.length * ITEM_WIDTH - 256), right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            const snap = Math.round(info.offset.x / ITEM_WIDTH)
            const newActive = Math.max(0, Math.min(items.length - 1, active - snap))
            setActive(newActive)
          }}
          animate={{ x: -active * ITEM_WIDTH }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-32 h-full flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: item.color }}
            >
              {item.label}
            </div>
          ))}
        </motion.div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {items.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                background: i === active ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
