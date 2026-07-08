import { useRef, useEffect, useCallback } from 'react'
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
  const velRef = useRef({ x: 0, y: 0 })
  const ballRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const lastMouse = useRef({ x: 0, y: 0, time: 0 })

  const FRICTION = 0.96
  const BOUNCE = 0.6
  const MAX_X = 220
  const MAX_Y = 140

  const updateTransform = useCallback((x: number, y: number) => {
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }, [])

  const physicsLoop = useCallback(() => {
    if (isDragging.current) {
      rafRef.current = requestAnimationFrame(physicsLoop)
      return
    }

    const pos = posRef.current
    const vel = velRef.current

    vel.x *= FRICTION
    vel.y *= FRICTION

    pos.x += vel.x
    pos.y += vel.y

    if (pos.x < 0) { pos.x = 0; vel.x *= -BOUNCE }
    if (pos.x > MAX_X) { pos.x = MAX_X; vel.x *= -BOUNCE }
    if (pos.y < 0) { pos.y = 0; vel.y *= -BOUNCE }
    if (pos.y > MAX_Y) { pos.y = MAX_Y; vel.y *= -BOUNCE }

    updateTransform(pos.x, pos.y)

    if (Math.abs(vel.x) > 0.1 || Math.abs(vel.y) > 0.1) {
      rafRef.current = requestAnimationFrame(physicsLoop)
    }
  }, [updateTransform])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y }
    lastMouse.current = { x: e.clientX, y: e.clientY, time: performance.now() }
    velRef.current = { x: 0, y: 0 }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const now = performance.now()
    const dt = Math.max(now - lastMouse.current.time, 1)

    const newX = Math.max(0, Math.min(MAX_X, e.clientX - dragStart.current.x))
    const newY = Math.max(0, Math.min(MAX_Y, e.clientY - dragStart.current.y))

    velRef.current.x = (newX - posRef.current.x) / dt * 16
    velRef.current.y = (newY - posRef.current.y) / dt * 16

    posRef.current = { x: newX, y: newY }
    lastMouse.current = { x: e.clientX, y: e.clientY, time: now }

    updateTransform(newX, newY)
  }, [updateTransform])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
    rafRef.current = requestAnimationFrame(physicsLoop)
  }, [physicsLoop])

  return (
    <motion.div
      ref={ballRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      whileTap={{ scale: 1.2 }}
      className="absolute w-12 h-12 rounded-full cursor-grab active:cursor-grabbing touch-none"
      style={{
        transform: `translate(${posRef.current.x}px, ${posRef.current.y}px)`,
        background: colors[index],
        boxShadow: `0 4px 20px ${colors[index]}55`,
        willChange: 'transform',
      }}
      data-cursor="grab"
    />
  )
}
