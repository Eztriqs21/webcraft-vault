import { useRef } from 'react'

export function AsymmetricEditorialDemo({ isExpanded }: { isExpanded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={`flex gap-3 ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      role="group"
      aria-label="Asymmetric editorial layout with offset columns"
    >
      <div
        className="flex-1 rounded-xl transition-transform duration-300"
        style={{
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.1)',
        }}
      />
      <div className={`flex-1 flex flex-col justify-center ${isExpanded ? 'pt-8 space-y-3' : 'pt-2 space-y-1'}`}>
        <div className={`rounded ${isExpanded ? 'h-4 w-40' : 'h-2 w-16'}`} style={{ background: 'rgba(6,182,212,0.2)' }} />
        <div className={`rounded ${isExpanded ? 'h-3 w-52' : 'h-1.5 w-20'}`} style={{ background: 'rgba(6,182,212,0.1)' }} />
        <div className={`rounded ${isExpanded ? 'h-3 w-44' : 'h-1.5 w-16'}`} style={{ background: 'rgba(6,182,212,0.1)' }} />
        {isExpanded && (
          <>
            <div className="h-3 w-48 rounded" style={{ background: 'rgba(6,182,212,0.1)' }} />
            <div className="h-3 w-36 rounded" style={{ background: 'rgba(6,182,212,0.1)' }} />
          </>
        )}
      </div>
    </div>
  )
}
