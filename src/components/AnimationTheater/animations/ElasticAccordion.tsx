import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { id: 1, label: 'Click to expand', content: 'This panel uses spring physics for a natural, bouncy feel.' },
  { id: 2, label: 'Elastic motion', content: 'The expand animation uses Framer Motion layout transitions.' },
  { id: 3, label: 'Smooth resize', content: 'Each panel independently animates its height.' },
]

export function ElasticAccordion() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 space-y-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] cursor-pointer"
            style={{ background: 'rgba(20,20,30,0.8)' }}
            onClick={() => toggle(item.id)}
            data-cursor="pointer"
          >
            <motion.div
              layout="position"
              className="px-4 py-3 text-sm font-bold text-vault-text-bright"
            >
              {item.label}
            </motion.div>
            <AnimatePresence initial={false}>
              {openId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 text-xs text-[#888]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
