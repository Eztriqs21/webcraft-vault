import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TOOLS, TOOL_CONNECTIONS } from '../../data/tools'

export function ToolBeltSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredTool, setHoveredTool] = useState<number | null>(null)
  const [positions] = useState(
    TOOLS.map((t) => ({ x: t.x, y: t.y, vx: 0, vy: 0 }))
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number

    const animate = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      TOOL_CONNECTIONS.forEach(([a, b]) => {
        const pa = positions[a]
        const pb = positions[b]
        if (!pa || !pb) return

        ctx.beginPath()
        ctx.moveTo(pa.x * canvas.width, pa.y * canvas.height)
        ctx.lineTo(pb.x * canvas.width, pb.y * canvas.height)
        ctx.strokeStyle = hoveredTool === a || hoveredTool === b
          ? 'rgba(251, 191, 36, 0.3)'
          : 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [positions, hoveredTool])

  return (
    <section className="relative py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            The Tool Belt
          </h2>
          <p className="text-[#666] text-lg max-w-xl">
            The tools, libraries, and inspiration sources that power award-winning websites.
          </p>
        </motion.div>

        {/* Desktop: force graph */}
        <div className="hidden md:block">
          <div className="relative w-full aspect-[2/1] min-h-[500px]">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />

            {TOOLS.map((tool, i) => {
              const pos = positions[i]
              return (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  whileHover={{ scale: 1.15 }}
                  onMouseEnter={() => setHoveredTool(i)}
                  onMouseLeave={() => setHoveredTool(null)}
                  onClick={() => window.open(tool.url, '_blank')}
                  data-cursor="pointer"
                >
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold border transition-all duration-300"
                      style={{
                        backgroundColor: hoveredTool === i
                          ? 'rgba(251, 191, 36, 0.15)'
                          : 'rgba(10, 10, 10, 0.8)',
                        borderColor: hoveredTool === i
                          ? 'rgba(251, 191, 36, 0.3)'
                          : 'rgba(255, 255, 255, 0.06)',
                        color: hoveredTool === i ? '#fbbf24' : '#999',
                        boxShadow: hoveredTool === i
                          ? '0 0 30px rgba(251, 191, 36, 0.2)'
                          : 'none',
                      }}
                    >
                      {tool.name.slice(0, 2)}
                    </div>

                    {hoveredTool === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 p-3 rounded-xl bg-[rgba(10,10,10,0.95)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl shadow-xl z-50"
                      >
                        <div className="text-xs font-bold text-vault-text-bright mb-1">{tool.name}</div>
                        <div className="text-[10px] text-[#666] leading-relaxed">{tool.description}</div>
                        <div className="mt-2 text-[10px] text-[#fbbf24] font-mono">{tool.category}</div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: card list */}
        <div className="md:hidden space-y-3">
          {TOOLS.map((tool, i) => (
            <motion.a
              key={i}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] hover:border-[rgba(251,191,36,0.2)] transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold bg-[rgba(10,10,10,0.8)] border border-[rgba(255,255,255,0.06)] text-[#999]">
                {tool.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-vault-text-bright">{tool.name}</div>
                <div className="text-xs text-[#666] truncate">{tool.description}</div>
              </div>
              <div className="text-[10px] text-[#fbbf24] font-mono">{tool.category}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
