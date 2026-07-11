import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ANIMATIONS } from '../../data/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const LAZY_RANGE = 2

export function TheaterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        x: () => -(inner.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: container,
          scrub: 0.5,
          anticipatePin: 1,
          end: () => `+=${inner.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            const index = Math.round(progress * (ANIMATIONS.length - 1))
            setActiveIndex(Math.min(index, ANIMATIONS.length - 1))
          },
        },
      })
    }, container)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(prev + 1, ANIMATIONS.length - 1))
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (prefersReducedMotion) {
    return (
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Animation Theater
          </h2>
          <p className="text-vault-text text-lg max-w-xl mb-2">
            32 living, breathing animations. Each one real, interactive, and ready to ship.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {ANIMATIONS.map((anim) => (
            <TheaterFrame key={anim.id} animation={anim} isActive={false} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
          Animation Theater
        </h2>
        <p className="text-vault-text text-lg max-w-xl mb-2">
          32 living, breathing animations. Each one real, interactive, and ready to ship.
        </p>
        <p className="text-vault-text text-sm font-mono">
          Frame {activeIndex + 1} / {ANIMATIONS.length}
        </p>
      </div>

      <div ref={containerRef} className="relative overflow-hidden" style={{ height: '100vh' }}>
        <div
          ref={innerRef}
          className="flex items-center h-screen gap-6 px-4 md:px-8"
          style={{ width: 'fit-content' }}
        >
          {ANIMATIONS.map((anim, index) => (
            <TheaterFrame
              key={anim.id}
              animation={anim}
              isActive={index === activeIndex}
              shouldRender={Math.abs(index - activeIndex) <= LAZY_RANGE}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const TheaterFrame = React.memo(function TheaterFrame({
  animation,
  isActive,
  shouldRender = true,
}: {
  animation: (typeof ANIMATIONS)[0]
  isActive: boolean
  shouldRender?: boolean
}) {
  const [copyLabel, setCopyLabel] = useState<'code' | 'prompt' | null>(null)

  const handleCopy = async (type: 'code' | 'prompt') => {
    const text = type === 'code' ? animation.code : animation.prompt
    try {
      await navigator.clipboard.writeText(text)
      setCopyLabel(type)
      setTimeout(() => setCopyLabel(null), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden border border-vault-border bg-vault-bg flex flex-col md:flex-row snap-center"
      style={{
        boxShadow: isActive
          ? '0 0 40px rgba(244,63,94,0.1), 0 20px 60px rgba(0,0,0,0.5)'
          : '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-vault-surface/60 min-h-[200px]">
        {shouldRender ? (
          <animation.component />
        ) : (
          <div className="text-vault-text text-sm font-mono opacity-40">{animation.name}</div>
        )}
      </div>

      <div className="w-full md:w-[35%] p-4 md:p-6 border-t md:border-t-0 md:border-l border-vault-border flex flex-col">
        <h3 className="font-display text-lg md:text-2xl font-bold text-vault-text-bright mb-1 md:mb-2">
          {animation.name}
        </h3>
        <p className="text-vault-text text-xs md:text-sm mb-2 md:mb-3">{animation.mood}</p>
        <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
          {animation.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-accent-theater/10 text-accent-theater border border-accent-theater/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => handleCopy('code')}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-vault-surface text-vault-text hover:bg-vault-border hover:text-vault-text-bright transition-all"
            data-cursor="pointer"
          >
            {copyLabel === 'code' ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={() => handleCopy('prompt')}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-accent-hero/10 text-accent-hero hover:bg-accent-hero/20 hover:text-vault-text-bright transition-all"
            data-cursor="pointer"
          >
            {copyLabel === 'prompt' ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  )
})
