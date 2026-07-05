import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let time = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth
      mouse.current.y = e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradients = [
        {
          x: canvas.width * (0.3 + Math.sin(time * 0.7) * 0.15 + (mouse.current.x - 0.5) * 0.1),
          y: canvas.height * (0.3 + Math.cos(time * 0.5) * 0.15 + (mouse.current.y - 0.5) * 0.1),
          r: canvas.width * 0.4,
          color: [99, 102, 241],
        },
        {
          x: canvas.width * (0.7 + Math.cos(time * 0.6) * 0.15 + (mouse.current.x - 0.5) * 0.08),
          y: canvas.height * (0.7 + Math.sin(time * 0.8) * 0.15 + (mouse.current.y - 0.5) * 0.08),
          r: canvas.width * 0.35,
          color: [168, 85, 247],
        },
        {
          x: canvas.width * (0.5 + Math.sin(time * 0.4) * 0.1 + (mouse.current.x - 0.5) * 0.05),
          y: canvas.height * (0.5 + Math.cos(time * 0.9) * 0.1 + (mouse.current.y - 0.5) * 0.05),
          r: canvas.width * 0.3,
          color: [16, 185, 129],
        },
      ]

      gradients.forEach((g) => {
        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r)
        gradient.addColorStop(0, `rgba(${g.color.join(',')}, 0.08)`)
        gradient.addColorStop(0.5, `rgba(${g.color.join(',')}, 0.03)`)
        gradient.addColorStop(1, 'rgba(3,3,3,0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      raf = requestAnimationFrame(draw)
    }

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(draw)
    } else {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.4
      )
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.06)')
      gradient.addColorStop(1, 'rgba(3,3,3,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
