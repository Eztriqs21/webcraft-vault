import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

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

  const phrases = [
    'HOVER ME',
    'TEXT SCRAMBLE',
    'DIGITAL GLITCH',
    'RANDOM CHARS',
    'NOW READABLE',
    'ANIMATION',
    'WEB CRAFT',
    'VAULT',
  ]

  const [phraseIndex, setPhraseIndex] = useState(0)

  const handleHover = useCallback(() => {
    const nextIndex = (phraseIndex + 1) % phrases.length
    setPhraseIndex(nextIndex)
    scramble(phrases[nextIndex])
  }, [phraseIndex, scramble, phrases])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="cursor-pointer select-none"
        onMouseEnter={handleHover}
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
