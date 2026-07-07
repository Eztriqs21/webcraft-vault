import { useRef, useEffect, useCallback } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

interface ConfettiPiece {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotSpeed: number
  w: number
  h: number
  color: string
  shape: 'rect' | 'circle' | 'triangle'
  z: number
  vz: number
}

export function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<ConfettiPiece[]>([])
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  const spawn = useCallback((cx: number, cy: number) => {
    const colors = ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#fbbf24', '#06b6d4']
    const shapes: ConfettiPiece['shape'][] = ['rect', 'circle', 'triangle']
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 3 + Math.random() * 8
      confettiRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 20,
        w: 4 + Math.random() * 6,
        h: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        z: Math.random() * 100,
        vz: (Math.random() - 0.5) * 2,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 320
    const H = 280
    canvas.width = W
    canvas.height = H

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      spawn(e.clientX - rect.left, e.clientY - rect.top)
    }

    canvas.addEventListener('click', onClick)

    const animate = () => {
      if (!isVisible) return
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)

      const gravity = 0.18
      const pieces = confettiRef.current

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i]
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99
        p.rotation += p.rotSpeed
        p.z += p.vz

        const perspective = 1 + p.z * 0.005
        const scaleX = Math.cos((p.rotation * Math.PI) / 180) * perspective

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.scale(scaleX, 1)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, 1 - p.y / H)

        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        } else if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.moveTo(0, -p.h / 2)
          ctx.lineTo(p.w / 2, p.h / 2)
          ctx.lineTo(-p.w / 2, p.h / 2)
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()

        if (p.y > H + 30) {
          pieces.splice(i, 1)
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      canvas.removeEventListener('click', onClick)
      cancelAnimationFrame(animRef.current)
    }
  }, [spawn, isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="cursor-pointer rounded-lg" />
    </div>
  )
}
