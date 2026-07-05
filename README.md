# WebCraft Vault

An immersive single-page exhibition of award-winning web design ingredients. Built for designers who refuse to ship boring.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-based `@theme` configuration)
- **Framer Motion** — layout animations, gestures, shared element transitions
- **GSAP** (ScrollTrigger, Flip) — scroll-driven animations, horizontal scroll theater
- **Lenis** — buttery smooth scroll with lerp
- **Shiki** — syntax highlighting for code panels
- **Three.js** — WebGL image distortion (lazy-loaded)

## Quick Start

```bash
cd webcraft-vault
npm install
npm run dev
```

Open `http://localhost:5173`

## Build

```bash
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

## Architecture

```
src/
├── App.tsx                          # Main app shell
├── main.tsx                         # Entry point
├── index.css                        # Tailwind v4 @theme config + global styles
│
├── components/
│   ├── Global/                      # Shared infrastructure
│   │   ├── CustomCursor.tsx         # Magnetic ring cursor with phosphor trail
│   │   ├── AuroraBackground.tsx     # Canvas 2D aurora mesh gradient
│   │   ├── FilmGrain.tsx            # Animated film grain + scanlines
│   │   ├── Navigation.tsx           # Glass pill dock with section detection
│   │   ├── LoadingSequence.tsx      # Choreographed 3-phase entry
│   │   ├── SectionTransition.tsx    # Section wrapper with accent borders
│   │   ├── SmoothScroll.tsx         # Lenis provider
│   │   └── MetaTags.tsx             # react-helmet-async (OG, Twitter, JSON-LD)
│   │
│   ├── Hero/                        # Section 1: The Entrance
│   │   ├── HeroEntrance.tsx         # Full hero composition
│   │   ├── ParallaxLetters.tsx      # 3D parallax typography
│   │   └── PreviewRiver.tsx         # Infinite flowing animation previews
│   │
│   ├── AnimationTheater/            # Section 2: 32 Animations
│   │   ├── TheaterSection.tsx       # Theater UI + frame components
│   │   └── animations/              # Individual animation components (TBD)
│   │
│   ├── TypographyLab/               # Section 3: 20 Font Pairings
│   │   └── TypographySection.tsx    # Split-screen with live canvas
│   │
│   ├── ChromaticOrrery/             # Section 4: 15 Color Palettes
│   │   └── OrrerySection.tsx        # 3D orbital palette explorer
│   │
│   ├── PatternArchive/              # Section 5: 10 UI Patterns
│   │   └── PatternSection.tsx       # Bento grid with expandable demos
│   │
│   ├── ToolBelt/                    # Section 6: Resources
│   │   └── ToolBeltSection.tsx      # Force-directed graph / mobile card list
│   │
│   └── Footer/                      # Section 7: Credits
│       └── CreditsFooter.tsx        # Cinematic scroll + starfield
│
├── data/                            # Static data
│   ├── sections.ts                  # Section mood/accent definitions
│   ├── fonts.ts                     # 20 font pairings + lazy loader
│   ├── palettes.ts                  # 15 exact hex color palettes
│   └── tools.ts                     # 12 tools/libraries + connections
│
├── hooks/                           # Custom React hooks
│   ├── useReducedMotion.ts          # prefers-reduced-motion detection
│   ├── useMood.ts                   # Current section accent context
│   └── useIntersection.ts           # IntersectionObserver + conditional mount
│
├── lib/
│   └── shiki.ts                     # Shiki highlighter singleton
│
└── utils/
    └── clipboard.ts                 # Copy + custom toast notifications
```

## Section Moods

Each section has a unique accent color that flows through the cursor, navigation, and transitions:

| Section | Accent | Hex |
|---------|--------|-----|
| Hero | Indigo | `#6366f1` |
| Animation Theater | Rose | `#f43f5e` |
| Typography Lab | Emerald | `#10b981` |
| Chromatic Orrery | Purple | `#a855f7` |
| Pattern Archive | Cyan | `#06b6d4` |
| Tool Belt | Amber | `#fbbf24` |

## Responsive Strategy

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | Full parallax letters | Reduced depth, simplified |
| Theater | Horizontal flow | Vertical stack with snap |
| Typography | Side-by-side split | Sticky preview + scrollable list |
| Orrery | 3D orbital layout | Swipeable carousel |
| Patterns | Bento grid | Single column cards |
| Tool Belt | Force-directed graph | Card list |
| Footer | Full credits | Simplified scroll |

## Accessibility

- `prefers-reduced-motion`: Disables all parallax, autoplay, and rapid transitions
- Custom cursor hidden on touch devices (`pointer: coarse`)
- `:focus-visible` outlines for keyboard navigation
- Semantic HTML with `data-section` attributes for navigation
- ARIA labels on interactive elements

## Performance

- **Code splitting**: Framer Motion, GSAP, Three.js, and Shiki are separate chunks
- **Lazy mounting**: Theater frames and Canvas components unmount when off-screen
- **Font lazy-loading**: Typography Lab fonts injected via IntersectionObserver
- **Canvas cleanup**: All requestAnimationFrame loops cleaned up on unmount
- **Tailwind v4**: CSS-first config, no JS config file overhead

## Extending

### Adding a new animation
1. Create component in `src/components/AnimationTheater/animations/`
2. Add entry to `animations` array in `TheaterSection.tsx`
3. Import lazily with `React.lazy()` for code splitting

### Adding a new font pairing
1. Add entry to `FONT_PAIRINGS` in `src/data/fonts.ts`
2. Add Google Fonts CSS value to `FONT_PAIRINGS_CSS`
3. The lazy loader handles the rest

### Adding a new palette
1. Add entry to `PALETTES` in `src/data/palettes.ts`
2. The orrery automatically renders new planets

## License

Built with passion. Ship boring? Never.
