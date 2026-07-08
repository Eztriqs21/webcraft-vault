import React, { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ANIMATIONS } from '../../data/animations'

gsap.registerPlugin(ScrollTrigger)

export function TheaterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewingCode, setViewingCode] = useState<number | null>(null)
  const [highlightedCode, setHighlightedCode] = useState<string>('')

  useLayoutEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        x: () => -(inner.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: container,
          scrub: 1,
          anticipatePin: 1,
          end: () => `+=${inner.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress
            const index = Math.round(progress * (ANIMATIONS.length - 1))
            setActiveIndex(Math.min(index, ANIMATIONS.length - 1))
          },
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  const handleViewCode = async (id: number) => {
    if (viewingCode === id) {
      setViewingCode(null)
      return
    }

    const anim = ANIMATIONS.find((a) => a.id === id)
    if (!anim) return

    setViewingCode(id)
    try {
      const { getHighlighter } = await import('../../lib/shiki')
      const highlighter = await getHighlighter()
      const html = highlighter.codeToHtml(anim.code, {
        lang: 'typescript',
        theme: 'dark-plus',
      })
      setViewingCode((current) => {
        if (current === id) setHighlightedCode(html)
        return current
      })
    } catch {
      setViewingCode((current) => {
        if (current === id) setHighlightedCode(`<pre>${anim.code}</pre>`)
        return current
      })
    }
  }

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
          Animation Theater
        </h2>
        <p className="text-[#666] text-lg max-w-xl mb-2">
          32 living, breathing animations. Each one real, interactive, and ready to ship.
        </p>
        <p className="text-[#444] text-sm font-mono">
          Frame {activeIndex + 1} / {ANIMATIONS.length}
        </p>
      </div>

      <div ref={containerRef} className="relative overflow-hidden" style={{ height: '400vh' }}>
        <div
          ref={innerRef}
          className="flex items-center h-screen gap-6 px-4 md:px-8"
          style={{ width: 'fit-content' }}
        >
          {ANIMATIONS.map((anim, index) => (
            <TheaterFrame
              key={anim.id}
              animation={anim}
              animationId={anim.id}
              isActive={index === activeIndex}
              isViewingCode={viewingCode === anim.id}
              highlightedCode={highlightedCode}
              onViewCode={handleViewCode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const TheaterFrame = React.memo(function TheaterFrame({
  animation,
  animationId,
  isActive,
  isViewingCode,
  highlightedCode,
  onViewCode,
}: {
  animation: (typeof ANIMATIONS)[0]
  animationId: number
  isActive: boolean
  isViewingCode: boolean
  highlightedCode: string
  onViewCode: (id: number) => void
}) {
  const AnimComponent = animation.component

  return (
    <div
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-vault-bg flex flex-col md:flex-row snap-center"
      style={{
        boxShadow: isActive
          ? '0 0 40px rgba(244,63,94,0.1), 0 20px 60px rgba(0,0,0,0.5)'
          : '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[rgba(3,3,3,0.6)] min-h-[200px]">
        <AnimComponent />
      </div>

      <div className="w-full md:w-[35%] p-4 md:p-6 border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.06)] flex flex-col">
        <h3 className="font-display text-lg md:text-2xl font-bold text-vault-text-bright mb-1 md:mb-2">
          {animation.name}
        </h3>
        <p className="text-[#666] text-xs md:text-sm mb-2 md:mb-3">{animation.mood}</p>
        <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
          {animation.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-[rgba(244,63,94,0.1)] text-[#fb7185] border border-[rgba(244,63,94,0.2)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => onViewCode(animationId)}
          className="mt-auto px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)] hover:text-vault-text-bright transition-all self-start"
          data-cursor="pointer"
        >
          {isViewingCode ? 'Hide Source' : 'View Source'}
        </button>
      </div>

      {isViewingCode && (
        <div className="absolute inset-x-0 bottom-0 h-[45%] md:h-[40%] border-t border-[rgba(255,255,255,0.06)] bg-[rgba(3,3,3,0.95)] overflow-auto z-10">
          {highlightedCode ? (
            <div
              className="p-4 md:p-6 text-xs md:text-sm font-mono [&>pre]:bg-transparent [&>pre]:p-0"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <pre className="p-4 md:p-6 text-xs md:text-sm font-mono text-[#666]">
              {animation.code}
            </pre>
          )}
        </div>
      )}
    </div>
  )
})
