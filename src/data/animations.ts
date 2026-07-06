import type { FC } from 'react'

import { MorphingBlob } from '../components/AnimationTheater/animations/MorphingBlob'
import { ParticleFountain } from '../components/AnimationTheater/animations/ParticleFountain'
import { TextScramble } from '../components/AnimationTheater/animations/TextScramble'
import { SpringyCards } from '../components/AnimationTheater/animations/SpringyCards'
import { RippleGrid } from '../components/AnimationTheater/animations/RippleGrid'
import { Cube3D } from '../components/AnimationTheater/animations/Cube3D'
import { WaveInterference } from '../components/AnimationTheater/animations/WaveInterference'
import { MagneticButtons } from '../components/AnimationTheater/animations/MagneticButtons'
import { SVGLineDraw } from '../components/AnimationTheater/animations/SVGLineDraw'
import { TiltCard } from '../components/AnimationTheater/animations/TiltCard'
import { GlitchText } from '../components/AnimationTheater/animations/GlitchText'
import { LavaLamp } from '../components/AnimationTheater/animations/LavaLamp'
import { TextReveal } from '../components/AnimationTheater/animations/TextReveal'
import { Typewriter } from '../components/AnimationTheater/animations/Typewriter'
import { NoiseTexture } from '../components/AnimationTheater/animations/NoiseTexture'
import { DragThrow } from '../components/AnimationTheater/animations/DragThrow'
import { ScrollStagger } from '../components/AnimationTheater/animations/ScrollStagger'
import { ElasticAccordion } from '../components/AnimationTheater/animations/ElasticAccordion'
import { AuroraShader } from '../components/AnimationTheater/animations/AuroraShader'
import { FlipAnimation } from '../components/AnimationTheater/animations/FlipAnimation'
import { BouncyLoader } from '../components/AnimationTheater/animations/BouncyLoader'
import { CardFan } from '../components/AnimationTheater/animations/CardFan'
import { ConfettiBurst } from '../components/AnimationTheater/animations/ConfettiBurst'
import { CursorTrail } from '../components/AnimationTheater/animations/CursorTrail'
import { MorphingGradient } from '../components/AnimationTheater/animations/MorphingGradient'
import { SnapCarousel } from '../components/AnimationTheater/animations/SnapCarousel'
import { StaggeredList } from '../components/AnimationTheater/animations/StaggeredList'
import { WebGLDistortion } from '../components/AnimationTheater/animations/WebGLDistortion'
import { ScrollSkew } from '../components/AnimationTheater/animations/ScrollSkew'
import { PageTransition } from '../components/AnimationTheater/animations/PageTransition'
import { Product3DCard } from '../components/AnimationTheater/animations/Product3DCard'
import { ParallaxLayers } from '../components/AnimationTheater/animations/ParallaxLayers'

export interface AnimationEntry {
  id: number
  name: string
  mood: string
  tags: string[]
  component: FC
  code: string
}

export const ANIMATIONS: AnimationEntry[] = [
  {
    id: 1,
    name: 'Morphing Blob',
    mood: 'Fluid / Organic / SVG',
    tags: ['SVG', 'Path Morph'],
    component: MorphingBlob,
    code: `// SVG path morphing with layered organic shapes
// Uses canvas for smooth 60fps rendering
// Each layer has different hue and opacity for depth`,
  },
  {
    id: 2,
    name: 'Particle Fountain',
    mood: 'Kinetic / Physics / Canvas',
    tags: ['Canvas', 'Particles'],
    component: ParticleFountain,
    code: `// Canvas 2D particle system with gravity
// Spawns particles on mouse movement
// Uses velocity decay and lifetime management`,
  },
  {
    id: 3,
    name: 'Text Scramble',
    mood: 'Digital / Glitch / Text',
    tags: ['DOM', 'Typography'],
    component: TextScramble,
    code: `// Character-by-character reveal with random characters
// Interval-based animation with easing
// Hover triggers next phrase with scramble effect`,
  },
  {
    id: 4,
    name: 'Springy Cards',
    mood: 'Playful / Spring / Drag',
    tags: ['Framer Motion', 'Physics'],
    component: SpringyCards,
    code: `// Framer Motion drag with spring physics
// Elastic constraints for natural bounce
// Scale on drag and hover for depth`,
  },
  {
    id: 5,
    name: 'Ripple Grid',
    mood: 'Wave / Grid / Hover',
    tags: ['Canvas', 'Grid'],
    component: RippleGrid,
    code: `// Canvas 2D grid with mouse-driven ripples
// Radial wave propagation from cursor
// Dot size and color react to wave displacement`,
  },
  {
    id: 6,
    name: '3D Cube',
    mood: 'Dimensional / Rotate / CSS',
    tags: ['CSS 3D', 'Transform'],
    component: Cube3D,
    code: `// CSS preserve-3d rotating cube
// 6 faces with different gradient colors
// Mouse-driven rotation with auto-rotation fallback`,
  },
  {
    id: 7,
    name: 'Wave Interference',
    mood: 'Mathematical / Sine / Canvas',
    tags: ['Canvas', 'Math'],
    component: WaveInterference,
    code: `// Canvas 2D sine wave interference pattern
// 3 wave sources including mouse position
// Per-pixel rendering for mathematical beauty`,
  },
  {
    id: 8,
    name: 'Magnetic Buttons',
    mood: 'Interactive / Proximity / Framer',
    tags: ['Framer Motion', 'Gesture'],
    component: MagneticButtons,
    code: `// Framer Motion proximity-based attraction
// Each button lerp toward cursor on hover
// 3D tilt based on cursor position`,
  },
  {
    id: 9,
    name: 'SVG Line Draw',
    mood: 'Minimal / Path / Stroke',
    tags: ['SVG', 'Animation'],
    component: SVGLineDraw,
    code: `// SVG stroke-dashoffset animation
// Staggered draw with easing
// Auto-reverses and loops with pause`,
  },
  {
    id: 10,
    name: 'Tilt Card',
    mood: '3D / Perspective / Mouse',
    tags: ['CSS 3D', 'Transform'],
    component: TiltCard,
    code: `// CSS 3D perspective tilt on mouse
// Dynamic glare effect following cursor
// Spring-based smooth interpolation`,
  },
  {
    id: 11,
    name: 'Glitch Text',
    mood: 'Digital / RGB Split / CSS',
    tags: ['CSS', 'Clip-path'],
    component: GlitchText,
    code: `// CSS clip-path RGB channel splitting
// Periodic glitch bursts on timer
// Red and cyan offset layers`,
  },
  {
    id: 12,
    name: 'Lava Lamp',
    mood: 'Organic / Metaball / Canvas',
    tags: ['Canvas', 'Algorithm'],
    component: LavaLamp,
    code: `// Canvas 2D metaball simulation
// 8 blobs with collision response
// Radial gradients for organic glow`,
  },
  {
    id: 13,
    name: 'Text Reveal',
    mood: 'Cinematic / Mask / Scroll',
    tags: ['GSAP', 'ScrollTrigger'],
    component: TextReveal,
    code: `// IntersectionObserver-driven text reveal
// Staggered word entrance with translate
// CSS transitions with cubic-bezier easing`,
  },
  {
    id: 14,
    name: 'Typewriter',
    mood: 'Retro / Cursor / JS',
    tags: ['DOM', 'Interval'],
    component: Typewriter,
    code: `// Character-by-character typing with cursor
// Interval-based with auto-reset
// Blinking cursor with CSS animation`,
  },
  {
    id: 15,
    name: 'Noise Texture',
    mood: 'Abstract / Perlin / Canvas',
    tags: ['Canvas', 'Algorithm'],
    component: NoiseTexture,
    code: `// Canvas 2D procedural noise generation
// Animated sine-based noise patterns
// RGB channel variation for texture`,
  },
  {
    id: 16,
    name: 'Drag Throw',
    mood: 'Physics / Momentum / Framer',
    tags: ['Framer Motion', 'Drag'],
    component: DragThrow,
    code: `// Framer Motion drag with momentum
// Velocity-based throw calculation
// Boundary constraints with bounce`,
  },
  {
    id: 17,
    name: 'Scroll Stagger',
    mood: 'Entrance / Stagger / GSAP',
    tags: ['GSAP', 'ScrollTrigger'],
    component: ScrollStagger,
    code: `// IntersectionObserver staggered entrance
// 8-grid layout with incremental delays
// CSS transitions with spring easing`,
  },
  {
    id: 18,
    name: 'Elastic Accordion',
    mood: 'Spring / Expand / Framer',
    tags: ['Framer Motion', 'Layout'],
    component: ElasticAccordion,
    code: `// Framer Motion AnimatePresence
// Spring-based height animation
// Layout animations for smooth resize`,
  },
  {
    id: 19,
    name: 'Aurora Shader',
    mood: 'Gradient / Mesh / Cursor',
    tags: ['Canvas', 'Gradient'],
    component: AuroraShader,
    code: `// Canvas 2D radial gradient mesh
// Mouse-driven gradient center
// Animated hue rotation for aurora effect`,
  },
  {
    id: 20,
    name: 'Flip Animation',
    mood: 'Layout / Rearrange / GSAP',
    tags: ['GSAP', 'Flip'],
    component: FlipAnimation,
    code: `// CSS transition-based layout flip
// Random swap every 2 seconds
// Scale variation for organic feel`,
  },
  {
    id: 21,
    name: 'Bouncy Loader',
    mood: 'Playful / Spring / Framer',
    tags: ['Framer Motion', 'Stagger'],
    component: BouncyLoader,
    code: `// Framer Motion staggered bounce
// 5 colored dots with delay cascade
// Y-axis bounce with scale pulse`,
  },
  {
    id: 22,
    name: 'Card Fan',
    mood: 'Dimensional / Fan / CSS 3D',
    tags: ['CSS 3D', 'Rotate'],
    component: CardFan,
    code: `// CSS 3D card fan with transform-origin
// Framer Motion spring rotation
// Hover fans cards wider`,
  },
  {
    id: 23,
    name: 'Confetti Burst',
    mood: 'Celebration / Particle / Canvas',
    tags: ['Canvas', 'Physics'],
    component: ConfettiBurst,
    code: `// Canvas 2D confetti particle system
// Click-triggered explosion with gravity
// 80 colored rectangular particles`,
  },
  {
    id: 24,
    name: 'Cursor Trail',
    mood: 'Fluid / Follow / Canvas',
    tags: ['Canvas', 'Mouse'],
    component: CursorTrail,
    code: `// Canvas 2D cursor trail with decay
// 50-point trail with age-based opacity
// HSL color cycling along trail`,
  },
  {
    id: 25,
    name: 'Morphing Gradient',
    mood: 'Color / Animate / CSS',
    tags: ['CSS', 'Keyframes'],
    component: MorphingGradient,
    code: `// CSS animated gradient with hue shift
// Click cycles hue by 40 degrees
// Border-radius morphing for organic feel`,
  },
  {
    id: 26,
    name: 'Snap Carousel',
    mood: 'Drag / Snap / Framer',
    tags: ['Framer Motion', 'Drag'],
    component: SnapCarousel,
    code: `// Framer Motion drag with snap points
// Spring-based smooth scrolling
// Dot indicator for current position`,
  },
  {
    id: 27,
    name: 'Staggered List',
    mood: 'Entrance / Multi-dir / Framer',
    tags: ['Framer Motion', 'Stagger'],
    component: StaggeredList,
    code: `// Framer Motion multi-directional entrance
// Each item enters from different direction
// Staggered delay with spring easing`,
  },
  {
    id: 28,
    name: 'WebGL Distortion',
    mood: 'Shader / Displacement / Three.js',
    tags: ['Three.js', 'WebGL'],
    component: WebGLDistortion,
    code: `// Three.js WebGL shader distortion
// Vertex shader with mouse-driven displacement
// Fragment shader with animated color gradient`,
  },
  {
    id: 29,
    name: 'Scroll-Velocity Skew',
    mood: 'Speed / Skew / GSAP',
    tags: ['GSAP', 'Velocity'],
    component: ScrollSkew,
    code: `// Scroll velocity-based CSS skew
// Clamps skew to ±10 degrees
// Auto-resets when scroll stops`,
  },
  {
    id: 30,
    name: 'Page Transition',
    mood: 'Curtain / Wipe / Meta',
    tags: ['GSAP', 'Clip-path'],
    component: PageTransition,
    code: `// Framer Motion clip-path curtain wipe
// AnimatePresence mode="wait"
// Inset-based directional reveal`,
  },
  {
    id: 31,
    name: '3D Product Card',
    mood: 'Dimensional / Lighting / CSS',
    tags: ['CSS 3D', 'Mouse'],
    component: Product3DCard,
    code: `// CSS 3D product card with dynamic lighting
// Mouse-driven glare effect
// Multiple translateZ layers for depth`,
  },
  {
    id: 32,
    name: 'Parallax Layers',
    mood: 'Depth / Scroll / Speed',
    tags: ['GSAP', 'ScrollTrigger'],
    component: ParallaxLayers,
    code: `// Scroll-driven multi-speed parallax
// 4 layers with different scroll speeds
// IntersectionObserver for efficient updates`,
  },
]
