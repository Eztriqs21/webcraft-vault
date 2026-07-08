import { useRef, useEffect } from 'react'

export function ScrollStagger() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const viewportHeight = window.innerHeight

      const progress = Math.max(0, Math.min(1,
        (viewportHeight - containerTop) / (containerHeight + viewportHeight)
      ))

      itemsRef.current.forEach((el, i) => {
        if (!el) return
        const itemThreshold = (i + 1) / itemsRef.current.length
        const itemProgress = Math.max(0, Math.min(1,
          (progress - itemThreshold + 0.3) / 0.3
        ))

        el.style.opacity = String(itemProgress)
        el.style.transform = `translateY(${(1 - itemProgress) * 20}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const items = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="grid grid-cols-4 gap-2">
        {items.map((i) => (
          <div
            key={i}
            ref={(el) => { itemsRef.current[i] = el }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg"
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
