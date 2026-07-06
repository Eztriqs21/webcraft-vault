import { useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function Product3DCard() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 300, damping: 30 })

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
    setGlarePos({ x: (nx + 0.5) * 100, y: (ny + 0.5) * 100 })
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setGlarePos({ x: 50, y: 50 })
  }, [x, y])

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-48 h-64 rounded-2xl cursor-pointer overflow-hidden"
        data-cursor="pointer"
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(160deg, #1a1a2e, #16213e, #0f3460)',
          }}
        />

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4" style={{ transform: 'translateZ(30px)' }}>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center" style={{ transform: 'translateZ(20px)' }}>
            <span className="text-white text-2xl font-bold">W</span>
          </div>
          <span className="text-white font-bold" style={{ transform: 'translateZ(15px)' }}>WebCraft Pro</span>
          <span className="text-white/40 text-xs" style={{ transform: 'translateZ(10px)' }}>Hover to explore</span>
        </div>

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4), 0 25px 50px rgba(0,0,0,0.5)',
          }}
        />
      </motion.div>
    </div>
  )
}
