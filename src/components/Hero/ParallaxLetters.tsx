import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const HEADLINE = 'The Anatomy of Iconic Websites'

const DEPTHS = HEADLINE.split('').map(() => (Math.random() - 0.5) * 200)

export function ParallaxLetters() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const update = () => {
      if (!containerRef.current) return
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('[data-letter]')
      spans.forEach((span) => {
        const idx = parseInt(span.dataset.letter || '0')
        const depth = DEPTHS[idx]
        const ox = mouse.current.x * depth * 0.15
        const oy = mouse.current.y * depth * 0.15
        span.style.transform = `translate3d(${ox}px, ${oy}px, ${depth}px) rotateX(${oy * 0.1}deg) rotateY(${ox * 0.1}deg)`
      })
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(update)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReducedMotion])

  const chars = HEADLINE.split('')

  return (
    <div ref={containerRef} className="relative select-none" style={{ perspective: 600 }}>
      <h1 className="font-display text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-bold leading-tight tracking-tight text-center">
        {chars.map((char, i) => {
          if (char === ' ') {
            return <span key={i}>&nbsp;</span>
          }

          const depth = DEPTHS[i]
          const absDepth = Math.abs(depth)
          return (
            <motion.span
              key={i}
              data-letter={i}
              className="inline-block text-vault-text-bright"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(0px, 0px, ${depth}px)`,
                textShadow: prefersReducedMotion
                  ? 'none'
                  : `0 ${absDepth * 0.1}px ${absDepth * 0.2}px rgba(99,102,241,${absDepth * 0.003}), 0 ${absDepth * 0.05}px ${absDepth * 0.1}px rgba(99,102,241,${absDepth * 0.005})`,
                willChange: 'transform',
                transition: 'transform 0.1s ease-out, text-shadow 0.1s ease-out',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.02,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          )
        })}
      </h1>
    </div>
  )
}
