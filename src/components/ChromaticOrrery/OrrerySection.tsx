import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PALETTES } from '../../data/palettes'
import { copyToClipboard, showToast } from '../../utils/clipboard'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getWCAGRating(ratio: number): string {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA18'
  return 'Fail'
}

export function OrrerySection() {
  const [activePalette, setActivePalette] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const handlePlanetClick = (index: number) => {
    setActivePalette((prev) => (prev === index ? null : index))
  }

  const handleCopyCSS = useCallback((palette: { name: string; colors: readonly string[] }) => {
    const css = `:root {\n${palette.colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`
    navigator.clipboard.writeText(css).catch(() => {})
    showToast(`Copied ${palette.name} as CSS variables`)
  }, [])

  return (
    <section className="relative py-24 min-h-screen overflow-hidden" id="chromatic-orrery" aria-labelledby="orrery-heading">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 id="orrery-heading" className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Chromatic Orrery
          </h2>
          <p className="text-[#888] text-lg max-w-xl">
            15 color palettes orbiting in space. Click to explore. Click a color to copy.
          </p>
        </motion.div>

        {/* Desktop: 3D orbital layout */}
        <div className="hidden md:block">
          <div className="relative min-h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-square">
              {PALETTES.map((palette, i) => {
                const angle = (i / PALETTES.length) * Math.PI * 2
                const radius = 35
                const x = 50 + Math.cos(angle) * radius
                const y = 50 + Math.sin(angle) * radius

                return (
                  <motion.div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    whileHover={{ scale: 1.3, zIndex: 10 }}
                    animate={
                      activePalette === i
                        ? { scale: 1.5, zIndex: 20 }
                        : { scale: 1, zIndex: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={() => handlePlanetClick(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${palette.name} color palette`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlanetClick(i) } }}
                    data-cursor="pointer"
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${palette.colors[1]}, ${palette.colors[0]})`,
                        boxShadow: `0 0 30px ${palette.colors[1]}40, 0 0 60px ${palette.colors[1]}20`,
                      }}
                    />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-[#888] font-mono">
                      {palette.name}
                    </div>
                  </motion.div>
                )
              })}

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 hide-scrollbar" aria-label="Color palettes carousel">
            {PALETTES.map((palette, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[75vw] snap-center"
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={`${palette.name} color palette`}
                  className="cursor-pointer rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)]"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePlanetClick(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlanetClick(i) } }}
                >
                  <div
                    className="w-full aspect-square rounded-xl mb-4 shadow-lg"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${palette.colors[1]}, ${palette.colors[0]})`,
                      boxShadow: `0 0 30px ${palette.colors[1]}40`,
                    }}
                  />
                  <div className="text-sm font-mono text-[#888]">{palette.name}</div>
                  <div className="flex gap-1 mt-3">
                    {palette.colors.map((c, ci) => (
                      <div
                        key={ci}
                        className="w-6 h-6 rounded-md"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-2">
            <span className="text-[10px] text-[#666] swipe-hint">Swipe to explore</span>
            <span className="text-[10px] text-[#666] swipe-hint">&rarr;</span>
          </div>
        </div>

        <AnimatePresence>
          {activePalette !== null && PALETTES[activePalette] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] backdrop-blur-sm p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-vault-text-bright">
                  {PALETTES[activePalette].name}
                </h3>
                <button
                  onClick={() => handleCopyCSS(PALETTES[activePalette])}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(168,85,247,0.15)] hover:text-[#a855f7] transition-all"
                  data-cursor="pointer"
                >
                  Copy CSS
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 md:gap-4 mb-4">
                {PALETTES[activePalette].colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      copyToClipboard(color)
                      showToast(`Copied ${color}`)
                    }}
                    aria-label={`Copy color ${color}`}
                    className="group"
                    data-cursor="pointer"
                  >
                    <div
                      className="h-16 md:h-24 rounded-xl mb-2 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] md:text-xs font-mono text-[#888] group-hover:text-[#999]">
                      {color}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {PALETTES[activePalette].colors.slice(0, -1).map((color, i) => {
                  const bg = PALETTES[activePalette].colors[PALETTES[activePalette].colors.length - 1]
                  const ratio = getContrastRatio(color, bg)
                  const rating = getWCAGRating(ratio)
                  return (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className="text-[#888]">{color.slice(1).toUpperCase()}</span>
                      <span className="text-[#666]">on</span>
                      <span className="text-[#888]">{bg.slice(1).toUpperCase()}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        rating === 'AAA' ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981]'
                        : rating === 'AA' ? 'bg-[rgba(16,185,129,0.1)] text-[#10b981]'
                        : rating === 'AA18' ? 'bg-[rgba(251,191,36,0.15)] text-[#fbbf24]'
                        : 'bg-[rgba(239,68,68,0.15)] text-[#ef4444]'
                      }`}>
                        {rating} {ratio.toFixed(1)}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 md:p-6 rounded-xl bg-[rgba(255,255,255,0.02)]">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="col-span-2 space-y-3">
                    <div className="h-8 rounded-lg" style={{ backgroundColor: PALETTES[activePalette].colors[3] }}>
                      <div className="px-4 h-full flex items-center">
                        <div className="w-32 h-3 rounded" style={{ backgroundColor: PALETTES[activePalette].colors[1] }} />
                      </div>
                    </div>
                    <div className="h-20 rounded-lg" style={{ backgroundColor: PALETTES[activePalette].colors[4] }}>
                      <div className="p-4">
                        <div className="w-3/4 h-3 rounded mb-2" style={{ backgroundColor: PALETTES[activePalette].colors[3] }} />
                        <div className="w-1/2 h-3 rounded" style={{ backgroundColor: PALETTES[activePalette].colors[2] }} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-24 rounded-lg" style={{ backgroundColor: PALETTES[activePalette].colors[1] }} />
                    <div className="h-12 rounded-lg" style={{ backgroundColor: PALETTES[activePalette].colors[2] }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
