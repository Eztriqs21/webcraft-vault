import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

type Mode = 'drag' | 'bounce' | 'spring'

const MODES: { id: Mode; label: string }[] = [
  { id: 'drag', label: 'Drag' },
  { id: 'bounce', label: 'Bounce' },
  { id: 'spring', label: 'Spring' },
]

const MODE_CONFIG: Record<Mode, {
  dragElastic: number
  dragMomentum: boolean
  dragConstraints: { left: number; right: number; top: number; bottom: number }
  transition: { type: string; stiffness: number; damping: number }
}> = {
  drag: {
    dragElastic: 0,
    dragMomentum: false,
    dragConstraints: { left: -100, right: 100, top: -80, bottom: 80 },
    transition: { type: 'tween', stiffness: 0, damping: 0 },
  },
  bounce: {
    dragElastic: 0.8,
    dragMomentum: false,
    dragConstraints: { left: -100, right: 100, top: -80, bottom: 80 },
    transition: { type: 'spring', stiffness: 200, damping: 8 },
  },
  spring: {
    dragElastic: 0.4,
    dragMomentum: false,
    dragConstraints: { left: -60, right: 60, top: -40, bottom: 40 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

const MODE_COLORS: Record<Mode, string> = {
  drag: '#6366f1',
  bounce: '#f43f5e',
  spring: '#10b981',
}

export function SpringyCards() {
  const [mode, setMode] = useState<Mode>('drag')
  const config = MODE_CONFIG[mode]
  const color = MODE_COLORS[mode]
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <motion.div
        key={mode}
        drag
        dragElastic={config.dragElastic}
        dragMomentum={config.dragMomentum}
        dragConstraints={config.dragConstraints}
        whileDrag={prefersReducedMotion ? {} : { scale: 1.1, zIndex: 10 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={config.transition as never}
        className="w-32 h-40 md:w-36 md:h-44 rounded-2xl cursor-grab active:cursor-grabbing flex flex-col items-center justify-center gap-3 select-none"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          boxShadow: `0 8px 32px ${color}33`,
        }}
        data-cursor="grab"
      >
        <span className="text-white text-sm font-bold">Card</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
          <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      <div className="flex gap-3">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              mode === m.id
                ? 'text-white'
                : 'text-[#888] hover:text-[#999]'
            }`}
            style={{
              background: mode === m.id ? `${MODE_COLORS[m.id]}20` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${mode === m.id ? `${MODE_COLORS[m.id]}40` : 'rgba(255,255,255,0.06)'}`,
            }}
            data-cursor="pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {mode === m.id ? (
                <path d="M3 8L6.5 11.5L13 4.5" stroke={MODE_COLORS[m.id]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
