import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const magneticTarget = useRef<{ x: number; y: number } | null>(null)
  const trail = useRef<Array<{ x: number; y: number; life: number }>>([])
  const prefersReducedMotion = useReducedMotion()
  const accentColor = useRef('#6366f1')
  const cachedBoxShadow = useRef('')

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
        cachedBoxShadow.current = `0 0 20px rgba(${hexToRgb(customEvent.detail.accent)},0.3), inset 0 0 20px rgba(${hexToRgb(customEvent.detail.accent)},0.1)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorEl = target.closest('[data-cursor]')
      if (cursorEl) {
        const rect = cursorEl.getBoundingClientRect()
        magneticTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor]')) {
        magneticTarget.current = null
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('section-accent-change', handleAccentChange)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    const canvas = trailRef.current
    const ctx = canvas?.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    let raf: number

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      if (ctx) ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    cachedBoxShadow.current = `0 0 20px rgba(${hexToRgb(accentColor.current)},0.3), inset 0 0 20px rgba(${hexToRgb(accentColor.current)},0.1)`

    const animate = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

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

      const lerpFactor = magneticTarget.current ? 0.3 : 0.15
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, lerpFactor)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, lerpFactor)

      if (ringRef.current) {
        const scale = magneticTarget.current ? 1.5 : 1
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 30}px, ${ringPos.current.y - 30}px, 0) scale(${scale})`
        ringRef.current.style.boxShadow = cachedBoxShadow.current
        ringRef.current.style.borderColor = accentColor.current
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`
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
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('resize', resize)
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
          zIndex: 10000,
          willChange: 'transform',
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
          willChange: 'transform',
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
