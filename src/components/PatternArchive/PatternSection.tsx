import { useState } from 'react'
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

  return (
    <section className="relative py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Pattern Archive
          </h2>
          <p className="text-[#666] text-lg max-w-xl">
            10 essential UI patterns. Each one a live, interactive demo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {PATTERNS.map((pattern, i) => (
            <motion.div
              key={pattern.id}
              layout
              className={`relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] backdrop-blur-sm overflow-hidden cursor-pointer ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              } ${expandedId === pattern.id ? 'col-span-full row-span-full' : ''}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setExpandedId(expandedId === pattern.id ? null : pattern.id)}
              data-cursor="pointer"
            >
              <div className="p-4 md:p-6 h-full flex flex-col justify-between">
                <div>
                  <PatternPreview patternId={pattern.id} />
                </div>
                <div>
                  <h3 className="font-display text-base md:text-lg font-bold text-vault-text-bright mb-1">
                    {pattern.name}
                  </h3>
                  <p className="text-[10px] md:text-xs text-[#666]">{pattern.description}</p>
                </div>
              </div>

              {expandedId === pattern.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[rgba(3,3,3,0.95)] p-4 md:p-8 flex flex-col"
                >
                  <div className="flex-1 overflow-auto">
                    <PatternFullDemo patternId={pattern.id} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedId(null)
                    }}
                    className="mt-3 md:mt-4 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)] self-start"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatternPreview({ patternId }: { patternId: number }) {
  if (patternId === 1) {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-16 md:h-24 mb-3 md:mb-4">
        <div className="col-span-2 row-span-2 rounded bg-[rgba(6,182,212,0.15)]" />
        <div className="rounded bg-[rgba(6,182,212,0.08)]" />
        <div className="rounded bg-[rgba(6,182,212,0.08)]" />
      </div>
    )
  }
  if (patternId === 6) {
    return (
      <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 md:h-8 rounded bg-[rgba(6,182,212,0.08)] flex items-center px-2 md:px-3">
            <div className="w-12 md:w-16 h-1.5 md:h-2 rounded bg-[rgba(6,182,212,0.2)]" />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
      <div className="h-2.5 md:h-3 w-16 md:w-20 rounded bg-[rgba(6,182,212,0.15)]" />
      <div className="h-2 w-24 md:w-32 rounded bg-[rgba(6,182,212,0.08)]" />
      <div className="h-2 w-18 md:w-24 rounded bg-[rgba(6,182,212,0.08)]" />
    </div>
  )
}

function PatternFullDemo({ patternId }: { patternId: number }) {
  if (patternId === 1) {
    return (
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
        <div className="col-span-2 row-span-2 rounded-xl bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.15)]" />
        <div className="rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)]" />
        <div className="rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)]" />
        <div className="rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)]" />
        <div className="col-span-2 rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)]" />
        <div className="col-span-2 rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)]" />
      </div>
    )
  }
  if (patternId === 6) {
    return (
      <div className="space-y-2 md:space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl bg-[rgba(6,182,212,0.05)] border border-[rgba(6,182,212,0.1)] p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="h-2.5 md:h-3 w-24 md:w-32 rounded bg-[rgba(6,182,212,0.15)]" />
              <div className="text-[#666] text-sm md:text-lg">+</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="h-3 md:h-4 w-32 md:w-40 rounded bg-[rgba(6,182,212,0.15)]" />
      <div className="h-2.5 md:h-3 w-48 md:w-64 rounded bg-[rgba(6,182,212,0.08)]" />
      <div className="h-2.5 md:h-3 w-36 md:w-48 rounded bg-[rgba(6,182,212,0.08)]" />
      <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
        <div className="h-7 md:h-8 w-18 md:w-24 rounded-lg bg-[rgba(6,182,212,0.1)]" />
        <div className="h-7 md:h-8 w-18 md:w-24 rounded-lg bg-[rgba(6,182,212,0.05)]" />
      </div>
    </div>
  )
}
