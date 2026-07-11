import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FONT_PAIRINGS, loadFont } from '../../data/fonts'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CONTEXTS = ['hero', 'product', 'blog', 'dashboard', 'landing', 'testimonial', 'email', 'resume'] as const

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function TypographySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [context, setContext] = useState<(typeof CONTEXTS)[number]>('hero')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
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
              <p className="text-vault-text text-lg max-w-xl">
                50 curated font pairings. Live-updating editorial canvas. Find the perfect voice.
              </p>
            </div>
            <button
              onClick={handleShuffle}
              className="self-start px-4 py-2 text-sm font-medium rounded-lg bg-vault-surface text-vault-text hover:bg-accent-typography/15 hover:text-accent-typography focus-visible:ring-2 focus-visible:ring-accent-typography focus-visible:ring-offset-2 focus-visible:ring-offset-vault-bg transition-all"
              data-cursor="pointer"
            >
              Shuffle
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 min-h-[70vh]">
          {/* Mobile: sticky top preview */}
          <div className="md:hidden sticky top-0 z-10 bg-vault-bg/80 backdrop-blur-xl -mx-4 px-4 py-4 border-b border-vault-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${context}`}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-vault-border bg-vault-surface/60 p-4 overflow-hidden"
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
                      ? 'bg-accent-typography/15 text-accent-typography'
                      : 'bg-vault-surface text-vault-text'
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
                className="rounded-2xl border border-vault-border bg-vault-surface/60 backdrop-blur-sm p-8 overflow-hidden min-h-[500px]"
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
                      ? 'bg-accent-typography/15 text-accent-typography'
                      : 'bg-vault-surface text-vault-text hover:text-vault-text-bright'
                  }`}
                  data-cursor="pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Font pairing cards — vertical grid */}
          <div className="w-full md:w-1/2 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {FONT_PAIRINGS.map((pairing, i) => (
                <motion.button
                  key={i}
                  custom={prefersReducedMotion ? 0 : i}
                  variants={prefersReducedMotion ? undefined : cardVariants}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  onClick={() => {
                    setActiveIndex(i)
                    loadFont(pairing.heading)
                    loadFont(pairing.body)
                  }}
                  className={`group relative text-left p-4 md:p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                    i === activeIndex
                      ? 'border-accent-typography/30 bg-accent-typography/5'
                      : 'border-vault-border bg-vault-surface/40 hover:border-vault-border hover:bg-vault-surface/70'
                  }`}
                  data-cursor="pointer"
                >
                  <div className="space-y-2">
                    <div
                      className="text-vault-text-bright font-semibold text-base md:text-lg leading-tight truncate"
                      style={{ fontFamily: pairing.heading }}
                    >
                      {pairing.heading}
                    </div>
                    <div
                      className="text-vault-text text-sm truncate"
                      style={{ fontFamily: pairing.body }}
                    >
                      {pairing.body}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-vault-border">
                    <span className="text-[11px] text-vault-text font-mono">{pairing.personality}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyCSS(pairing, i)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-[10px] font-mono rounded bg-vault-surface text-vault-text hover:text-accent-typography"
                      data-cursor="pointer"
                    >
                      {copiedIndex === i ? 'Copied!' : 'Copy CSS'}
                    </button>
                  </div>
                  {i === activeIndex && (
                    <div className="absolute inset-0 rounded-xl border-2 border-accent-typography/20 pointer-events-none" />
                  )}
                </motion.button>
              ))}
            </div>
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
  const editableClass = 'outline-none rounded px-1 -mx-1 transition-colors hover:bg-vault-surface focus:bg-vault-surface cursor-text'

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
        <div className="text-sm md:text-lg text-vault-text" style={{ fontFamily: body }}>
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
          <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-accent-typography text-white text-xs md:text-sm font-medium" style={{ fontFamily: body }}>
            Get Started
          </div>
          <div className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-vault-border text-vault-text text-xs md:text-sm" style={{ fontFamily: body }}>
            Learn More
          </div>
        </div>
      </div>
    )
  }

  if (context === 'product') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="w-full h-24 md:h-40 rounded-xl bg-vault-surface" />
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
        <div className="text-xs md:text-base text-vault-text" style={{ fontFamily: body }}>
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
          <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-accent-typography text-white text-xs md:text-sm" style={{ fontFamily: body }}>
            Add to Cart
          </div>
        </div>
      </div>
    )
  }

  if (context === 'blog') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="text-[10px] md:text-xs text-vault-text font-mono">JULY 5, 2026</div>
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
        <div className="text-xs md:text-base text-vault-text leading-relaxed" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('blog', 'body', e.currentTarget.textContent || '')}
          >
            {getText('blog', 'body', 'As design tools evolve, so must our approach to building scalable, maintainable systems. The intersection of code and creativity is where the magic happens.')}
          </span>
        </div>
        <div className="text-[10px] md:text-sm text-vault-text" style={{ fontFamily: body }}>5 min read</div>
      </div>
    )
  }

  if (context === 'landing') {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="text-[10px] md:text-xs text-vault-text font-mono">PRICING</div>
        <div className="text-xl md:text-3xl font-bold text-vault-text-bright leading-tight" style={{ fontFamily: heading }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('landing', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('landing', 'heading', 'Simple, transparent pricing')}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {['Free', 'Pro', 'Team'].map((tier, i) => (
            <div key={tier} className={`p-3 md:p-4 rounded-xl ${i === 1 ? 'bg-accent-typography/10 border border-accent-typography/20' : 'bg-vault-surface'}`}>
              <div className="text-xs text-vault-text mb-1" style={{ fontFamily: body }}>{tier}</div>
              <div className="text-lg md:text-xl font-bold text-vault-text-bright" style={{ fontFamily: heading }}>${[0, 29, 99][i]}/mo</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (context === 'testimonial') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="text-3xl md:text-5xl text-vault-border leading-none" style={{ fontFamily: heading }}>&ldquo;</div>
        <div className="text-base md:text-xl text-vault-text-bright leading-relaxed italic" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('testimonial', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('testimonial', 'heading', 'This font pairing completely transformed how our brand is perceived. The results speak for themselves.')}
          </span>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-vault-surface" />
          <div>
            <div className="text-xs font-bold text-vault-text-bright" style={{ fontFamily: heading }}>Sarah Chen</div>
            <div className="text-[10px] text-vault-text" style={{ fontFamily: body }}>Design Director, Acme</div>
          </div>
        </div>
      </div>
    )
  }

  if (context === 'email') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="text-xs text-vault-text font-mono">FROM:hello@acme.com</div>
        <div className="text-lg md:text-2xl font-bold text-vault-text-bright" style={{ fontFamily: heading }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('email', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('email', 'heading', 'Your weekly design digest')}
          </span>
        </div>
        <div className="text-xs md:text-sm text-vault-text leading-relaxed" style={{ fontFamily: body }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('email', 'body', e.currentTarget.textContent || '')}
          >
            {getText('email', 'body', 'Hi there, here are this week\'s top design trends and resources curated just for you.')}
          </span>
        </div>
        <div className="inline-block px-4 py-2 rounded-lg bg-accent-typography text-white text-xs" style={{ fontFamily: body }}>Read More</div>
      </div>
    )
  }

  if (context === 'resume') {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="text-lg md:text-2xl font-bold text-vault-text-bright" style={{ fontFamily: heading }}>
          <span
            contentEditable
            suppressContentEditableWarning
            className={editableClass}
            onBlur={(e) => onTextChange('resume', 'heading', e.currentTarget.textContent || '')}
          >
            {getText('resume', 'heading', 'Alex Rivera')}
          </span>
        </div>
        <div className="text-[10px] md:text-xs text-vault-text font-mono">SENIOR PRODUCT DESIGNER</div>
        <div className="space-y-2">
          {['Lead redesign of SaaS dashboard — 40% increase in engagement', 'Built and mentored a team of 5 designers', 'Shipped 12 major features in 18 months'].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[10px] md:text-xs text-vault-text" style={{ fontFamily: body }}>
              <span className="text-accent-typography mt-0.5">&#x2022;</span>
              {item}
            </div>
          ))}
        </div>
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
          <div key={i} className="p-3 md:p-4 rounded-xl bg-vault-surface">
            <div className="text-[10px] md:text-xs text-vault-text" style={{ fontFamily: body }}>Revenue</div>
            <div className="text-base md:text-xl font-bold text-vault-text-bright mt-1" style={{ fontFamily: heading }}>
              ${(i * 1234).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
