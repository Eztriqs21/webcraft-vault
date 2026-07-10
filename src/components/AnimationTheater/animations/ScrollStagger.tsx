import { useRef, useEffect } from 'react'

export function ScrollStagger() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.index || '0')
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, index * 80)
          }
        })
      },
      { threshold: 0.3 }
    )

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="grid grid-cols-4 gap-2">
        {items.map((i) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el }}
            data-index={i}
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg transition-all duration-500 ease-out"
            style={{
              background: `hsl(${i * 45}, 70%, 50%)`,
              opacity: 0,
              transform: 'translateY(20px)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </div>
  )
}
