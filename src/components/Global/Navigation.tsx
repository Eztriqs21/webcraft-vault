import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTION_MOODS } from '../../data/sections'

const NAV_ITEMS = [
  { id: 'hero', label: 'Vault', icon: '◆' },
  { id: 'theater', label: 'Animations', icon: '▶' },
  { id: 'typography', label: 'Typography', icon: 'Aa' },
  { id: 'orrery', label: 'Colors', icon: '●' },
  { id: 'patterns', label: 'Patterns', icon: '▦' },
  { id: 'tools', label: 'Tools', icon: '⟡' },
  { id: 'footer', label: 'Credits', icon: '≡' },
]

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const activeAccentRgb = SECTION_MOODS[activeSection as keyof typeof SECTION_MOODS]?.accentRgb || '99,102,241'

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section')
            if (id) setActiveSection(id)
          }
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: y, behavior: 'auto' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990]"
        >
          <nav className="flex items-center gap-1 px-3 py-2 rounded-full bg-[rgba(10,10,10,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" aria-label="Section navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label={`Navigate to ${item.label}`}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#888] hover:text-[#999]'
                  }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `rgba(${activeAccentRgb}, 0.15)`,
                        boxShadow: `0 0 20px rgba(${activeAccentRgb}, 0.2)`,
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 text-[10px]">{item.icon}</span>
                  <AnimatePresence>
                    {(hoveredItem === item.id || isActive) && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 overflow-hidden whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
