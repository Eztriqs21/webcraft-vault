import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export function DragThrow() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-48">
        {[0, 1, 2].map((i) => (
          <DraggableBall key={i} index={i} />
        ))}
      </div>
    </div>
  )
}

function DraggableBall({ index }: { index: number }) {
  const colors = ['#6366f1', '#f43f5e', '#10b981']
  const posRef = useRef({ x: index * 80 + 20, y: 100 })
  const ballRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = useCallback((_: unknown, info: { velocity: { x: number; y: number }; offset: { x: number; y: number } }) => {
    const start = posRef.current
    const newX = Math.max(0, Math.min(220, start.x + info.offset.x + info.velocity.x * 0.5))
    const newY = Math.max(0, Math.min(140, start.y + info.offset.y + info.velocity.y * 0.5))
    posRef.current = { x: newX, y: newY }
    if (ballRef.current) {
      ballRef.current.style.left = `${newX}px`
      ballRef.current.style.top = `${newY}px`
    }
  }, [])

  return (
    <motion.div
      ref={ballRef}
      drag
      dragMomentum={false}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.2 }}
      className="absolute w-12 h-12 rounded-full cursor-grab active:cursor-grabbing"
      style={{
        left: posRef.current.x,
        top: posRef.current.y,
        background: colors[index],
        boxShadow: `0 4px 20px ${colors[index]}55`,
      }}
      data-cursor="grab"
    />
  )
}
