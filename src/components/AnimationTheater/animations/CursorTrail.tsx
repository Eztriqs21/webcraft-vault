import { useRef, useEffect } from 'react'

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * 0.8
        canvas.height = rect.height * 0.8
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y, age: 0 })
      if (trailRef.current.length > 50) trailRef.current.shift()
    }

    canvas.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const trail = trailRef.current
      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i]
        point.age++
        if (point.age > 50) {
          trail.splice(i, 1)
          continue
        }

        const progress = point.age / 50
        const size = (1 - progress) * 12
        const alpha = 1 - progress
        const hue = (i * 8) % 360

        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px] cursor-crosshair" />
    </div>
  )
}
