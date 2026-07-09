import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

export function SVGLineDraw() {
  const pathsRef = useRef<SVGPathElement[]>([])
  const animRef = useRef<number>(0)
  const timeoutRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    const paths = pathsRef.current
    if (!paths.length) return

    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
    })

    let startTime: number | null = null
    const duration = 2000

    const animate = (timestamp: number) => {
      if (!isVisible) return
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      paths.forEach((path, i) => {
        const length = path.getTotalLength()
        const delay = i * 0.2
        const pathProgress = Math.max(0, Math.min((eased - delay) / (1 - delay), 1))
        path.style.strokeDashoffset = `${length * (1 - pathProgress)}`
      })

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        timeoutRef.current = window.setTimeout(() => {
          startTime = null
          animRef.current = requestAnimationFrame(animate)
        }, 2000)
      }
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <path
          ref={(el) => { if (el) pathsRef.current[0] = el }}
          d="M30 100 Q 100 20 170 100"
          stroke="#6366f1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={(el) => { if (el) pathsRef.current[1] = el }}
          d="M30 100 Q 100 180 170 100"
          stroke="#f43f5e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={(el) => { if (el) pathsRef.current[2] = el }}
          d="M100 30 Q 180 100 100 170"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={(el) => { if (el) pathsRef.current[3] = el }}
          d="M100 30 Q 20 100 100 170"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="8" fill="#fbbf24" />
      </svg>
    </div>
  )
}
