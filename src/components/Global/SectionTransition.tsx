import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  accent?: string
  children: React.ReactNode
  sectionKey: string
}

export function SectionTransition({ accent = '#6366f1', children, sectionKey }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const prefersReducedMotionRef = useRef(prefersReducedMotion)
  prefersReducedMotionRef.current = prefersReducedMotion

  useLayoutEffect(() => {
    const el = ref.current
    const overlay = overlayRef.current
    if (!el || !overlay) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotionRef.current) return

      gsap.set(overlay, {
        clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
        opacity: 1,
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress <= 0.5) {
            const p = progress * 2
            const x = 50 - p * 50
            gsap.set(overlay, {
              clipPath: `polygon(${x}% 0%, 50% 0%, 50% 100%, ${x}% 100%)`,
            })
          } else {
            const p = (progress - 0.5) * 2
            const x = p * 50
            gsap.set(overlay, {
              clipPath: `polygon(0% 0%, ${x}% 0%, ${x}% 100%, 0% 100%)`,
            })
          }
        },
      })
    }, el)

    return () => ctx.revert()
  }, [accent])

  useLayoutEffect(() => {
    if (!prefersReducedMotion) return

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

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [accent, prefersReducedMotion])

  useLayoutEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(
            new CustomEvent('section-accent-change', { detail: { accent } })
          )
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [accent, prefersReducedMotion])

  return (
    <div ref={ref} data-section={sectionKey} className="relative">
      {children}

      {prefersReducedMotion ? (
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
          }}
        />
      ) : (
        <div
          ref={overlayRef}
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 20,
            background: accent,
          }}
        />
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
        }}
      />
    </div>
  )
}
