import { useRef, useEffect, useState } from 'react'

export function ScrollSkew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [skew, setSkew] = useState(0)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScrollRef.current
      lastScrollRef.current = currentScroll
      setSkew(Math.max(-10, Math.min(10, delta * 0.5)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setSkew(0), 100)
    return () => clearTimeout(timer)
  }, [skew])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
          transform: `skewY(${skew}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div style={{ transform: `skewY(${-skew}deg)` }}>Scroll Skew</div>
      </div>
    </div>
  )
}
