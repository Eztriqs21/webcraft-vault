import { useRef, useEffect, useCallback } from 'react'

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
}

export function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<ConfettiPiece[]>([])
  const animRef = useRef<number>(0)

  const spawn = useCallback((cx: number, cy: number) => {
    const colors = ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#fbbf24', '#06b6d4']
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 6
      confettiRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        w: 4 + Math.random() * 4,
        h: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
  }, [])

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

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      spawn(e.clientX - rect.left, e.clientY - rect.top)
    }

    canvas.addEventListener('click', onClick)

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gravity = 0.15
      const pieces = confettiRef.current

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i]
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.rotation += p.rotSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()

        if (p.y > canvas.height + 20) {
          pieces.splice(i, 1)
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', onClick)
      cancelAnimationFrame(animRef.current)
    }
  }, [spawn])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-[280px] max-h-[280px] cursor-pointer" />
    </div>
  )
}
