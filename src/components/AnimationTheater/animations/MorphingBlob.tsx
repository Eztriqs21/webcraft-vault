import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'
import { useDebouncedCallback } from '../../../utils/useDebouncedCallback'

export function MorphingBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef(0)
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = useDebouncedCallback(() => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * 0.8
        canvas.height = rect.height * 0.8
      }
    }, 100)
    resize()
    window.addEventListener('resize', resize)

    let lastFrame = 0
    const draw = (now: number) => {
      if (!isVisible) return
      if (now - lastFrame < 33) { animRef.current = requestAnimationFrame(draw); return }
      lastFrame = now

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const baseR = Math.min(w, h) * 0.3

      ctx.clearRect(0, 0, w, h)

      for (let layer = 3; layer >= 0; layer--) {
        const offset = layer * 0.3
        const alpha = 0.15 - layer * 0.03
        const hue = (timeRef.current * 20 + layer * 40) % 360

        ctx.beginPath()
        for (let i = 0; i <= 360; i++) {
          const angle = (i * Math.PI) / 180
          const noise1 = Math.sin(angle * 3 + timeRef.current + offset) * 20
          const noise2 = Math.cos(angle * 5 + timeRef.current * 1.3 + offset) * 15
          const noise3 = Math.sin(angle * 7 + timeRef.current * 0.7 + offset) * 10
          const r = baseR + noise1 + noise2 + noise3

          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`
        ctx.fill()
      }

      timeRef.current += 0.02
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px]" />
    </div>
  )
}
