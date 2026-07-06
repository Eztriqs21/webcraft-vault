import { motion } from 'framer-motion'

const colors = ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#06b6d4']

export function BouncyLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex gap-2">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full"
            style={{ background: color }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
