import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#06b6d4', '#fbbf24']

export function FlipAnimation() {
  const [items, setItems] = useState(() =>
    COLORS.map((color, i) => ({ id: i, color, label: String(i + 1) }))
  )

  const shuffle = useCallback(() => {
    setItems((prev) => {
      const arr = [...prev]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    })
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ background: item.color }}
          >
            {item.label}
          </motion.div>
        ))}
      </div>
      <button
        onClick={shuffle}
        className="px-4 py-2 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-all"
        data-cursor="pointer"
      >
        Shuffle
      </button>
    </div>
  )
}
