import { useRef, useLayoutEffect } from 'react'

interface SectionTransitionProps {
  accent?: string
  children: React.ReactNode
  sectionKey: string
}

export function SectionTransition({ accent = '#6366f1', children, sectionKey }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = () => {
      window.dispatchEvent(
        new CustomEvent('section-accent-change', { detail: { accent } })
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handler()
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [accent])

  return (
    <div ref={ref} data-section={sectionKey} className="relative">
      {children}

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
        }}
      />
    </div>
  )
}
