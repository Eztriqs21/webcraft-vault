import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CREDITS = [
  { label: 'Built with', value: 'React + Vite + TypeScript + Tailwind CSS v4' },
  { label: 'Animation', value: 'Framer Motion + GSAP ScrollTrigger' },
  { label: 'Smooth Scroll', value: 'Lenis' },
  { label: 'Syntax Highlighting', value: 'Shiki' },
  { label: '3D Graphics', value: 'Three.js (WebGL Image Distortion)' },
  { label: 'Fonts', value: 'Clash Display + Inter + JetBrains Mono' },
  { label: 'Inspiration', value: 'Apple, Awwwards, and avant-garde art galleries' },
  { label: 'Philosophy', value: 'Every pixel must justify a design award' },
  { label: '', value: '' },
  { label: 'Built for designers', value: 'who refuse to ship boring' },
]

export function CreditsFooter() {
  return (
    <footer className="relative py-32 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Starfield />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-12">
            {CREDITS.map((credit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {credit.label && (
                  <div className="text-xs text-[#888] font-mono uppercase tracking-[0.3em] mb-2">
                    {credit.label}
                  </div>
                )}
                <div className="font-display text-xl md:text-2xl text-vault-text-bright">
                  {credit.value}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 pt-12 border-t border-[rgba(255,255,255,0.06)]"
          >
            <div className="text-xs text-[#888] font-mono">
              WebCraft Vault — An immersive exhibition of award-winning web design
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.0005 + 0.0002,
      brightness: Math.random(),
    }))

    let raf: number
    let cachedW = 0
    let cachedH = 0

    const animate = () => {
      const newW = canvas.offsetWidth
      const newH = canvas.offsetHeight
      if (newW !== cachedW || newH !== cachedH) {
        cachedW = newW
        cachedH = newH
        canvas.width = newW
        canvas.height = newH
      }

      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.y -= star.speed
        if (star.y < 0) {
          star.y = 1
          star.x = Math.random()
        }

        star.brightness += (Math.random() - 0.5) * 0.02
        star.brightness = Math.max(0.3, Math.min(1, star.brightness))

        ctx.beginPath()
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.5})`
        ctx.fill()
      })

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
