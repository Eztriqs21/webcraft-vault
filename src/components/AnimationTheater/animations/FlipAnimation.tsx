import { useRef, useEffect, useState } from 'react'

export function FlipAnimation() {
  const [items, setItems] = useState([0, 1, 2, 3, 4, 5])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev]
        const from = Math.floor(Math.random() * newItems.length)
        let to = Math.floor(Math.random() * newItems.length)
        while (to === from) to = Math.floor(Math.random() * newItems.length)
        const temp = newItems[from]
        newItems[from] = newItems[to]
        newItems[to] = temp
        return newItems
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="grid grid-cols-3 gap-2">
        {items.map((num) => (
          <div
            key={num}
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-white font-bold text-lg transition-all duration-500"
            style={{
              background: `hsl(${num * 60}, 70%, 50%)`,
              transform: `scale(${1 + Math.random() * 0.1})`,
            }}
          >
            {num + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
