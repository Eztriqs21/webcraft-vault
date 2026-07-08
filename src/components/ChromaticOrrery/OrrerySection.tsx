import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PALETTES } from '../../data/palettes'
import { copyToClipboard, showToast } from '../../utils/clipboard'

export function OrrerySection() {
  const [activePalette, setActivePalette] = useState<number | null>(null)

  const handlePlanetClick = (index: number) => {
    setActivePalette((prev) => (prev === index ? null : index))
  }

  return (
    <section className="relative py-24 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
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
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
            {PALETTES.map((palette, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[75vw] snap-center"
              >
                <motion.div
                  className="cursor-pointer rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)]"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePlanetClick(i)}
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
        </div>

        <AnimatePresence>
          {activePalette !== null && PALETTES[activePalette] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] backdrop-blur-sm p-6 md:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-vault-text-bright mb-6">
                {PALETTES[activePalette].name}
              </h3>

              <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
                {PALETTES[activePalette].colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      copyToClipboard(color)
                      showToast(`Copied ${color}`)
                    }}
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
