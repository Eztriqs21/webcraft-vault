import { useRef, useEffect, useState } from 'react'

export function Cube3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: -25, y: 25 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animId: number
    let angle = 0

    const animate = () => {
      angle += 0.5
      setRotate({
        x: -25 + Math.sin(angle * 0.01) * 15,
        y: 25 + angle % 360,
      })
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animId)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top) / rect.height - 0.5
    const y = (e.clientX - rect.left) / rect.width - 0.5
    setRotate({ x: -x * 60, y: y * 60 })
  }

  const handleMouseLeave = () => {}

  const size = 80

  const faces = [
    { transform: `rotateY(0deg) translateZ(${size / 2}px)`, bg: 'rgba(99,102,241,0.7)' },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: 'rgba(244,63,94,0.7)' },
    { transform: `rotateY(180deg) translateZ(${size / 2}px)`, bg: 'rgba(16,185,129,0.7)' },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: 'rgba(168,85,247,0.7)' },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: 'rgba(6,182,212,0.7)' },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: 'rgba(251,191,36,0.7)' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="cursor-pointer"
        style={{ perspective: 400 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="pointer"
      >
        <div
          style={{
            width: size,
            height: size,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                background: face.bg,
                border: '1px solid rgba(255,255,255,0.1)',
                transform: face.transform,
                backfaceVisibility: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {['FRONT', 'RIGHT', 'BACK', 'LEFT', 'TOP', 'BOTTOM'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
