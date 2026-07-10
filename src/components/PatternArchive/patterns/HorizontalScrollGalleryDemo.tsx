import { useRef, useEffect } from 'react'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function HorizontalScrollGalleryDemo({ isExpanded }: { isExpanded: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  return (
    <div
      className={`${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'} relative`}
      role="group"
      aria-label="Horizontal scroll gallery with snap points"
    >
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory h-full pb-2 hide-scrollbar px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((n) => (
          <div
            key={n}
            className={`flex-shrink-0 snap-center rounded-xl flex items-center justify-center text-xs font-medium text-[#888] transition-all duration-200 hover:bg-[rgba(6,182,212,0.12)] ${
              isExpanded ? 'w-44 p-4' : 'w-20 p-2'
            }`}
            style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.08)' }}
          >
            {isExpanded ? `Slide ${n}` : n}
          </div>
        ))}
      </div>
      {isExpanded && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-[#666] font-mono bg-[rgba(3,3,3,0.8)] px-2 py-1 rounded">
          Scroll &rarr;
        </div>
      )}
    </div>
  )
}
