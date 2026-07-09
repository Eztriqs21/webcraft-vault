import { useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ParallaxLetters } from './ParallaxLetters'
import { PreviewRiver } from './PreviewRiver'
import { useLenis } from '../Global/SmoothScroll'

export function HeroEntrance() {
  const heroRef = useRef<HTMLElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const lenis = useLenis()

  useEffect(() => {
    return () => {
      tlRef.current?.kill()
    }
  }, [])

  const handleEnter = useCallback(() => {
    const hero = heroRef.current
    if (!hero) return

    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    tl.to(hero, {
      scale: 1.1,
      filter: 'blur(8px)',
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
    })

    tl.call(() => {
      const target = document.querySelector('[data-section="theater"]') as HTMLElement | null
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -20 })
      }
      gsap.set(hero, { scale: 1, filter: 'none', opacity: 1 })
    }, undefined, 0.9)
  }, [lenis])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <ParallaxLetters />

        <motion.p
          className="text-center text-[#888] text-base md:text-xl font-light mt-6 md:mt-8 mb-8 md:mb-12 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          A curated exhibition of the ingredients that make websites unforgettable.
          Every animation, every pairing, every palette — real and interactive.
        </motion.p>

        <PreviewRiver />

        <motion.div
          className="flex justify-center mt-10 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button
            onClick={handleEnter}
            className="group relative px-6 md:px-8 py-3 md:py-4 font-display text-base md:text-lg text-vault-text-bright tracking-wide"
            data-cursor="pointer"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              Enter the Vault
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
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
