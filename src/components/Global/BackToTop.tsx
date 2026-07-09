import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from './SmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1.5 })
    }
  }, [lenis, prefersReducedMotion])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-20 right-6 z-50 w-10 h-10 rounded-full bg-[rgba(10,10,10,0.8)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl flex items-center justify-center text-[#888] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-colors"
          data-cursor="pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12V4M4 7l4-4 4 4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
