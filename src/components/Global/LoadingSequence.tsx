import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'orb' | 'text' | 'bar' | 'reveal'>('orb')
  const [progress, setProgress] = useState(0)
  const [scrambledText, setScrambledText] = useState('')
  const targetText = 'Assembling the vault...'
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'text') return
    let iteration = 0
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    intervalRef.current = setInterval(() => {
      setScrambledText(
        targetText
          .split('')
          .map((char, i) => {
            if (i < iteration) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iteration += 0.5
      if (iteration > targetText.length) {
        clearInterval(intervalRef.current!)
        setTimeout(() => setPhase('bar'), 200)
      }
    }, 30)

    return () => clearInterval(intervalRef.current!)
  }, [phase])

  useEffect(() => {
    if (phase !== 'bar') return

    const loadPromise = document.fonts.ready
    let current = 0

    const tick = () => {
      current += 2
      setProgress(Math.min(current, 100))
      if (current < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    loadPromise.then(() => {
      setTimeout(() => setPhase('reveal'), 600)
    })
  }, [phase])

  useEffect(() => {
    if (phase === 'reveal') {
      const t = setTimeout(onComplete, 800)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'reveal' && (
        <motion.div
          className="fixed inset-0 z-[10002] flex flex-col items-center justify-center bg-[#030303]"
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <AnimatePresence mode="wait">
            {(phase === 'orb' || phase === 'text') && (
              <motion.div
                key="orb"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 rounded-full mb-8"
                style={{
                  background: 'radial-gradient(circle, #6366f1 0%, #a855f7 50%, transparent 70%)',
                  boxShadow: '0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(168, 85, 247, 0.2)',
                  animation: 'orb-pulse 2s ease-in-out infinite',
                }}
              />
            )}
          </AnimatePresence>

          {phase === 'text' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm text-[#666] tracking-[0.2em] uppercase"
            >
              {scrambledText}
              <span className="animate-pulse">_</span>
            </motion.div>
          )}

          {phase === 'bar' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-48 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                  transition: 'width 0.3s ease-out',
                }}
              />
            </motion.div>
          )}

          <style>{`
            @keyframes orb-pulse {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 1; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
