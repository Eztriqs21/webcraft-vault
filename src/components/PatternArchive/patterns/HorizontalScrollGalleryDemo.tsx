import { useRef } from 'react'

const items = [1, 2, 3, 4, 5]

export function HorizontalScrollGalleryDemo({ isExpanded }: { isExpanded: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}
      role="group"
      aria-label="Horizontal scroll gallery with snap points"
    >
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory h-full pb-2 hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((n) => (
          <div
            key={n}
            className={`flex-shrink-0 snap-center rounded-xl flex items-center justify-center text-xs font-medium text-[#888] transition-all duration-200 hover:bg-[rgba(6,182,212,0.12)] ${
              isExpanded ? 'w-44 p-4' : 'w-16 p-2'
            }`}
            style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.08)' }}
          >
            {isExpanded ? `Slide ${n}` : ''}
          </div>
        ))}
      </div>
    </div>
  )
}
