import { useRef, useEffect, useState } from 'react'

export function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = -rect.top / (rect.height - window.innerHeight)
      setScrollY(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const layers = [
    { speed: 0.2, color: 'rgba(99,102,241,0.3)', size: 200, y: 30 },
    { speed: 0.4, color: 'rgba(244,63,94,0.3)', size: 160, y: 50 },
    { speed: 0.6, color: 'rgba(16,185,129,0.3)', size: 120, y: 70 },
    { speed: 0.8, color: 'rgba(168,85,247,0.3)', size: 80, y: 90 },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="relative w-48 h-48">
        {layers.map((layer, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: layer.size,
              height: layer.size,
              left: `calc(50% - ${layer.size / 2}px)`,
              top: `${layer.y}%`,
              background: layer.color,
              transform: `translateY(${scrollY * layer.speed * -100}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm z-10">
          Scroll Speed
        </div>
      </div>
    </div>
  )
}
