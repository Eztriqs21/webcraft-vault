import { useRef, useEffect } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function LavaLamp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<Blob[]>([])
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)
  const imageDataRef = useRef<ImageData | null>(null)

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

    blobsRef.current = Array.from({ length: 6 }, () => ({
      x: INTERNAL * 0.2 + Math.random() * INTERNAL * 0.6,
      y: INTERNAL * 0.2 + Math.random() * INTERNAL * 0.6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: 5 + Math.random() * 4,
    }))

    imageDataRef.current = ctx.createImageData(INTERNAL, INTERNAL)

    let lastFrame = 0

    const animate = (now: number) => {
      if (!isVisible) return
      if (now - lastFrame < 33) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = now

      const blobs = blobsRef.current

      for (const blob of blobs) {
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < blob.r) { blob.x = blob.r; blob.vx *= -0.8 }
        if (blob.x > INTERNAL - blob.r) { blob.x = INTERNAL - blob.r; blob.vx *= -0.8 }
        if (blob.y < blob.r) { blob.y = blob.r; blob.vy *= -0.8 }
        if (blob.y > INTERNAL - blob.r) { blob.y = INTERNAL - blob.r; blob.vy *= -0.8 }

        for (const other of blobs) {
          if (blob === other) continue
          const dx = other.x - blob.x
          const dy = other.y - blob.y
          const dist = Math.hypot(dx, dy)
          const minDist = blob.r + other.r

          if (dist < minDist && dist > 0) {
            const force = (minDist - dist) / dist * 0.03
            blob.vx -= dx * force
            blob.vy -= dy * force
          } else if (dist > minDist && dist < minDist * 2.5) {
            blob.vx += dx * 0.005
            blob.vy += dy * 0.005
          }
        }

        blob.vx *= 0.99
        blob.vy *= 0.99
        blob.vy += 0.01
      }

      const imageData = imageDataRef.current
      if (!imageData) return
      const data = imageData.data

      for (let py = 0; py < INTERNAL; py++) {
        for (let px = 0; px < INTERNAL; px++) {
          let field = 0
          for (const blob of blobs) {
            const dx = px - blob.x
            const dy = py - blob.y
            const dist = dx * dx + dy * dy
            field += (blob.r * blob.r) / (dist + 1)
          }

          const idx = (py * INTERNAL + px) * 4
          if (field > 0.8) {
            const t = Math.min((field - 0.8) * 3, 1)
            data[idx] = 30 + t * 214
            data[idx + 1] = 10 + t * 53
            data[idx + 2] = 40 + t * 54
            data[idx + 3] = 255
          } else if (field > 0.4) {
            const t = (field - 0.4) * 2.5
            data[idx] = 10 + t * 20
            data[idx + 1] = 10 + t * 5
            data[idx + 2] = 30 + t * 10
            data[idx + 3] = 255
          } else {
            data[idx] = 3
            data[idx + 1] = 3
            data[idx + 2] = 3
            data[idx + 3] = 255
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animRef.current)
  }, [isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded-lg max-w-[280px] max-h-[280px]" />
    </div>
  )
}
