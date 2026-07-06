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
        clipPath: 'inset(100% 0 0 0)',
        opacity: 1,
      })

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top center',
        onEnter: () => {
          gsap.to(overlay, {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.to(overlay, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 0.6,
                ease: 'power3.inOut',
                delay: 0.1,
              })
            },
          })
        },
        once: true,
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
