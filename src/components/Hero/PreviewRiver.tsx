import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const SHAPES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  name: [
    'Morphing Blob', 'Particle Fountain', 'Text Scramble', 'Springy Cards',
    'Ripple Grid', '3D Cube', 'Wave Interference', 'Magnetic Buttons',
    'SVG Line Draw', 'Parallax Layers', 'Glitch Text', 'Lava Lamp',
    'Text Reveal', 'Typewriter', 'Noise Texture', 'Drag Throw',
    'Scroll Stagger', 'Elastic Accordion', 'Aurora Shader', 'Flip Animation',
    'Bouncy Loader', 'Card Fan', 'Confetti Burst', 'Cursor Trail',
    'Tilt Card', 'Morphing Gradient', 'Snap Carousel', 'Staggered List',
    'WebGL Distortion', 'Scroll Skew', 'Page Transition', '3D Product Card',
  ][i],
  type: ['circle', 'blob', 'wave', 'diamond', 'ring', 'cross'][i % 6],
  color: ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#06b6d4', '#fbbf24'][i % 6],
  speed: 30 + Math.random() * 30,
  delay: -(i * 1.5),
}))

export function PreviewRiver() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full overflow-hidden py-8" ref={containerRef}>
      <div className="relative h-16">
        <motion.div
          className="flex items-center gap-6 absolute"
          animate={{
            x: hoveredId === null ? [0, -1600] : undefined,
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          style={{
            animationPlayState: hoveredId === null ? 'running' : 'paused',
          }}
        >
          {[...SHAPES, ...SHAPES].map((shape) => (
            <motion.div
              key={`${shape.id}-${Math.random()}`}
              className="flex-shrink-0 cursor-pointer"
              onMouseEnter={() => setHoveredId(shape.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                scale: hoveredId === shape.id ? 2.5 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              data-cursor="pointer"
            >
              <ShapePreview shape={shape} isHovered={hoveredId === shape.id} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {hoveredId !== null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-sm text-[#999] font-mono"
        >
          {SHAPES[hoveredId]?.name}
        </motion.div>
      )}
    </div>
  )
}

function ShapePreview({
  shape,
  isHovered,
}: {
  shape: (typeof SHAPES)[0]
  isHovered: boolean
}) {
  const size = isHovered ? 64 : 32

  if (shape.type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill={shape.color} opacity={0.6}>
          <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    )
  }

  if (shape.type === 'blob') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path
          d="M16 4C20 4 28 8 28 16C28 24 20 28 16 28C12 28 4 24 4 16C4 8 12 4 16 4Z"
          fill={shape.color}
          opacity={0.6}
        >
          <animate
            attributeName="d"
            values="M16 4C20 4 28 8 28 16C28 24 20 28 16 28C12 28 4 24 4 16C4 8 12 4 16 4Z;M16 6C22 6 26 10 26 16C26 22 22 26 16 26C10 26 6 22 6 16C6 10 10 6 16 6Z;M16 4C20 4 28 8 28 16C28 24 20 28 16 28C12 28 4 24 4 16C4 8 12 4 16 4Z"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    )
  }

  if (shape.type === 'wave') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path
          d="M2 16C6 12 10 20 14 16C18 12 22 20 26 16C30 12 32 16 32 16"
          stroke={shape.color}
          strokeWidth="2"
          fill="none"
          opacity={0.6}
        >
          <animate
            attributeName="d"
            values="M2 16C6 12 10 20 14 16C18 12 22 20 26 16C30 12 32 16 32 16;M2 16C6 20 10 12 14 16C18 20 22 12 26 16C30 20 32 16 32 16;M2 16C6 12 10 20 14 16C18 12 22 20 26 16C30 12 32 16 32 16"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    )
  }

  if (shape.type === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect
          x="8"
          y="8"
          width="16"
          height="16"
          fill={shape.color}
          opacity={0.6}
          transform="rotate(45 16 16)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="45 16 16;225 16 16;45 16 16"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    )
  }

  if (shape.type === 'ring') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke={shape.color}
          strokeWidth="2"
          fill="none"
          opacity={0.6}
        >
          <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <line x1="8" y1="8" x2="24" y2="24" stroke={shape.color} strokeWidth="2" opacity={0.6} />
      <line x1="24" y1="8" x2="8" y2="24" stroke={shape.color} strokeWidth="2" opacity={0.6} />
    </svg>
  )
}
