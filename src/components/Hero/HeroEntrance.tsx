import { useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ParallaxLetters } from './ParallaxLetters'
import { useLenis } from '../Global/SmoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CAPABILITIES = [
  {
    label: 'Motion',
    description: '32 real animations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <animate attributeName="d" values="M10 2L18 10L10 18L2 10L10 2Z;M10 4L16 10L10 16L4 10L10 4Z;M10 2L18 10L10 18L2 10L10 2Z" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
    ),
    accent: '#6366f1',
  },
  {
    label: 'Typography',
    description: '50 font pairings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <text x="3" y="15" fontFamily="serif" fontSize="14" fontWeight="bold" fill="currentColor">Aa</text>
      </svg>
    ),
    accent: '#10b981',
  },
  {
    label: 'Color',
    description: '15 curated palettes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5">
          <animate attributeName="r" values="6;8;6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    accent: '#f43f5e',
  },
  {
    label: 'Patterns',
    description: '10 UI patterns',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    accent: '#fbbf24',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export function HeroEntrance() {
  const heroRef = useRef<HTMLElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const lenis = useLenis()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    return () => {
      tlRef.current?.kill()
    }
  }, [])

  const handleEnter = useCallback(() => {
    const hero = heroRef.current
    if (!hero) return

    tlRef.current?.kill()

    if (prefersReducedMotion) {
      const target = document.querySelector('[data-section="theater"]') as HTMLElement | null
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -20 })
      }
      return
    }

    const tl = gsap.timeline()
    tlRef.current = tl

    tl.to(hero, {
      scale: 1.1,
      filter: 'blur(8px)',
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(hero, { scale: 1, filter: 'none', opacity: 1 })
      },
    })

    const target = document.querySelector('[data-section="theater"]') as HTMLElement | null
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -20 })
    }
  }, [lenis, prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <ParallaxLetters />

        <motion.p
          className="text-center text-vault-text text-base md:text-xl font-light mt-6 md:mt-8 mb-8 md:mb-12 max-w-2xl mx-auto px-2"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.8 }}
        >
          A curated exhibition of the ingredients that make websites unforgettable.
          Every animation, every pairing, every palette — real and interactive.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate="visible"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.label}
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="group relative flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl border border-vault-border bg-vault-surface/50 backdrop-blur-sm cursor-default transition-colors duration-300"
              style={{ ['--cap-accent' as string]: cap.accent }}
              data-cursor="pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cap.accent + '60'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ''
              }}
            >
              <div className="text-vault-text transition-colors duration-300 group-hover:text-vault-text-bright">
                {cap.icon}
              </div>
              <div className="text-center">
                <div className="font-display text-sm md:text-base text-vault-text-bright font-semibold">
                  {cap.label}
                </div>
                <div className="text-[11px] md:text-xs text-vault-text mt-0.5">
                  {cap.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-10 md:mt-16"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.8 }}
        >
          <button
            onClick={handleEnter}
            className="group relative px-6 md:px-8 py-3 md:py-4 font-display text-base md:text-lg text-vault-text-bright tracking-wide"
            data-cursor="pointer"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              Enter the Vault
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              )}
              {prefersReducedMotion && <span>→</span>}
            </span>
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[rgba(99,102,241,0.3)]"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(99,102,241,0.1)',
                    '0 0 40px rgba(99,102,241,0.2)',
                    '0 0 20px rgba(99,102,241,0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #030303, transparent)',
        }}
      />
    </section>
  )
}
