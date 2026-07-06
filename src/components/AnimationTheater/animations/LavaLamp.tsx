import { useRef, useEffect } from 'react'

export function LavaLamp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([])
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

    const w = canvas.width
    const h = canvas.height

    for (let i = 0; i < 8; i++) {
      blobsRef.current.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 20 + Math.random() * 20,
      })
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(3, 3, 3, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const blobs = blobsRef.current

      for (const blob of blobs) {
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < blob.r || blob.x > canvas.width - blob.r) blob.vx *= -1
        if (blob.y < blob.r || blob.y > canvas.height - blob.r) blob.vy *= -1

        for (const other of blobs) {
          if (blob === other) continue
          const dist = Math.hypot(blob.x - other.x, blob.y - other.y)
          if (dist < blob.r + other.r) {
            const angle = Math.atan2(blob.y - other.y, blob.x - other.x)
            blob.vx += Math.cos(angle) * 0.1
            blob.vy += Math.sin(angle) * 0.1
          }
        }

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.6)')
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)')
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')

        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

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
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px]" />
    </div>
  )
}
