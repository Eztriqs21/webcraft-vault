import { useState, useEffect, useRef } from 'react'

export function useConditionalMount(buffer = 300) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else if (Math.abs(entry.boundingClientRect.top) > window.innerHeight + buffer) {
          setIsVisible(false)
        }
      },
      { rootMargin: `${buffer}px` }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [buffer])

  return { ref, isVisible }
}

export function useIntersection(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return { ref, isIntersecting }
}
