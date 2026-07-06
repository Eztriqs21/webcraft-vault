import { useRef, useEffect } from 'react'

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 280
    const H = 280
    canvas.width = W
    canvas.height = H

    blobsRef.current = Array.from({ length: 6 }, () => ({
      x: W * 0.2 + Math.random() * W * 0.6,
      y: H * 0.2 + Math.random() * H * 0.6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: 25 + Math.random() * 15,
    }))

    const animate = () => {
      if (!ctx) return

      const blobs = blobsRef.current

      for (const blob of blobs) {
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < blob.r) { blob.x = blob.r; blob.vx *= -0.8 }
        if (blob.x > W - blob.r) { blob.x = W - blob.r; blob.vx *= -0.8 }
        if (blob.y < blob.r) { blob.y = blob.r; blob.vy *= -0.8 }
        if (blob.y > H - blob.r) { blob.y = H - blob.r; blob.vy *= -0.8 }

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
            const force = 0.005
            blob.vx += dx * force
            blob.vy += dy * force
          }
        }

        blob.vx *= 0.99
        blob.vy *= 0.99
        blob.vy += 0.01
      }

      const imageData = ctx.createImageData(W, H)
      const data = imageData.data

      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          let field = 0
          for (const blob of blobs) {
            const dx = px - blob.x
            const dy = py - blob.y
            const dist = Math.hypot(dx, dy)
            field += (blob.r * blob.r) / (dist * dist + 1)
          }

          const idx = (py * W + px) * 4
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
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded-lg max-w-[280px] max-h-[280px]" />
    </div>
  )
}
