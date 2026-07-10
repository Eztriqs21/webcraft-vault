import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FONT_PAIRINGS, loadFont } from '../../data/fonts'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CONTEXTS = ['hero', 'product', 'blog', 'dashboard'] as const

export function TypographySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [context, setContext] = useState<(typeof CONTEXTS)[number]>('hero')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activePairing = FONT_PAIRINGS[activeIndex]
  const prefersReducedMotion = useReducedMotion()
  const [customText, setCustomText] = useState<Record<string, Record<string, string>>>({})

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    loadFont(activePairing.heading)
    loadFont(activePairing.body)
  }, [activeIndex, activePairing.heading, activePairing.body])

  useEffect(() => {
    const ratios = new Map<Element, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target, entry.intersectionRatio)
        })

        let maxRatio = 0
        let maxIdx = 0
        ratios.forEach((ratio, el) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            maxIdx = parseInt((el as HTMLElement).getAttribute('data-index') || '0')
          }
        })
        if (maxRatio > 0) {
          setActiveIndex(maxIdx)
        }
      },
      { root: listRef.current, threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    )

    const items = listRef.current?.querySelectorAll('[data-index]')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const handleShuffle = useCallback(() => {
    setActiveIndex(Math.floor(Math.random() * FONT_PAIRINGS.length))
  }, [])

  const handleCopyCSS = useCallback((pairing: { heading: string; body: string }, index: number) => {
    const css = `font-family: '${pairing.heading}', sans-serif;\n/* Body: '${pairing.body}' */`
    navigator.clipboard.writeText(css).catch(() => {})
    setCopiedIndex(index)
    if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
    copiedTimeoutRef.current = setTimeout(() => setCopiedIndex(null), 1500)
  }, [])

  const getText = useCallback((ctx: string, key: string, fallback: string) => {
    return customText[ctx]?.[key] ?? fallback
  }, [customText])

  const handleTextChange = useCallback((ctx: string, key: string, value: string) => {
    setCustomText((prev) => ({
      ...prev,
      [ctx]: { ...prev[ctx], [key]: value },
    }))
  }, [])

  return (
    <section className="relative py-24 min-h-screen" id="typography-lab" aria-labelledby="typography-heading">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 id="typography-heading" className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
                Typography Laboratory
              </h2>
              <p className="text-[#999] text-lg max-w-xl">
                20 curated font pairings. Live-updating editorial canvas. Find the perfect voice.
              </p>
            </div>
            <button
              onClick={handleShuffle}
              className="self-start px-4 py-2 text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(16,185,129,0.15)] hover:text-[#10b981] focus-visible:ring-2 focus-visible:ring-[#818cf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-all"
              data-cursor="pointer"
            >
              Shuffle
            </button>
          </div>
        </motion.div>

        {/* Mobile: sticky preview + scrollable list */}
        {/* Desktop: side-by-side split */}
        <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
          {/* Mobile: sticky top preview */}
          <div className="md:hidden sticky top-0 z-10 bg-vault-bg/80 backdrop-blur-xl -mx-4 px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${context}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] p-4 overflow-hidden"
                style={{ maxHeight: '200px' }}
              >
                <ContextCanvas
                  heading={activePairing.heading}
                  body={activePairing.body}
                  context={context}
                  getText={getText}
                  onTextChange={handleTextChange}
                />
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {CONTEXTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setContext(c)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all capitalize whitespace-nowrap ${
                    context === c
                      ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981]'
                      : 'bg-[rgba(255,255,255,0.05)] text-[#888]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: sticky left panel */}
          <div className="hidden md:block md:w-1/2 md:sticky md:top-24 md:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${context}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] backdrop-blur-sm p-8 overflow-hidden min-h-[500px]"
              >
                <ContextCanvas
                  heading={activePairing.heading}
                  body={activePairing.body}
                  context={context}
                  getText={getText}
                  onTextChange={handleTextChange}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-4">
              {CONTEXTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setContext(c)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all capitalize ${
                    context === c
                      ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981]'
                      : 'bg-[rgba(255,255,255,0.05)] text-[#888] hover:text-[#999]'
                  }`}
                  data-cursor="pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={listRef}
            className="w-full md:w-1/2 flex overflow-x-auto md:overflow-y-auto md:max-h-[70vh] gap-4 md:gap-5 snap-x snap-mandatory snap-always pb-4 md:pb-0 md:pr-4 custom-scrollbar scroll-smooth"
          >
            {FONT_PAIRINGS.map((pairing, i) => (
              <div
                key={i}
                data-index={i}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(i) } }}
                className={`group relative flex-shrink-0 w-[260px] md:w-full snap-center p-4 md:p-6 rounded-xl border cursor-pointer transition-all ${
                  i === activeIndex
                    ? 'border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.05)] scale-[1.02]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.4)] hover:border-[rgba(255,255,255,0.12)]'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-vault-text-bright font-medium text-sm md:text-base"
                    style={{ fontFamily: pairing.heading }}
                  >
                    {pairing.heading}
                  </span>
                  <span className="text-[#888] mx-2">+</span>
                  <span
                    className="text-vault-text-bright font-medium text-sm md:text-base"
                    style={{ fontFamily: pairing.body }}
                  >
                    {pairing.body}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#888] font-mono">{pairing.personality}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyCSS(pairing, i)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-[10px] font-mono rounded bg-[rgba(255,255,255,0.05)] text-[#888] hover:text-[#10b981]"
                    data-cursor="pointer"
                  >
                    {copiedIndex === i ? 'Copied!' : 'Copy CSS'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContextCanvas({
  heading,
  body,
  context,
  getText,
  onTextChange,
}: {
  heading: string
  body: string
  context: string
  getText: (ctx: string, key: string, fallback: string) => string
  onTextChange: (ctx: string, key: string, value: string) => void
}) {
  const editableClass = 'outline-none rounded px-1 -mx-1 transition-colors hover:bg-[rgba(255,255,255,0.05)] focus:bg-[rgba(255,255,255,0.08)] cursor-text'

  if (context === 'hero') {
    return (
      <div className="space-y-4 md:space-y-6">
        <div
          className="text-2xl md:text-4xl font-bold text-vault-text-bright leading-tight"
          style={{ fontFamily: heading }}
        >
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('hero', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('hero', 'heading', 'Design is not just what it looks like.')}
          </span>
        </div>
        <div className="text-sm md:text-lg text-[#888]" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('hero', 'body', e.currentTarget.textContent || '')}
          >
            {getText('hero', 'body', 'Design is how it works. Every pixel, every interaction, every moment matters.')}
          </span>
        </div>
        <div className="flex gap-3 pt-2 md:pt-4">
          <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-[#10b981] text-white text-xs md:text-sm font-medium" style={{ fontFamily: body }}>
            Get Started
          </div>
          <div className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-[rgba(255,255,255,0.1)] text-[#999] text-xs md:text-sm" style={{ fontFamily: body }}>
            Learn More
          </div>
        </div>
      </div>
    )
  }

  if (context === 'product') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="w-full h-24 md:h-40 rounded-xl bg-[rgba(255,255,255,0.03)]" />
        <div className="text-lg md:text-2xl font-bold text-vault-text-bright" style={{ fontFamily: heading }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('product', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('product', 'heading', 'Premium Headphones')}
          </span>
        </div>
        <div className="text-xs md:text-base text-[#888]" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('product', 'body', e.currentTarget.textContent || '')}
          >
            {getText('product', 'body', 'Experience sound like never before. Crystal-clear audio with active noise cancellation.')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg md:text-xl font-bold text-vault-text-bright" style={{ fontFamily: heading }}>$299</span>
          <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-[#10b981] text-white text-xs md:text-sm" style={{ fontFamily: body }}>
            Add to Cart
          </div>
        </div>
      </div>
    )
  }

  if (context === 'blog') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="text-[10px] md:text-xs text-[#888] font-mono">JULY 5, 2026</div>
        <div className="text-xl md:text-3xl font-bold text-vault-text-bright leading-tight" style={{ fontFamily: heading }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('blog', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('blog', 'heading', 'The Future of Design Systems')}
          </span>
        </div>
        <div className="text-xs md:text-base text-[#888] leading-relaxed" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('blog', 'body', e.currentTarget.textContent || '')}
          >
            {getText('blog', 'body', 'As design tools evolve, so must our approach to building scalable, maintainable systems. The intersection of code and creativity is where the magic happens.')}
          </span>
        </div>
        <div className="text-[10px] md:text-sm text-[#888]" style={{ fontFamily: body }}>5 min read</div>
      </div>
    )
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="text-base md:text-lg font-bold text-vault-text-bright" style={{ fontFamily: heading }}>
        <span
          contentEditable
          suppressContentEditableWarning
          className={editableClass}
          onBlur={(e) => onTextChange('dashboard', 'heading', e.currentTarget.textContent || '')}
        >
          {getText('dashboard', 'heading', 'Dashboard')}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-3 md:p-4 rounded-xl bg-[rgba(255,255,255,0.03)]">
            <div className="text-[10px] md:text-xs text-[#888]" style={{ fontFamily: body }}>Revenue</div>
            <div className="text-base md:text-xl font-bold text-vault-text-bright mt-1" style={{ fontFamily: heading }}>
              ${(i * 1234).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
