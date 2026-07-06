import { useRef, useEffect, useCallback } from 'react'

export function AuroraShader() {
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
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }

    canvas.addEventListener('mousemove', onMouseMove)

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height

      const gradient = ctx.createRadialGradient(
        w * mouseRef.current.x,
        h * mouseRef.current.y,
        0,
        w * mouseRef.current.x,
        h * mouseRef.current.y,
        w * 0.6
      )

      gradient.addColorStop(0, `hsla(${200 + time * 10}, 80%, 60%, 0.8)`)
      gradient.addColorStop(0.3, `hsla(${280 + time * 10}, 70%, 50%, 0.5)`)
      gradient.addColorStop(0.6, `hsla(${160 + time * 10}, 60%, 40%, 0.3)`)
      gradient.addColorStop(1, 'rgba(3, 3, 3, 1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      time += 0.01
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
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px] rounded-lg cursor-crosshair" />
    </div>
  )
}
