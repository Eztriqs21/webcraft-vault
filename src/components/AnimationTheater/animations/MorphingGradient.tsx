import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export function MorphingGradient() {
  const [hue, setHue] = useState(0)

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
          borderRadius: ['20%', '50%', '20%'],
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="pointer"
      />
    </div>
  )
}
