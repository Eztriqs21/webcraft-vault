import { useState, useEffect, useRef, useCallback } from 'react'

export function Typewriter() {
  const [text, setText] = useState('')
  const indexRef = useRef(0)
  const resetTimeoutRef = useRef<number>(0)
  const fullText = 'WebCraft Vault — Where animations come to life'

  const type = useCallback(() => {
    if (indexRef.current <= fullText.length) {
      setText(fullText.slice(0, indexRef.current))
      indexRef.current++
    } else {
      resetTimeoutRef.current = window.setTimeout(() => {
        indexRef.current = 0
        setText('')
      }, 2000)
    }
  }, [fullText])

  useEffect(() => {
    const interval = setInterval(type, 80)
    return () => {
      clearInterval(interval)
      clearTimeout(resetTimeoutRef.current)
    }
  }, [type])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-mono text-lg md:text-xl text-vault-text-bright">
        <span>{text}</span>
        <span className="inline-block w-0.5 h-5 bg-vault-accent ml-1 animate-pulse" />
      </div>
    </div>
  )
}
