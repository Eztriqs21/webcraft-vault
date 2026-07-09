import { useState } from 'react'

const cells = [
  { col: 'col-span-2', row: 'row-span-2', label: 'Featured' },
  { col: '', row: '', label: 'Card' },
  { col: '', row: '', label: 'Card' },
  { col: '', row: '', label: 'Card' },
  { col: 'col-span-2', row: '', label: 'Wide' },
  { col: 'col-span-2', row: '', label: 'Wide' },
]

export function BentoGridDemo({ isExpanded }: { isExpanded: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div
      className={`grid grid-cols-3 gap-2 ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      role="group"
      aria-label="Bento grid layout demo with hover effects"
    >
      {cells.map((cell, i) => (
        <button
          key={i}
          className={`${cell.col} ${cell.row} rounded-xl transition-all duration-200 flex items-center justify-center text-xs font-medium ${
            hovered === i
              ? 'bg-[rgba(6,182,212,0.2)] border border-[rgba(6,182,212,0.3)] shadow-[0_0_20px_rgba(6,182,212,0.15)]'
              : 'bg-[rgba(6,182,212,0.06)] border border-[rgba(6,182,212,0.08)]'
          } ${isExpanded ? 'text-[#bbb]' : 'text-[#888]'}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          data-cursor="pointer"
        >
          {isExpanded ? cell.label : ''}
        </button>
      ))}
    </div>
  )
}
