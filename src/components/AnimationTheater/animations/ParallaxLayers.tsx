import { useRef, useEffect, useState } from 'react'

export function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouse.current.x = (e.clientX - cx) / (rect.width / 2)
      mouse.current.y = (e.clientY - cy) / (rect.height / 2)
      setOffset({ x: mouse.current.x, y: mouse.current.y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const layers = [
    { depth: 0.1, color: 'rgba(99,102,241,0.4)', size: 180 },
    { depth: 0.25, color: 'rgba(244,63,94,0.35)', size: 140 },
    { depth: 0.45, color: 'rgba(16,185,129,0.3)', size: 100 },
    { depth: 0.7, color: 'rgba(168,85,247,0.25)', size: 60 },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: 500 }}>
      <div ref={containerRef} className="relative w-56 h-56" style={{ transformStyle: 'preserve-3d' }}>
        {layers.map((layer, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: layer.size,
              height: layer.size,
              left: `calc(50% - ${layer.size / 2}px)`,
              top: `calc(50% - ${layer.size / 2}px)`,
              background: layer.color,
              transform: `translate3d(${offset.x * layer.depth * 40}px, ${offset.y * layer.depth * 40}px, ${layer.depth * 60}px)`,
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm" style={{ transform: 'translateZ(40px)' }}>
          Move Mouse
        </div>
      </div>
    </div>
  )
}
