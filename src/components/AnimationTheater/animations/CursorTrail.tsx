import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<{ x: number; y: number; age: number; dist: number }[]>([])
  const lastPosRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 320
    const H = 280
    canvas.width = W
    canvas.height = H

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * W
      const y = ((e.clientY - rect.top) / rect.height) * H

      const dx = x - lastPosRef.current.x
      const dy = y - lastPosRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 2) {
        const steps = Math.min(Math.ceil(dist / 3), 8)
        for (let s = 0; s < steps; s++) {
          const t = (s + 1) / steps
          trailRef.current.push({
            x: lastPosRef.current.x + dx * t,
            y: lastPosRef.current.y + dy * t,
            age: 0,
            dist: 0,
          })
        }
        if (trailRef.current.length > 80) trailRef.current.splice(0, trailRef.current.length - 80)
      }

      lastPosRef.current = { x, y }
    }

    canvas.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      if (!isVisible) return
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)

      const trail = trailRef.current

      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i]
        point.age++
        if (point.age > 50) {
          trail.splice(i, 1)
        }
      }

      if (trail.length > 3) {
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2
          const yc = (trail[i].y + trail[i + 1].y) / 2
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc)
        }
        const last = trail[trail.length - 1]
        ctx.lineTo(last.x, last.y)

        const gradient = ctx.createLinearGradient(
          trail[0].x, trail[0].y,
          last.x, last.y
        )
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0)')
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.7)')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      for (let i = 0; i < trail.length; i++) {
        const point = trail[i]
        const progress = point.age / 50
        const size = (1 - progress) * 5
        const alpha = (1 - progress * progress) * 0.9
        const hue = (230 + i * 3) % 360

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${alpha})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="cursor-crosshair rounded-lg" />
    </div>
  )
}
