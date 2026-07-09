import { useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

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
}))

const riverStyleId = 'preview-river-shared-style'

function ensureRiverStyle() {
  if (document.getElementById(riverStyleId)) return
  const style = document.createElement('style')
  style.id = riverStyleId
  style.textContent = `
    @keyframes river-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `
  document.head.appendChild(style)
}

export function PreviewRiver() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => { ensureRiverStyle() }, [])

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        className="relative h-16"
        onMouseLeave={() => setHoveredId(null)}
      >
        <div
          className="flex items-center gap-6"
          style={{
            width: 'fit-content',
            animation: prefersReducedMotion ? 'none' : 'river-scroll 60s linear infinite',
          }}
        >
          {[...SHAPES, ...SHAPES].map((shape, i) => (
            <div
              key={`${shape.id}-${i}`}
              className="flex-shrink-0 cursor-pointer transition-all duration-300 ease-out"
              style={{
                transform: hoveredId === shape.id ? 'scale(2.5)' : 'scale(1)',
                filter: hoveredId === shape.id ? 'drop-shadow(0 0 12px rgba(99,102,241,0.4))' : 'none',
              }}
              onMouseEnter={() => setHoveredId(shape.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="pointer"
            >
              <ShapePreview shape={shape} isHovered={hoveredId === shape.id} animated={!prefersReducedMotion} />
            </div>
          ))}
        </div>
      </div>

      {hoveredId !== null && (
        <div className="text-center mt-4 text-sm text-[#999] font-mono animate-fade-in">
          {SHAPES[hoveredId]?.name}
        </div>
      )}
    </div>
  )
}

function ShapePreview({
  shape,
  isHovered,
  animated,
}: {
  shape: (typeof SHAPES)[0]
  isHovered: boolean
  animated: boolean
}) {
  const size = isHovered ? 64 : 32

  if (shape.type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill={shape.color} opacity={0.6}>
          {animated && <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />}
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
          {animated && (
            <animate
              attributeName="d"
              values="M16 4C20 4 28 8 28 16C28 24 20 28 16 28C12 28 4 24 4 16C4 8 12 4 16 4Z;M16 6C22 6 26 10 26 16C26 22 22 26 16 26C10 26 6 22 6 16C6 10 10 6 16 6Z;M16 4C20 4 28 8 28 16C28 24 20 28 16 28C12 28 4 24 4 16C4 8 12 4 16 4Z"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
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
          {animated && (
            <animate
              attributeName="d"
              values="M2 16C6 12 10 20 14 16C18 12 22 20 26 16C30 12 32 16 32 16;M2 16C6 20 10 12 14 16C18 20 22 12 26 16C30 20 32 16 32 16;M2 16C6 12 10 20 14 16C18 12 22 20 26 16C30 12 32 16 32 16"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
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
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="45 16 16;225 16 16;45 16 16"
              dur="4s"
              repeatCount="indefinite"
            />
          )}
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
          {animated && <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" />}
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
