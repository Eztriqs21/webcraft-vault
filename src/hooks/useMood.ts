import { useState, useEffect, useCallback } from 'react'
import { SECTION_MOODS, type SectionKey } from '../data/sections'

interface MoodContext {
  currentSection: SectionKey
  accent: string
  accentRgb: string
  cursorGlow: string
}

const defaultMood: MoodContext = {
  currentSection: 'hero',
  accent: SECTION_MOODS.hero.accent,
  accentRgb: SECTION_MOODS.hero.accentRgb,
  cursorGlow: SECTION_MOODS.hero.cursorGlow,
}

export function useMood() {
  const [mood, setMood] = useState<MoodContext>(defaultMood)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-section') as SectionKey
            if (key && SECTION_MOODS[key]) {
              setMood({
                currentSection: key,
                ...SECTION_MOODS[key],
              })
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return mood
}

export function useMoodSetter() {
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero')

  const setSection = useCallback((section: SectionKey) => {
    setCurrentSection(section)
  }, [])

  const mood = SECTION_MOODS[currentSection]

  return { ...mood, currentSection, setSection }
}
