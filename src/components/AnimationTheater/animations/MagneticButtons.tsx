import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export function MagneticButtons() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }, [x, y])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 500 }}
        className="flex gap-4"
      >
        {['Play', 'Pause', 'Stop'].map((label, i) => (
          <MagneticButton key={label} label={label} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

function MagneticButton({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const dist = Math.hypot(latestX, latestY)
      return dist > 0 ? 1.1 : 1
    }
  )

  const colors = ['#6366f1', '#f43f5e', '#10b981']
  const color = colors[index]

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, scale, background: color }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 rounded-lg font-bold text-white text-sm select-none"
      data-cursor="pointer"
    >
      {label}
    </motion.button>
  )
}
