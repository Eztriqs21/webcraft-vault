import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

const items = [
  { q: 'How does pricing work?', a: 'We offer monthly and annual plans with transparent pricing.' },
  { q: 'Can I change plans?', a: 'Upgrade or downgrade anytime from your account settings.' },
  { q: 'What about refunds?', a: 'Full refund within 30 days, no questions asked.' },
]

export function PhysicsFAQAccordionDemo({ isExpanded }: { isExpanded: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`space-y-2 ${isExpanded ? 'min-h-[300px]' : ''}`}
      role="group"
      aria-label="Spring-based FAQ accordion"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.06)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`w-full flex items-center justify-between text-left transition-colors hover:bg-[rgba(6,182,212,0.08)] ${
              isExpanded ? 'px-4 py-3' : 'px-3 py-2'
            }`}
            aria-expanded={open === i}
            data-cursor="pointer"
          >
            <span className={`font-medium text-vault-text-bright ${isExpanded ? 'text-sm' : 'text-xs'}`}>
              {item.q}
            </span>
            <span className={`text-[#888] transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
              +
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <p className={`text-[#999] ${isExpanded ? 'px-4 pb-3 text-sm' : 'px-3 pb-2 text-xs'}`}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
