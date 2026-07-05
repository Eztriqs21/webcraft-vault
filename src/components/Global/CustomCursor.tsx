import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const trail = useRef<Array<{ x: number; y: number; life: number }>>( [])
  const prefersReducedMotion = useReducedMotion()
  const accentColor = useRef('#6366f1')

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (trail.current.length > 20) trail.current.shift()
    }

    const handleMouseEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const handleAccentChange = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.accent) {
        accentColor.current = customEvent.detail.accent
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('section-accent-change', handleAccentChange)

    const canvas = trailRef.current
    const ctx = canvas?.getContext('2d')
    let raf: number

    const animate = () => {
      if (canvas && ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        trail.current = trail.current.filter((p) => {
          p.life -= 0.04
          if (p.life <= 0) return false
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${hexToRgb(accentColor.current)}, ${p.life * 0.3})`
          ctx.fill()
          return true
        })
      }

      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15)

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 30}px, ${ringPos.current.y - 30}px)`
        ringRef.current.style.boxShadow = `0 0 20px rgba(${hexToRgb(accentColor.current)},0.3), inset 0 0 20px rgba(${hexToRgb(accentColor.current)},0.1)`
        ringRef.current.style.borderColor = accentColor.current
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
        dotRef.current.style.backgroundColor = accentColor.current
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('section-accent-change', handleAccentChange)
      cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion, lerp])

  if (prefersReducedMotion) return null

  return (
    <>
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[60px] h-[60px] rounded-full pointer-events-none"
        style={{
          border: '1.5px solid #6366f1',
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 10000,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full pointer-events-none"
        style={{
          backgroundColor: '#6366f1',
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 10001,
        }}
      />
    </>
  )
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '99,102,241'
}
