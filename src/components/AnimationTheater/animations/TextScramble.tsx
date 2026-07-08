import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*' as const

const PHRASES = [
  'HOVER ME',
  'TEXT SCRAMBLE',
  'DIGITAL GLITCH',
  'RANDOM CHARS',
  'NOW READABLE',
  'ANIMATION',
  'WEB CRAFT',
  'VAULT',
]

export function TextScramble() {
  const [text, setText] = useState('HOVER ME')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const targetRef = useRef('HOVER ME')

  const scramble = useCallback((target: string) => {
    targetRef.current = target
    let iteration = 0
    const maxIterations = target.length * 2

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const progress = iteration / maxIterations
      const result = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i / target.length < progress) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setText(result)
      iteration++

      if (iteration >= maxIterations) {
        setText(target)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 30)
  }, [])

  const [phraseIndex, setPhraseIndex] = useState(0)

  const handleHover = useCallback(() => {
    const nextIndex = (phraseIndex + 1) % PHRASES.length
    setPhraseIndex(nextIndex)
    scramble(PHRASES[nextIndex])
  }, [phraseIndex, scramble])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="cursor-pointer select-none"
        role="button"
        tabIndex={0}
        onMouseEnter={handleHover}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHover() } }}
        whileHover={{ scale: 1.05 }}
        data-cursor="pointer"
      >
        <span className="font-mono text-2xl md:text-4xl font-bold text-vault-text-bright tracking-wider">
          {text}
        </span>
      </motion.div>
    </div>
  )
}
