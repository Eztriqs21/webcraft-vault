export const TOOLS = [
  {
    name: 'GSAP',
    description: 'Professional-grade animation library for the modern web.',
    url: 'https://gsap.com',
    category: 'Animation',
    x: 0.2,
    y: 0.3,
  },
  {
    name: 'Framer Motion',
    description: 'Production-ready motion library for React.',
    url: 'https://www.framer.com/motion/',
    category: 'Animation',
    x: 0.35,
    y: 0.2,
  },
  {
    name: 'Three.js',
    description: 'JavaScript 3D library for WebGL.',
    url: 'https://threejs.org',
    category: '3D',
    x: 0.5,
    y: 0.35,
  },
  {
    name: 'Lenis',
    description: ' buttery smooth scroll library.',
    url: 'https://lenis.darkroom.engineering',
    category: 'Utility',
    x: 0.65,
    y: 0.2,
  },
  {
    name: 'SplitType',
    description: 'Utility to split text into individual characters for animation.',
    url: 'https://splittype.xyz',
    category: 'Utility',
    x: 0.8,
    y: 0.3,
  },
  {
    name: 'Spline',
    description: 'Design tool for 3D web experiences.',
    url: 'https://spline.design',
    category: 'Design',
    x: 0.15,
    y: 0.55,
  },
  {
    name: 'Figma',
    description: 'Collaborative interface design tool.',
    url: 'https://figma.com',
    category: 'Design',
    x: 0.35,
    y: 0.6,
  },
  {
    name: 'Mobbin',
    description: 'Hand-curated UI/UX references for mobile and web.',
    url: 'https://mobbin.com',
    category: 'Inspiration',
    x: 0.5,
    y: 0.7,
  },
  {
    name: 'Awwwards',
    description: 'Website awards recognizing the best in digital design.',
    url: 'https://www.awwwards.com',
    category: 'Inspiration',
    x: 0.65,
    y: 0.55,
  },
  {
    name: 'SiteInspire',
    description: 'Showcase of the finest web design.',
    url: 'https://www.siteinspire.com',
    category: 'Inspiration',
    x: 0.8,
    y: 0.6,
  },
  {
    name: 'Godly',
    description: 'Curated website inspiration.',
    url: 'https://godly.website',
    category: 'Inspiration',
    x: 0.3,
    y: 0.8,
  },
  {
    name: 'CSS Design Awards',
    description: 'Web design awards for CSS excellence.',
    url: 'https://www.cssdesignawards.com',
    category: 'Inspiration',
    x: 0.7,
    y: 0.8,
  },
] as const

export const TOOL_CONNECTIONS: [number, number][] = [
  [0, 1],  // GSAP - Framer Motion
  [0, 3],  // GSAP - Lenis
  [1, 4],  // Framer Motion - SplitType
  [2, 5],  // Three.js - Spline
  [3, 4],  // Lenis - SplitType
  [5, 6],  // Spline - Figma
  [6, 7],  // Figma - Mobbin
  [7, 8],  // Mobbin - Awwwards
  [8, 9],  // Awwwards - SiteInspire
  [9, 10], // SiteInspire - Godly
  [10, 11],// Godly - CSS Design Awards
  [7, 10], // Mobbin - Godly
  [8, 11], // Awwwards - CSS Design Awards
  [0, 2],  // GSAP - Three.js
]
