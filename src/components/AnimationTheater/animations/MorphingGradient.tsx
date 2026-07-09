import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export function MorphingGradient() {
  const [hue, setHue] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const handleClick = useCallback(() => {
    setHue((prev) => (prev + 40) % 360)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-40 h-40 rounded-2xl cursor-pointer"
        animate={{
          background: `linear-gradient(${hue}deg, 
            hsl(${hue}, 80%, 50%), 
            hsl(${(hue + 120) % 360}, 80%, 50%), 
            hsl(${(hue + 240) % 360}, 80%, 50%))`,
          borderRadius: prefersReducedMotion ? '20%' : ['20%', '50%', '20%'],
        }}
        transition={{
          background: { duration: 1.5, ease: 'easeInOut' },
          borderRadius: { duration: 1.5, ease: 'easeInOut' },
        }}
        onClick={handleClick}
        whileHover={prefersReducedMotion ? {} : { scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
        data-cursor="pointer"
      />
    </div>
  )
}
