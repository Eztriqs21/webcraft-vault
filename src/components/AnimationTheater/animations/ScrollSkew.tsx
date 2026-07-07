import { useRef, useEffect } from 'react'

export function ScrollSkew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const lastScrollRef = useRef(0)
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScrollRef.current
      lastScrollRef.current = currentScroll
      const skew = Math.max(-10, Math.min(10, delta * 0.5))
      if (containerRef.current) {
        containerRef.current.style.transform = `skewY(${skew}deg)`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `skewY(${-skew}deg)`
      }
      if (tRef.current) clearTimeout(tRef.current)
      tRef.current = setTimeout(() => {
        if (containerRef.current) containerRef.current.style.transform = 'skewY(0deg)'
        if (innerRef.current) innerRef.current.style.transform = 'skewY(0deg)'
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (tRef.current) clearTimeout(tRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
          transform: 'skewY(0deg)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div ref={innerRef} style={{ transform: 'skewY(0deg)' }}>Scroll Skew</div>
      </div>
    </div>
  )
}
