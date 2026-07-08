import { useRef, useEffect } from 'react'

const sharedStyleId = 'text-reveal-shared-style'

function ensureSharedStyle() {
  if (document.getElementById(sharedStyleId)) return
  const style = document.createElement('style')
  style.id = sharedStyleId
  style.textContent = `.text-reveal-container.revealed span { transform: translateY(0) !important; }`
  document.head.appendChild(style)
}

export function TextReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureSharedStyle()
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = 'Every great website tells a story'.split(' ')

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={ref} className="text-reveal-container text-center px-4">
        <div className="overflow-hidden">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block text-2xl md:text-3xl font-bold text-vault-text-bright mr-2 md:mr-3"
              style={{
                transform: 'translateY(100%)',
                transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
