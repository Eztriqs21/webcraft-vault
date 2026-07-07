import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TOOLS, TOOL_CONNECTIONS } from '../../data/tools'

const MAX_VELOCITY = 15
const REPULSION = 8000
const CENTER_GRAVITY = 0.01
const DAMPING = 0.85
const SLEEP_THRESHOLD = 0.1

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  asleep: boolean
}

export function ToolBeltSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>(
    TOOLS.map((t) => ({ x: t.x, y: t.y, vx: 0, vy: 0, asleep: false }))
  )
  const [hoveredTool, setHoveredTool] = useState<number | null>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    TOOLS.map((t) => ({ x: t.x, y: t.y }))
  )
  const draggingRef = useRef<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || isMobile) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    const nodes = nodesRef.current
    const centerX = 0.5
    const centerY = 0.5

    for (let i = 0; i < nodes.length; i++) {
      if (draggingRef.current === i) continue

      let fx = (centerX - nodes[i].x) * CENTER_GRAVITY
      let fy = (centerY - nodes[i].y) * CENTER_GRAVITY

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distSq = dx * dx + dy * dy + 0.001
        const dist = Math.sqrt(distSq)
        const force = REPULSION / (distSq * 1000)
        fx += (dx / dist) * force
        fy += (dy / dist) * force
      }

      for (const [a, b] of TOOL_CONNECTIONS) {
        if (a === i || b === i) {
          const other = a === i ? b : a
          const dx = nodes[other].x - nodes[i].x
          const dy = nodes[other].y - nodes[i].y
          fx += dx * 0.002
          fy += dy * 0.002
        }
      }

      nodes[i].vx = (nodes[i].vx + fx) * DAMPING
      nodes[i].vy = (nodes[i].vy + fy) * DAMPING

      const speed = Math.hypot(nodes[i].vx, nodes[i].vy)
      if (speed > MAX_VELOCITY) {
        nodes[i].vx = (nodes[i].vx / speed) * MAX_VELOCITY
        nodes[i].vy = (nodes[i].vy / speed) * MAX_VELOCITY
      }

      nodes[i].x += nodes[i].vx
      nodes[i].y += nodes[i].vy

      nodes[i].x = Math.max(0.05, Math.min(0.95, nodes[i].x))
      nodes[i].y = Math.max(0.05, Math.min(0.95, nodes[i].y))

      nodes[i].asleep = speed < SLEEP_THRESHOLD
    }

    TOOL_CONNECTIONS.forEach(([a, b]) => {
      const pa = nodes[a]
      const pb = nodes[b]
      ctx.beginPath()
      ctx.moveTo(pa.x * w, pa.y * h)
      ctx.lineTo(pb.x * w, pb.y * h)
      ctx.strokeStyle = hoveredTool === a || hoveredTool === b
        ? 'rgba(251, 191, 36, 0.3)'
        : 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    setPositions(nodes.map((n) => ({ x: n.x, y: n.y })))

    requestAnimationFrame(animate)
  }, [hoveredTool, isMobile])

  useEffect(() => {
    if (isMobile) return
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [animate, isMobile])

  const handlePointerDown = useCallback((i: number, e: React.PointerEvent) => {
    draggingRef.current = i
    const nodes = nodesRef.current
    nodes[i].vx = 0
    nodes[i].vy = 0
    nodes[i].asleep = false
    const rect = (e.target as HTMLElement).closest('[data-canvas]')?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX / rect.width - nodes[i].x,
        y: e.clientY / rect.height - nodes[i].y,
      }
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (draggingRef.current === null) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const node = nodesRef.current[draggingRef.current]
    node.x = x - dragOffset.current.x
    node.y = y - dragOffset.current.y
    node.x = Math.max(0.05, Math.min(0.95, node.x))
    node.y = Math.max(0.05, Math.min(0.95, node.y))
    node.vx = 0
    node.vy = 0
  }, [])

  const handlePointerUp = useCallback(() => {
    draggingRef.current = null
  }, [])

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
        {!isMobile && (
          <div className="relative w-full aspect-[2/1] min-h-[500px]" data-canvas>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />

            {TOOLS.map((tool, i) => {
              const pos = positions[i]
              return (
                <motion.div
                  key={i}
                  className="absolute cursor-grab active:cursor-grabbing touch-none"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'left, top',
                  }}
                  onPointerDown={(e) => handlePointerDown(i, e)}
                  onMouseEnter={() => setHoveredTool(i)}
                  onMouseLeave={() => setHoveredTool(null)}
                  onClick={() => {
                    if (draggingRef.current === null) {
                      window.open(tool.url, '_blank')
                    }
                  }}
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 p-3 rounded-xl bg-[rgba(10,10,10,0.95)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl shadow-xl z-50 pointer-events-none"
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
        )}

        {/* Mobile: card list */}
        {isMobile && (
          <div className="space-y-3">
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
        )}
      </div>
    </section>
  )
}
