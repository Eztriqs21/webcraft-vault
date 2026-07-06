import { useRef, useEffect } from 'react'

export function WaveInterference() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const INTERNAL_W = 160
    const INTERNAL_H = 140
    canvas.width = INTERNAL_W
    canvas.height = INTERNAL_H
    canvas.style.width = '320px'
    canvas.style.height = '280px'
    canvas.style.imageRendering = 'pixelated'

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * INTERNAL_W
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * INTERNAL_H
    }

    canvas.addEventListener('mousemove', onMouseMove)

    let time = 0
    let lastFrame = 0

    const animate = (now: number) => {
      if (now - lastFrame < 50) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = now

      if (!ctx) return

      const imageData = ctx.createImageData(INTERNAL_W, INTERNAL_H)
      const data = imageData.data

      const mx = mouseRef.current.x || INTERNAL_W * 0.5
      const my = mouseRef.current.y || INTERNAL_H * 0.5

      for (let py = 0; py < INTERNAL_H; py++) {
        for (let px = 0; px < INTERNAL_W; px++) {
          let value = 0

          const d1 = Math.hypot(px - INTERNAL_W * 0.3, py - INTERNAL_H * 0.4)
          value += Math.sin(d1 * 0.08 - time * 2)

          const d2 = Math.hypot(px - INTERNAL_W * 0.7, py - INTERNAL_H * 0.6)
          value += Math.sin(d2 * 0.1 - time * 1.5)

          const d3 = Math.hypot(px - mx, py - my)
          value += Math.sin(d3 * 0.06 - time * 2.5)

          value = value / 3
          const normalized = (value + 1) / 2

          const idx = (py * INTERNAL_W + px) * 4
          data[idx] = normalized * 99
          data[idx + 1] = normalized * 102
          data[idx + 2] = normalized * 241
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)

      time += 0.04
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="cursor-crosshair" />
    </div>
  )
}
