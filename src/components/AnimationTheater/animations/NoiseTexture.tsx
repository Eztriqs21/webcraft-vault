import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

export function NoiseTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const INTERNAL = 80
    canvas.width = INTERNAL
    canvas.height = INTERNAL
    canvas.style.width = '280px'
    canvas.style.height = '280px'
    canvas.style.imageRendering = 'pixelated'

    let time = 0
    let lastFrame = 0

    const animate = (now: number) => {
      if (!isVisible) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      if (now - lastFrame < 50) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = now

      if (!ctx) return

      const imageData = ctx.createImageData(INTERNAL, INTERNAL)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % INTERNAL
        const y = Math.floor(i / 4 / INTERNAL)

        const n1 = Math.sin(x * 0.15 + time) * 0.5 + 0.5
        const n2 = Math.cos(y * 0.2 + time * 0.7) * 0.5 + 0.5
        const n3 = Math.sin((x + y) * 0.08 + time * 1.3) * 0.5 + 0.5
        const noise = (n1 + n2 + n3) / 3

        const v = noise * 200 + Math.random() * 55
        data[i] = v * 0.7
        data[i + 1] = v * 0.7
        data[i + 2] = v * 0.9
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
      time += 0.03
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded-lg" />
    </div>
  )
}
