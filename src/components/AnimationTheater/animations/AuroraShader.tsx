import { useRef, useEffect } from 'react'

export function AuroraShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 320
    const H = 280
    canvas.width = W
    canvas.height = H

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }

    canvas.addEventListener('mousemove', onMouseMove)

    let time = 0
    let lastFrame = 0

    const animate = (now: number) => {
      if (now - lastFrame < 33) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrame = now

      if (!ctx) return

      ctx.fillStyle = 'rgba(3, 3, 3, 0.15)'
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let band = 0; band < 5; band++) {
        const baseX = W * (0.15 + band * 0.175)
        const baseY = H * 0.3
        const waveX = Math.sin(time * 0.8 + band * 1.2) * 30 + (mx - 0.5) * 40
        const waveY = Math.cos(time * 0.6 + band * 0.9) * 20 + (my - 0.5) * 20

        const gradient = ctx.createLinearGradient(
          baseX + waveX, baseY - 60,
          baseX + waveX, baseY + 80
        )

        const hue = (180 + band * 25 + time * 10) % 360
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0)`)
        gradient.addColorStop(0.3, `hsla(${hue}, 80%, 60%, 0.06)`)
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.1)`)
        gradient.addColorStop(0.7, `hsla(${hue}, 80%, 60%, 0.06)`)
        gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`)

        ctx.save()
        ctx.translate(baseX + waveX, baseY + waveY)
        ctx.scale(1 + Math.sin(time + band) * 0.1, 1)
        ctx.fillStyle = gradient
        ctx.fillRect(-15, -60, 30, 120)
        ctx.restore()
      }

      const glow = ctx.createRadialGradient(
        W * mx, H * my, 0,
        W * mx, H * my, W * 0.4
      )
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.04)')
      glow.addColorStop(1, 'rgba(3, 3, 3, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      time += 0.02
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded-lg cursor-crosshair" />
    </div>
  )
}
