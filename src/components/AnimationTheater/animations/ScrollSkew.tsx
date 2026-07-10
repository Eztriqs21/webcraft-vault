import { useRef, useEffect } from 'react'

export function ScrollSkew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const targetSkew = useRef(0)
  const currentSkew = useRef(0)
  const rafRef = useRef<number>(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      targetSkew.current = x * 12
    }

    const decay = () => {
      if (isVisibleRef.current) {
        currentSkew.current += (targetSkew.current - currentSkew.current) * 0.08

        if (containerRef.current) {
          containerRef.current.style.transform = `skewY(${currentSkew.current}deg)`
        }
        if (innerRef.current) {
          innerRef.current.style.transform = `skewY(${-currentSkew.current}deg)`
        }
      }

      rafRef.current = requestAnimationFrame(decay)
    }

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(decay)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-48 h-48 md:w-56 md:h-56 rounded-2xl flex items-center justify-center text-white font-bold text-lg cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
          willChange: 'transform',
        }}
      >
        <div ref={innerRef} style={{ willChange: 'transform' }}>Move Mouse</div>
      </div>
    </div>
  )
}
