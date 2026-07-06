import { useRef, useEffect } from 'react'

export function RippleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }[]>([])
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

      if (Math.random() > 0.7) {
        ripplesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          maxRadius: 80 + Math.random() * 60,
          alpha: 0.6,
        })
      }
    }

    canvas.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height

      ctx.fillStyle = 'rgba(3, 3, 3, 0.1)'
      ctx.fillRect(0, 0, w, h)

      const gridSize = 30
      const cols = Math.ceil(w / gridSize)
      const rows = Math.ceil(h / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2

          let displacement = 0
          for (const ripple of ripplesRef.current) {
            const dist = Math.hypot(x - ripple.x, y - ripple.y)
            const ringDist = Math.abs(dist - ripple.radius)
            if (ringDist < 20) {
              displacement += ripple.alpha * (1 - ringDist / 20)
            }
          }

          const dotSize = 1.5 + displacement * 3
          const hue = (i * 5 + j * 5 + displacement * 100) % 360
          const alpha = 0.3 + displacement * 0.7

          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`
          ctx.fill()
        }
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i]
        r.radius += 2
        r.alpha *= 0.97
        if (r.alpha < 0.01 || r.radius > r.maxRadius) {
          ripplesRef.current.splice(i, 1)
        }
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
      <canvas ref={canvasRef} className="max-w-[320px] max-h-[280px] cursor-crosshair" />
    </div>
  )
}
