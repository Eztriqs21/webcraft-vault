import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function PageTransition() {
  const [page, setPage] = useState<'a' | 'b'>('a')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const switchPage = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setPage((prev) => (prev === 'a' ? 'b' : 'a'))
      setTimeout(() => setIsTransitioning(false), 600)
    }, 300)
  }, [isTransitioning])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-32 md:w-56 md:h-40 rounded-xl overflow-hidden cursor-pointer" onClick={switchPage} data-cursor="pointer">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
            style={{
              background: page === 'a'
                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                : 'linear-gradient(135deg, #f43f5e, #fbbf24)',
            }}
          >
            Page {page === 'a' ? 'A' : 'B'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
