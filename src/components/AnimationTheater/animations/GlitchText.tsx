import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export function GlitchText() {
  const ref = useRef<HTMLDivElement>(null)
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return

    let interval: ReturnType<typeof setInterval>

    const glitch = () => {
      el.classList.add('glitching')
      if (tRef.current) clearTimeout(tRef.current)
      tRef.current = setTimeout(() => el.classList.remove('glitching'), 200)
    }

    interval = setInterval(glitch, 3000)
    return () => {
      clearInterval(interval)
      if (tRef.current) clearTimeout(tRef.current)
    }
  }, [prefersReducedMotion])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={ref}
        className="relative text-4xl md:text-5xl font-bold text-vault-text-bright select-none cursor-pointer"
        style={{ fontFamily: 'monospace' }}
        data-cursor="pointer"
      >
        <span>GLITCH</span>
        <span
          className="absolute inset-0 text-red-500 opacity-0"
          style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-2px, 0)' }}
          aria-hidden="true"
        >
          GLITCH
        </span>
        <span
          className="absolute inset-0 text-cyan-400 opacity-0"
          style={{ clipPath: 'inset(50% 0 20% 0)', transform: 'translate(2px, 0)' }}
          aria-hidden="true"
        >
          GLITCH
        </span>
      </div>
    </div>
  )
}
