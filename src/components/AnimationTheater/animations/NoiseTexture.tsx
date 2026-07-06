import { useRef, useEffect } from 'react'

export function NoiseTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = Math.min(rect.width * 0.8, 280)
        canvas.height = Math.min(rect.height * 0.8, 280)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w
        const y = Math.floor(i / 4 / w)

        const n1 = Math.sin(x * 0.02 + time) * 0.5 + 0.5
        const n2 = Math.cos(y * 0.03 + time * 0.7) * 0.5 + 0.5
        const n3 = Math.sin((x + y) * 0.01 + time * 1.3) * 0.5 + 0.5
        const noise = (n1 + n2 + n3) / 3

        const v = noise * 60 + Math.random() * 30
        data[i] = v * 0.6
        data[i + 1] = v * 0.6
        data[i + 2] = v * 0.8
        data[i + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
      time += 0.02
      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px] rounded-lg" />
    </div>
  )
}
