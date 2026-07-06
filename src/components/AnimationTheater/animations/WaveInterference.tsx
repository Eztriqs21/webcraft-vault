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
    }

    canvas.addEventListener('mousemove', onMouseMove)

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height

      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      const sources = [
        { x: w * 0.3, y: h * 0.4, freq: 0.05 },
        { x: w * 0.7, y: h * 0.6, freq: 0.07 },
        { x: mouseRef.current.x || w * 0.5, y: mouseRef.current.y || h * 0.5, freq: 0.04 },
      ]

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          let value = 0

          for (const source of sources) {
            const dist = Math.hypot(px - source.x, py - source.y)
            value += Math.sin(dist * source.freq - time * 2)
          }

          value = value / sources.length
          const normalized = (value + 1) / 2

          const idx = (py * w + px) * 4
          data[idx] = normalized * 99
          data[idx + 1] = normalized * 102
          data[idx + 2] = normalized * 241
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)

      time += 0.03
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
