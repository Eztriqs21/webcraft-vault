import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

export function Cube3D() {
  const cubeRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    let angle = 0

    const animate = () => {
      if (!isVisible) return
      angle += 0.5
      if (cubeRef.current) {
        const rx = -25 + Math.sin(angle * 0.01) * 15
        const ry = 25 + (angle % 360)
        cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible])

  const size = 80

  const faces = [
    { transform: `rotateY(0deg) translateZ(${size / 2}px)`, bg: 'rgba(99,102,241,0.7)' },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: 'rgba(244,63,94,0.7)' },
    { transform: `rotateY(180deg) translateZ(${size / 2}px)`, bg: 'rgba(16,185,129,0.7)' },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: 'rgba(168,85,247,0.7)' },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: 'rgba(6,182,212,0.7)' },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: 'rgba(251,191,36,0.7)' },
  ]

  const labels = ['FRONT', 'RIGHT', 'BACK', 'LEFT', 'TOP', 'BOTTOM']

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <div style={{ perspective: 400 }}>
        <div
          ref={cubeRef}
          style={{
            width: size,
            height: size,
            position: 'relative',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
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
              {labels[i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
