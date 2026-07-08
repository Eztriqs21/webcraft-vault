import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'intro' | 'text' | 'bar' | 'exit'>('intro')
  const [progress, setProgress] = useState(0)
  const [scrambledText, setScrambledText] = useState('')
  const targetText = 'WebCraft Vault'
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => setPhase('text'), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'text') return
    let iteration = 0
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    intervalRef.current = setInterval(() => {
      setScrambledText(
        targetText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return char
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iteration += 0.6
      if (iteration > targetText.length) {
        clearInterval(intervalRef.current!)
        setTimeout(() => setPhase('bar'), 400)
      }
    }, 35)

    return () => clearInterval(intervalRef.current!)
  }, [phase])

  useEffect(() => {
    if (phase !== 'bar') return

    let cancelled = false
    let rafId: number
    let current = 0

    const tick = () => {
      current += 1.5
      setProgress(Math.min(current, 100))
      if (current < 100 && !cancelled) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    document.fonts.ready.then(() => {
      if (!cancelled) {
        setTimeout(() => setPhase('exit'), 500)
      }
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => onCompleteRef.current(), 900)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[10002] flex flex-col items-center justify-center bg-[#030303]"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Orbiting particles */}
          <div className="relative w-32 h-32 mb-12">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.3,
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 8 - i * 2,
                    height: 8 - i * 2,
                    background: ['#6366f1', '#a855f7', '#10b981'][i],
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 ${12 + i * 4}px ${['#6366f1', '#a855f7', '#10b981'][i]}60`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center pulse */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #6366f1, #a855f7)',
                  boxShadow: '0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(168,85,247,0.3)',
                }}
              />
            </motion.div>
          </div>

          {/* Text phase */}
          <AnimatePresence mode="wait">
            {phase === 'text' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-2xl md:text-3xl font-bold text-vault-text-bright tracking-wider"
              >
                {scrambledText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-[#6366f1]"
                >
                  |
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          {phase === 'bar' && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              className="w-56 h-1 bg-[#1a1a1a] rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #10b981)',
                  boxShadow: '0 0 12px rgba(99,102,241,0.5)',
                  transition: 'width 0.1s ease-out',
                }}
              />
            </motion.div>
          )}

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 font-mono text-xs text-[#444] tracking-[0.3em] uppercase"
          >
            Anatomy of Iconic Websites
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
