import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

const items = [
  { id: 1, label: 'Click to expand', content: 'This panel uses spring physics for a natural, bouncy feel.' },
  { id: 2, label: 'Elastic motion', content: 'The expand animation uses Framer Motion layout transitions.' },
  { id: 3, label: 'Smooth resize', content: 'Each panel independently animates its height.' },
]

export function ElasticAccordion() {
  const [openId, setOpenId] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 space-y-2" role="group" aria-label="Elastic accordion demo">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]"
            style={{ background: 'rgba(20,20,30,0.8)' }}
          >
            <motion.div
              layout="position"
              role="button"
              tabIndex={0}
              aria-expanded={openId === item.id}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
              className="px-4 py-3 text-sm font-bold text-vault-text-bright cursor-pointer"
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(item.id) } }}
              data-cursor="pointer"
            >
              {item.label}
            </motion.div>
            <AnimatePresence initial={false}>
              {openId === item.id && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-header-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25 }}
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
