import { useRef, useEffect } from 'react'

export function ScrollSkew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const currentSkew = useRef(0)
  const rafRef = useRef<number>(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    let lastScroll = window.scrollY
    let lastTime = performance.now()

    const handleScroll = () => {
      if (!isVisibleRef.current) return
      const now = performance.now()
      const dt = Math.max(now - lastTime, 1)
      lastTime = now

      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      lastScroll = currentScroll

      const velocity = delta / dt * 16
      currentSkew.current = Math.max(-15, Math.min(15, velocity * 0.8))
    }

    const decay = () => {
      if (!isVisibleRef.current) return
      currentSkew.current *= 0.92
      if (Math.abs(currentSkew.current) < 0.1) currentSkew.current = 0

      if (containerRef.current) {
        containerRef.current.style.transform = `skewY(${currentSkew.current}deg)`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `skewY(${-currentSkew.current}deg)`
      }

      rafRef.current = requestAnimationFrame(decay)
    }

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(decay)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
          willChange: 'transform',
        }}
      >
        <div ref={innerRef} style={{ willChange: 'transform' }}>Scroll Skew</div>
      </div>
    </div>
  )
}
