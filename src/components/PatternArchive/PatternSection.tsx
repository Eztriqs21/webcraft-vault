import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

export function PatternSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    if (expandedId === null) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedId(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [expandedId])

  return (
    <section className="relative py-16 md:py-24 min-h-screen" id="pattern-archive" aria-labelledby="patterns-heading">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 id="patterns-heading" className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Pattern Archive
          </h2>
          <p className="text-[#888] text-lg max-w-xl">
            10 essential UI patterns. Visual layout demonstrations with interactive previews.
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
              onClick={() => setExpandedId(expandedId === pattern.id ? null : pattern.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedId(expandedId === pattern.id ? null : pattern.id) } }}
              data-cursor="pointer"
            >
              {expandedId === pattern.id ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-vault-bg p-4 md:p-8 flex flex-col"
                >
                  <div className="flex-1 overflow-auto">
                    <PatternFullDemo patternId={pattern.id} />
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div>
                      <h3 className="font-display text-base md:text-lg font-bold text-vault-text-bright">
                        {pattern.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-[#888]">{pattern.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedId(null)
                      }}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)]"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                  <PatternPreview patternId={pattern.id} />
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

const c = {
  f: 'rgba(6,182,212,',
  bg10: 'rgba(6,182,212,0.1)',
  bg15: 'rgba(6,182,212,0.15)',
  bg20: 'rgba(6,182,212,0.2)',
  bg05: 'rgba(6,182,212,0.05)',
  bg08: 'rgba(6,182,212,0.08)',
  bg12: 'rgba(6,182,212,0.12)',
  bg06: 'rgba(6,182,212,0.06)',
  bg04: 'rgba(6,182,212,0.04)',
  bd06: 'rgba(6,182,212,0.06)',
  bd08: 'rgba(6,182,212,0.08)',
  bd10: 'rgba(6,182,212,0.1)',
  bd12: 'rgba(6,182,212,0.12)',
  bd15: 'rgba(6,182,212,0.15)',
}

function PatternPreview({ patternId }: { patternId: number }) {
  if (patternId === 1) {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-20 md:h-28 mb-3">
        <div className="col-span-2 row-span-2 rounded-lg" style={{ background: c.bg12, border: `1px solid ${c.bd15}` }} />
        <div className="rounded-lg" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }} />
        <div className="rounded-lg" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }} />
      </div>
    )
  }
  if (patternId === 2) {
    return (
      <div className="flex gap-2 h-20 md:h-28 mb-3">
        <div className="flex-1 rounded-lg" style={{ background: c.bg08, border: `1px solid ${c.bd10}` }} />
        <div className="w-1/3 space-y-1.5 pt-4">
          <div className="h-2 w-full rounded" style={{ background: c.bg15 }} />
          <div className="h-2 w-3/4 rounded" style={{ background: c.bg08 }} />
          <div className="h-2 w-1/2 rounded" style={{ background: c.bg08 }} />
        </div>
      </div>
    )
  }
  if (patternId === 3) {
    return (
      <div className="relative h-20 md:h-28 mb-3 rounded-lg overflow-hidden" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.bg15}, transparent)` }} />
        <div className="absolute bottom-2 left-3 h-2.5 w-20 rounded" style={{ background: c.bg20 }} />
        <div className="absolute bottom-2 left-3 mt-4 h-1.5 w-14 rounded" style={{ background: c.bg08 }} />
      </div>
    )
  }
  if (patternId === 4) {
    return (
      <div className="flex gap-2 h-20 md:h-28 mb-3">
        <div className="w-8 rounded-lg flex flex-col items-center gap-1 pt-2" style={{ background: c.bg08, border: `1px solid ${c.bd10}` }}>
          <div className="w-4 h-1 rounded" style={{ background: c.bg20 }} />
          <div className="w-4 h-1 rounded" style={{ background: c.bg08 }} />
          <div className="w-4 h-1 rounded" style={{ background: c.bg08 }} />
        </div>
        <div className="flex-1 rounded-lg p-2" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
          <div className="h-1.5 w-16 rounded mb-2" style={{ background: c.bg15 }} />
          <div className="h-1 w-24 rounded mb-1" style={{ background: c.bg06 }} />
          <div className="h-1 w-20 rounded" style={{ background: c.bg06 }} />
        </div>
      </div>
    )
  }
  if (patternId === 5) {
    return (
      <div className="flex gap-2 h-20 md:h-28 mb-3 overflow-hidden">
        {[1,2,3,4].map(n => (
          <div key={n} className="flex-shrink-0 w-16 rounded-lg" style={{ background: c.bg08, border: `1px solid ${c.bd10}` }} />
        ))}
      </div>
    )
  }
  if (patternId === 6) {
    return (
      <div className="space-y-1.5 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded-lg flex items-center px-3" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="w-16 h-1.5 rounded" style={{ background: c.bg15 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 7) {
    return (
      <div className="flex gap-2 h-20 md:h-28 mb-3 overflow-hidden">
        {[1,2,3].map(n => (
          <div key={n} className="flex-shrink-0 w-24 rounded-xl p-2" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }}>
            <div className="h-1 w-12 rounded mb-1" style={{ background: c.bg15 }} />
            <div className="h-1 w-16 rounded" style={{ background: c.bg06 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 8) {
    return (
      <div className="grid grid-cols-3 gap-1.5 h-20 md:h-28 mb-3">
        {[1,2,3].map(n => (
          <div key={n} className="rounded-lg p-1.5 flex flex-col items-center justify-center gap-1" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="w-5 h-5 rounded-full" style={{ background: c.bg10 }} />
            <div className="h-1 w-8 rounded" style={{ background: c.bg15 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 9) {
    return (
      <div className="grid grid-cols-3 gap-1.5 h-20 md:h-28 mb-3">
        {[1,2,3,4,5,6].map(n => (
          <div key={n} className="rounded-lg flex items-center justify-center" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="w-4 h-4 rounded" style={{ background: c.bg10 }} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="h-20 md:h-28 mb-3 flex flex-col justify-end">
      <div className="h-10 rounded-t-lg flex items-center px-3 gap-3" style={{ background: c.bg08, borderBottom: `1px solid ${c.bd10}` }}>
        <div className="h-1 w-8 rounded" style={{ background: c.bg15 }} />
        <div className="h-1 w-6 rounded" style={{ background: c.bg08 }} />
      </div>
    </div>
  )
}

function PatternFullDemo({ patternId }: { patternId: number }) {
  if (patternId === 1) {
    return (
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full min-h-[300px]">
        <div className="col-span-2 row-span-2 rounded-xl" style={{ background: c.bg08, border: `1px solid ${c.bd12}` }} />
        <div className="rounded-xl" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }} />
        <div className="rounded-xl" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }} />
        <div className="rounded-xl" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }} />
        <div className="col-span-2 rounded-xl" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }} />
        <div className="col-span-2 rounded-xl" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }} />
      </div>
    )
  }
  if (patternId === 2) {
    return (
      <div className="flex gap-4 h-full min-h-[300px]">
        <div className="flex-1 rounded-xl" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }} />
        <div className="flex-1 space-y-3 pt-8">
          <div className="h-4 w-32 rounded" style={{ background: c.bg15 }} />
          <div className="h-3 w-48 rounded" style={{ background: c.bg08 }} />
          <div className="h-3 w-40 rounded" style={{ background: c.bg08 }} />
          <div className="h-3 w-44 rounded" style={{ background: c.bg08 }} />
        </div>
      </div>
    )
  }
  if (patternId === 3) {
    return (
      <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.bg12}, transparent)` }} />
        <div className="absolute bottom-6 left-8 h-6 w-48 rounded" style={{ background: c.bg20 }} />
        <div className="absolute bottom-6 left-8 mt-8 h-4 w-32 rounded" style={{ background: c.bg08 }} />
      </div>
    )
  }
  if (patternId === 4) {
    return (
      <div className="flex gap-3 h-full min-h-[300px]">
        <div className="w-16 rounded-xl flex flex-col items-center gap-2 pt-3" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} className="w-8 h-1.5 rounded" style={{ background: n === 1 ? c.bg20 : c.bg06 }} />
          ))}
        </div>
        <div className="flex-1 rounded-xl p-4" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
          <div className="h-4 w-32 rounded mb-4" style={{ background: c.bg15 }} />
          <div className="h-2 w-48 rounded mb-2" style={{ background: c.bg06 }} />
          <div className="h-2 w-40 rounded mb-2" style={{ background: c.bg06 }} />
          <div className="h-2 w-44 rounded" style={{ background: c.bg06 }} />
        </div>
      </div>
    )
  }
  if (patternId === 5) {
    return (
      <div className="flex gap-3 h-full min-h-[300px] overflow-hidden">
        {[1,2,3,4,5].map(n => (
          <div key={n} className="flex-shrink-0 w-40 rounded-xl p-3" style={{ background: c.bg05, border: `1px solid ${c.bd06}` }}>
            <div className="h-16 rounded-lg mb-2" style={{ background: c.bg08 }} />
            <div className="h-2 w-20 rounded" style={{ background: c.bg12 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 6) {
    return (
      <div className="space-y-3 min-h-[300px]">
        {['How does pricing work?', 'Can I change plans?', 'What about refunds?', 'Is there a free trial?'].map((_, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="flex items-center justify-between">
              <div className="h-3 w-32 rounded" style={{ background: c.bg12 }} />
              <div className="text-[#888] text-lg">+</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 7) {
    return (
      <div className="flex gap-3 h-full min-h-[300px] overflow-hidden">
        {[1,2,3].map(n => (
          <div key={n} className="flex-shrink-0 w-48 rounded-xl p-4" style={{ background: c.bg05, border: `1px solid ${c.bd06}` }}>
            <div className="h-2 w-20 rounded mb-2" style={{ background: c.bg12 }} />
            <div className="h-1.5 w-32 rounded mb-1" style={{ background: c.bg06 }} />
            <div className="h-1.5 w-28 rounded" style={{ background: c.bg06 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 8) {
    return (
      <div className="grid grid-cols-3 gap-3 h-full min-h-[300px]">
        {[1,2,3].map(n => (
          <div key={n} className="rounded-xl p-4 flex flex-col items-center gap-3" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="w-10 h-10 rounded-full" style={{ background: c.bg08 }} />
            <div className="h-2.5 w-16 rounded" style={{ background: c.bg12 }} />
            <div className="h-2 w-20 rounded" style={{ background: c.bg06 }} />
          </div>
        ))}
      </div>
    )
  }
  if (patternId === 9) {
    return (
      <div className="grid grid-cols-3 gap-3 h-full min-h-[300px]">
        {[1,2,3,4,5,6].map(n => (
          <div key={n} className="rounded-xl p-3 flex flex-col items-center gap-2" style={{ background: c.bg04, border: `1px solid ${c.bd06}` }}>
            <div className="w-8 h-8 rounded-lg" style={{ background: c.bg08 }} />
            <div className="h-2 w-12 rounded" style={{ background: c.bg12 }} />
            <div className="h-1.5 w-16 rounded" style={{ background: c.bg06 }} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-4 min-h-[300px]">
      <div className="h-4 w-32 rounded" style={{ background: c.bg12 }} />
      <div className="h-3 w-48 rounded" style={{ background: c.bg08 }} />
      <div className="h-3 w-40 rounded" style={{ background: c.bg08 }} />
      <div className="flex gap-3 mt-6">
        <div className="h-8 w-24 rounded-lg" style={{ background: c.bg08 }} />
        <div className="h-8 w-24 rounded-lg" style={{ background: c.bg04 }} />
      </div>
      <div className="mt-6 h-16 rounded-xl" style={{ background: c.bg06, border: `1px solid ${c.bd08}` }} />
    </div>
  )
}
