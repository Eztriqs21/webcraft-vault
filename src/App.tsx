import { useState, useCallback } from 'react'
import { SmoothScroll } from './components/Global/SmoothScroll'
import { CustomCursor } from './components/Global/CustomCursor'
import { AuroraBackground } from './components/Global/AuroraBackground'
import { FilmGrain } from './components/Global/FilmGrain'
import { Navigation } from './components/Global/Navigation'
import { LoadingSequence } from './components/Global/LoadingSequence'
import { SectionTransition } from './components/Global/SectionTransition'
import { MetaTags } from './components/Global/MetaTags'
import { HeroEntrance } from './components/Hero/HeroEntrance'
import { TheaterSection } from './components/AnimationTheater/TheaterSection'
import { TypographySection } from './components/TypographyLab/TypographySection'
import { OrrerySection } from './components/ChromaticOrrery/OrrerySection'
import { PatternSection } from './components/PatternArchive/PatternSection'
import { ToolBeltSection } from './components/ToolBelt/ToolBeltSection'
import { CreditsFooter } from './components/Footer/CreditsFooter'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <SmoothScroll>
      <MetaTags />
      <CustomCursor />
      <AuroraBackground />
      <FilmGrain />

      {!isLoaded && <LoadingSequence onComplete={handleLoadComplete} />}

      {isLoaded && (
        <main className="relative z-10">
          <SectionTransition accent="#6366f1" sectionKey="hero">
            <HeroEntrance />
          </SectionTransition>

          <SectionTransition accent="#f43f5e" sectionKey="theater">
            <TheaterSection />
          </SectionTransition>

          <SectionTransition accent="#10b981" sectionKey="typography">
            <TypographySection />
          </SectionTransition>

          <SectionTransition accent="#a855f7" sectionKey="orrery">
            <OrrerySection />
          </SectionTransition>

          <SectionTransition accent="#06b6d4" sectionKey="patterns">
            <PatternSection />
          </SectionTransition>

          <SectionTransition accent="#fbbf24" sectionKey="tools">
            <ToolBeltSection />
          </SectionTransition>

          <SectionTransition accent="#6366f1" sectionKey="footer">
            <CreditsFooter />
          </SectionTransition>
        </main>
      )}

      <Navigation />
    </SmoothScroll>
  )
}
