import { useState, useCallback, useEffect, Suspense, lazy } from 'react'
import { SmoothScroll } from './components/Global/SmoothScroll'
import { CustomCursor } from './components/Global/CustomCursor'
import { AuroraBackground } from './components/Global/AuroraBackground'
import { FilmGrain } from './components/Global/FilmGrain'
import { Navigation } from './components/Global/Navigation'
import { LoadingSequence } from './components/Global/LoadingSequence'
import { SectionTransition } from './components/Global/SectionTransition'
import { MetaTags } from './components/Global/MetaTags'
import { HeroEntrance } from './components/Hero/HeroEntrance'
import { BackToTop } from './components/Global/BackToTop'

const TheaterSection = lazy(() => import('./components/AnimationTheater/TheaterSection').then(m => ({ default: m.TheaterSection })))
const TypographySection = lazy(() => import('./components/TypographyLab/TypographySection').then(m => ({ default: m.TypographySection })))
const OrrerySection = lazy(() => import('./components/ChromaticOrrery/OrrerySection').then(m => ({ default: m.OrrerySection })))
const PatternSection = lazy(() => import('./components/PatternArchive/PatternSection').then(m => ({ default: m.PatternSection })))
const ToolBeltSection = lazy(() => import('./components/ToolBelt/ToolBeltSection').then(m => ({ default: m.ToolBeltSection })))
const CreditsFooter = lazy(() => import('./components/Footer/CreditsFooter').then(m => ({ default: m.CreditsFooter })))

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isLoaded])

  return (
    <SmoothScroll>
      <MetaTags />

      {!isLoaded && <LoadingSequence onComplete={handleLoadComplete} />}

      {isLoaded && (
        <>
          <CustomCursor />
          <AuroraBackground />
          <FilmGrain />

          <main className="relative z-10">
            <a href="#theater" className="skip-link">Skip to content</a>

            <SectionTransition accent="#6366f1" sectionKey="hero">
              <HeroEntrance />
            </SectionTransition>

            <Suspense fallback={<div className="h-screen" />}>
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
            </Suspense>
          </main>

          <Navigation />
          <BackToTop />
        </>
      )}
    </SmoothScroll>
  )
}
