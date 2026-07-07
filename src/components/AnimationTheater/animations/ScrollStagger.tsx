import { useRef, useEffect } from 'react'

export function ScrollStagger() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.delay || '0')
            const t = setTimeout(() => {
              el.classList.add('stagger-visible')
            }, delay)
            timeoutsRef.current.push(t)
          }
        })
      },
      { threshold: 0.2 }
    )

    container.querySelectorAll('.stagger-item').forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="grid grid-cols-4 gap-2">
        {items.map((i) => (
          <div
            key={i}
            className="stagger-item w-14 h-14 md:w-16 md:h-16 rounded-lg opacity-0 translate-y-4"
            data-delay={i * 80}
            style={{
              background: `hsl(${i * 45}, 70%, 50%)`,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
        <style>{`
          .stagger-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}</style>
      </div>
    </div>
  )
}
