export const FONT_PAIRINGS = [
  { heading: 'Playfair Display', body: 'Inter', personality: 'Classic Editorial' },
  { heading: 'Space Grotesk', body: 'Inter', personality: 'Geometric Tech' },
  { heading: 'Cormorant', body: 'Montserrat', personality: 'Luxury Refined' },
  { heading: 'Syne', body: 'Manrope', personality: 'Bold Contemporary' },
  { heading: 'Bodoni', body: 'Lato', personality: 'High Fashion' },
  { heading: 'Oswald', body: 'Open Sans', personality: 'Condensed Impact' },
  { heading: 'Fraunces', body: 'Work Sans', personality: 'Optical Soft' },
  { heading: 'DM Serif', body: 'DM Sans', personality: 'Harmonized Serif' },
  { heading: 'Outfit', body: 'Source Sans', personality: 'Clean Geometric' },
  { heading: 'Plus Jakarta', body: 'PT Serif', personality: 'Modern Classic' },
  { heading: 'Geist', body: 'Geist Mono', personality: 'Vercel Minimal' },
  { heading: 'Libre Baskerville', body: 'Source Sans 3', personality: 'Literary Warm' },
  { heading: 'Bebas Neue', body: 'Raleway', personality: 'Display Bold' },
  { heading: 'Stardom', body: 'Inter', personality: 'Cinematic Serif' },
  { heading: 'Melodrama', body: 'Inter', personality: 'Elegant Script' },
  { heading: 'Anton', body: 'Nunito', personality: 'Heavy Impact' },
  { heading: 'Bricolage', body: 'Instrument Serif', personality: 'Playful Editorial' },
  { heading: 'Urbanist', body: 'Figtree', personality: 'Soft Tech' },
  { heading: 'JetBrains Mono', body: 'Inter', personality: 'Developer Focus' },
  { heading: 'Clash Display', body: 'Satoshi', personality: 'Brutalist Geometric' },
] as const

export const FONT_PAIRINGS_CSS: Record<string, string> = {
  'Playfair Display': 'Playfair+Display:wght@400;500;600;700',
  'Space Grotesk': 'Space+Grotesk:wght@400;500;600;700',
  'Cormorant': 'Cormorant:wght@400;500;600;700',
  'Syne': 'Syne:wght@400;500;600;700;800',
  'Bodoni': 'Bodoni+Moda:wght@400;500;600;700',
  'Oswald': 'Oswald:wght@400;500;600;700',
  'Fraunces': 'Fraunces:wght@400;500;600;700',
  'DM Serif': 'DM+Serif+Display:wght@400',
  'Outfit': 'Outfit:wght@400;500;600;700',
  'Plus Jakarta': 'Plus+Jakarta+Sans:wght@400;500;600;700',
  'Geist': 'Geist:wght@400;500;600;700',
  'Geist Mono': 'Geist+Mono:wght@400;500;600;700',
  'Libre Baskerville': 'Libre+Baskerville:wght@400;700',
  'Source Sans 3': 'Source+Sans+3:wght@400;500;600;700',
  'Bebas Neue': 'Bebas+Neue:wght@400',
  'Raleway': 'Raleway:wght@400;500;600;700',
  'Stardom': 'Stardom:wght@400',
  'Melodrama': 'Melodrama:wght@400;500;600;700',
  'Anton': 'Anton:wght@400',
  'Nunito': 'Nunito:wght@400;500;600;700',
  'Bricolage': 'Bricolage+Grotesque:wght@400;500;600;700;800',
  'Instrument Serif': 'Instrument+Serif:wght@400',
  'Urbanist': 'Urbanist:wght@400;500;600;700',
  'Figtree': 'Figtree:wght@400;500;600;700',
  'Inter': 'Inter:wght@400;500;600;700',
  'Manrope': 'Manrope:wght@400;500;600;700;800',
  'Montserrat': 'Montserrat:wght@400;500;600;700',
  'Lato': 'Lato:wght@400;700',
  'Open Sans': 'Open+Sans:wght@400;500;600;700',
  'Work Sans': 'Work+Sans:wght@400;500;600;700',
  'DM Sans': 'DM+Sans:wght@400;500;600;700',
  'Source Sans': 'Source+Sans+3:wght@400;500;600;700',
  'PT Serif': 'PT+Serif:wght@400;700',
  'Clash Display': 'Clash+Display:wght@400;500;600;700',
  'Satoshi': 'Satoshi:wght@400;500;600;700',
  'JetBrains Mono': 'JetBrains+Mono:wght@400;500;600;700',
}

const loadedFonts = new Set<string>()

export function loadFont(fontName: string) {
  if (loadedFonts.has(fontName)) return
  const cssValue = FONT_PAIRINGS_CSS[fontName]
  if (!cssValue) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${cssValue}&display=swap`
  document.head.appendChild(link)
  loadedFonts.add(fontName)
}
