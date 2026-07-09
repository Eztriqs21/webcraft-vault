import { useState, useRef } from 'react'

export function FullBleedVideoHeroDemo({ isExpanded }: { isExpanded: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      onMouseMove={handleMouseMove}
      role="group"
      aria-label="Full-bleed hero with mouse-following gradient"
    >
      <div
        className="absolute inset-0 transition-all duration-100"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.2), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), transparent)' }} />
      <div className={`absolute ${isExpanded ? 'bottom-8 left-8' : 'bottom-2 left-3'}`}>
        <div className={`rounded ${isExpanded ? 'h-6 w-48' : 'h-2 w-16'}`} style={{ background: 'rgba(6,182,212,0.25)' }} />
        <div className={`rounded mt-1 ${isExpanded ? 'h-4 w-32' : 'h-1.5 w-12'}`} style={{ background: 'rgba(6,182,212,0.1)' }} />
      </div>
    </div>
  )
}
