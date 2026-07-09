import { useState, useRef } from 'react'

const plans = [
  { name: 'Starter', price: '$9', features: ['5 projects', '10GB storage'] },
  { name: 'Pro', price: '$29', features: ['Unlimited projects', '100GB storage'], featured: true },
  { name: 'Team', price: '$99', features: ['Everything in Pro', 'Priority support'] },
]

export function SpotlightPricingDemo({ isExpanded }: { isExpanded: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent, cardIndex: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
    setHoveredCard(cardIndex)
  }

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-3 gap-2 ${isExpanded ? 'h-full min-h-[300px]' : 'h-24 md:h-32'}`}
      onMouseLeave={() => setHoveredCard(null)}
      role="group"
      aria-label="Pricing cards with spotlight hover effect"
    >
      {plans.map((plan, i) => (
        <div
          key={i}
          className={`relative rounded-xl flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-200 ${
            isExpanded ? 'p-4' : 'p-2'
          }`}
          style={{
            background: plan.featured ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.04)',
            border: `1px solid ${plan.featured ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.06)'}`,
          }}
          onMouseMove={(e) => handleMouseMove(e, i)}
        >
          {hoveredCard === i && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-100"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.15), transparent 60%)`,
              }}
            />
          )}
          <div className={`font-bold text-vault-text-bright ${isExpanded ? 'text-lg' : 'text-xs'}`}>
            {plan.price}
          </div>
          <div className={`text-[#888] ${isExpanded ? 'text-xs mt-1' : 'text-[8px] mt-0.5'}`}>
            {plan.name}
          </div>
        </div>
      ))}
    </div>
  )
}
