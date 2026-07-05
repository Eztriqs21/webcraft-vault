import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const HEADLINE = 'The Anatomy of Iconic Websites'

export function ParallaxLetters() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const [offsets, setOffsets] = useState(() =>
    HEADLINE.split('').map(() => ({
      depth: (Math.random() - 0.5) * 200,
      offsetX: 0,
      offsetY: 0,
    }))
  )
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2

      setOffsets((prev) =>
        prev.map((o) => ({
          ...o,
          offsetX: mouse.current.x * o.depth * 0.15,
          offsetY: mouse.current.y * o.depth * 0.15,
        }))
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  let wordIndex = 0

  return (
    <div ref={containerRef} className="relative select-none">
      <h1 className="font-display text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-bold leading-tight tracking-tight text-center">
        {HEADLINE.split('').map((char, i) => {
          if (char === ' ') {
            wordIndex++
            return <span key={i}>&nbsp;</span>
          }

          const offset = offsets[i]
          return (
            <motion.span
              key={i}
              className="inline-block text-vault-text-bright"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(${offset.offsetX}px, ${offset.offsetY}px, ${offset.depth}px)`,
                textShadow: `0 ${Math.abs(offset.depth) * 0.05}px ${Math.abs(offset.depth) * 0.1}px rgba(99,102,241,${Math.abs(offset.depth) * 0.002})`,
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
