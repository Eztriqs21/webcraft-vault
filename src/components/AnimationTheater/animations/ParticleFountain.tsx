import { useRef, useEffect, useCallback } from 'react'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export function ParticleFountain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const animRef = useRef<number>(0)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  const spawn = useCallback((x: number, y: number) => {
    const count = 5
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 8 - 2,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        size: 2 + Math.random() * 3,
        hue: 180 + Math.random() * 60,
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    const onMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const animate = () => {
      if (!isVisible) return
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(3, 3, 3, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      spawn(canvas.width / 2, canvas.height * 0.85)

      if (mouseRef.current.active && Math.random() > 0.5) {
        spawn(mouseRef.current.x, mouseRef.current.y)
      }

      const gravity = 0.15
      const particles = particlesRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const alpha = 1 - progress

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2 * (1 - progress), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha * 0.2})`
        ctx.fill()

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
        }
      }

      if (particles.length > 500) {
        particles.splice(0, particles.length - 500)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animRef.current)
    }
  }, [spawn, isVisible])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-[320px] max-h-[280px] cursor-crosshair" />
    </div>
  )
}
