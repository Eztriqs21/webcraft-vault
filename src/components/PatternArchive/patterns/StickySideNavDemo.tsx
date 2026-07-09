import { useState } from 'react'

const sections = ['Overview', 'Features', 'Pricing', 'FAQ']

export function StickySideNavDemo({ isExpanded }: { isExpanded: boolean }) {
  const [active, setActive] = useState(0)

  return (
    <div
      className={`flex gap-2 ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      role="group"
      aria-label="Sticky side navigation with active state tracking"
    >
      <nav
        className={`${isExpanded ? 'w-20' : 'w-8'} rounded-lg flex flex-col ${isExpanded ? 'gap-1.5 pt-3 px-2' : 'gap-1 pt-2 px-1'}`}
        style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.08)' }}
        aria-label="Demo navigation"
      >
        {sections.map((section, i) => (
          <button
            key={section}
            onClick={() => setActive(i)}
            className={`rounded text-left transition-all duration-200 ${
              isExpanded ? 'h-2 w-full' : 'h-1 w-full'
            } ${active === i ? 'bg-[rgba(6,182,212,0.3)]' : 'bg-[rgba(6,182,212,0.08)] hover:bg-[rgba(6,182,212,0.15)]'}`}
            aria-current={active === i ? 'true' : undefined}
            data-cursor="pointer"
          />
        ))}
      </nav>
      <div
        className={`flex-1 rounded-lg ${isExpanded ? 'p-4' : 'p-2'}`}
        style={{ background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.06)' }}
      >
        <div className={`rounded mb-2 ${isExpanded ? 'h-4 w-24' : 'h-1.5 w-12'}`} style={{ background: 'rgba(6,182,212,0.2)' }} />
        <div className={`rounded mb-1 ${isExpanded ? 'h-3 w-40' : 'h-1 w-16'}`} style={{ background: 'rgba(6,182,212,0.08)' }} />
        <div className={`rounded ${isExpanded ? 'h-3 w-32' : 'h-1 w-12'}`} style={{ background: 'rgba(6,182,212,0.08)' }} />
        {isExpanded && (
          <div className="mt-4 h-20 rounded-lg" style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.08)' }} />
        )}
      </div>
    </div>
  )
}
