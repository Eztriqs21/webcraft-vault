import { motion } from 'framer-motion'

const items = [
  { label: 'Animation', x: -20, y: 0 },
  { label: 'Typography', x: 20, y: 0 },
  { label: 'Color', x: 0, y: -20 },
  { label: 'Layout', x: 0, y: 20 },
  { label: 'Motion', x: -20, y: -20 },
]

export function StaggeredList() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: item.x, y: item.y }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium text-vault-text-bright border border-[rgba(255,255,255,0.1)]"
            style={{ background: `rgba(99,102,241,${0.05 + i * 0.05})` }}
          >
            {item.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
