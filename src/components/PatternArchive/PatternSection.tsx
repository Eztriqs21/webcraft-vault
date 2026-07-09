import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  BentoGridDemo,
  AsymmetricEditorialDemo,
  FullBleedVideoHeroDemo,
  StickySideNavDemo,
  HorizontalScrollGalleryDemo,
  PhysicsFAQAccordionDemo,
  DragCarouselDemo,
  SpotlightPricingDemo,
  IconFeatureGridDemo,
  MegaFooterRevealDemo,
} from './patterns'

const PATTERNS = [
  { id: 1, name: 'Bento Grid', description: 'A grid within a grid — meta layout' },
  { id: 2, name: 'Asymmetric Editorial', description: 'Two-column with offset composition' },
  { id: 3, name: 'Full-bleed Video Hero', description: 'Video background with parallax text' },
  { id: 4, name: 'Sticky Side Nav', description: 'Fixed navigation with scrolling content' },
  { id: 5, name: 'Horizontal Scroll Gallery', description: 'Inception — scroll inside scroll' },
  { id: 6, name: 'Physics FAQ Accordion', description: 'Spring-based expand and collapse' },
  { id: 7, name: 'Drag-enabled Carousel', description: 'Draggable testimonial cards' },
  { id: 8, name: 'Spotlight Pricing', description: 'Cards with radial gradient hover' },
  { id: 9, name: 'Icon Feature Grid', description: 'Staggered entrance animation' },
  { id: 10, name: 'Mega Footer Reveal', description: 'Footer that unrolls from bottom' },
]

const DEMOS: Record<number, React.FC<{ isExpanded: boolean }>> = {
  1: BentoGridDemo,
  2: AsymmetricEditorialDemo,
  3: FullBleedVideoHeroDemo,
  4: StickySideNavDemo,
  5: HorizontalScrollGalleryDemo,
  6: PhysicsFAQAccordionDemo,
  7: DragCarouselDemo,
  8: SpotlightPricingDemo,
  9: IconFeatureGridDemo,
  10: MegaFooterRevealDemo,
}

export function PatternSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const expandedRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (expandedId === null) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedId(null)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [expandedId])

  useEffect(() => {
    if (expandedId === null || !expandedRef.current) return
    const el = expandedRef.current
    const focusable = el.querySelectorAll<HTMLElement>('button, [tabIndex]:not([tabIndex="-1"])')
    focusable?.[0]?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const first = focusable?.[0]
      const last = focusable?.[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [expandedId])

  const handleExpand = (id: number, e: React.MouseEvent | React.KeyboardEvent) => {
    triggerRef.current = e.target as HTMLElement
    setExpandedId(expandedId === id ? null : id)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedId(null)
    triggerRef.current?.focus()
  }

  return (
    <section className="relative py-16 md:py-24 min-h-screen" id="pattern-archive" aria-labelledby="patterns-heading">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 id="patterns-heading" className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Pattern Archive
          </h2>
          <p className="text-[#888] text-lg max-w-xl">
            10 essential UI patterns. Live interactive demos you can click, drag, and explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATTERNS.map((pattern, i) => (
            <motion.div
              key={pattern.id}
              layout
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === pattern.id}
              className={`relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-vault-bg overflow-hidden cursor-pointer ${
                i === 0 ? 'sm:col-span-2' : ''
              } ${expandedId === pattern.id ? 'sm:col-span-2 lg:col-span-3 min-h-[60vh]' : 'min-h-[200px] md:min-h-[250px]'}`}
              whileHover={{ scale: expandedId === pattern.id ? 1 : 1.02 }}
              onClick={(e) => handleExpand(pattern.id, e)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleExpand(pattern.id, e) } }}
              data-cursor="pointer"
            >
              {expandedId === pattern.id ? (
                <motion.div
                  ref={expandedRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={pattern.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-vault-bg p-4 md:p-8 flex flex-col"
                >
                  <div className="flex-1 overflow-auto">
                    <PatternDemo patternId={pattern.id} isExpanded />
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div>
                      <h3 className="font-display text-base md:text-lg font-bold text-vault-text-bright">
                        {pattern.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-[#888]">{pattern.description}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      aria-keyshortcuts="Escape"
                      className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)]"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                  <PatternDemo patternId={pattern.id} isExpanded={false} />
                  <div>
                    <h3 className="font-display text-base md:text-lg font-bold text-vault-text-bright mb-1">
                      {pattern.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-[#888]">{pattern.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatternDemo({ patternId, isExpanded }: { patternId: number; isExpanded: boolean }) {
  const DemoComponent = DEMOS[patternId]
  if (!DemoComponent) return null
  return <DemoComponent isExpanded={isExpanded} />
}
