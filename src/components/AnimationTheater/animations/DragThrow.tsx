import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

export function DragThrow() {
  const constraintsRef = useRef(null)

  return (
    <div className="w-full h-full flex items-center justify-center" ref={constraintsRef}>
      <div className="relative w-64 h-48">
        {[0, 1, 2].map((i) => (
          <DraggableBall key={i} index={i} parentRef={constraintsRef} />
        ))}
      </div>
    </div>
  )
}

function DraggableBall({ index, parentRef }: { index: number; parentRef: React.RefObject<HTMLDivElement | null> }) {
  const colors = ['#6366f1', '#f43f5e', '#10b981']
  const [pos, setPos] = useState({ x: index * 80 + 20, y: 100 })

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const velocity = info.velocity
    const momentum = 0.5
    setPos({
      x: Math.max(0, Math.min(220, pos.x + velocity.x * momentum)),
      y: Math.max(0, Math.min(140, pos.y + velocity.y * momentum)),
    })
  }, [pos])

  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.2 }}
      className="absolute w-12 h-12 rounded-full cursor-grab active:cursor-grabbing"
      style={{
        background: colors[index],
        boxShadow: `0 4px 20px ${colors[index]}55`,
      }}
      data-cursor="grab"
    />
  )
}
