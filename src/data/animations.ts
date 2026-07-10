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
  prompt: string
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
    prompt: 'Create a canvas-based morphing blob animation with 3 organic layers, each with different hue and opacity. Use sine-based path generation to create smooth, continuously morphing shapes that feel fluid and alive.',
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
    prompt: 'Create a canvas particle fountain that spawns particles on mouse movement with gravity, velocity decay, and lifetime management. Each particle should have a random color and fade out over time.',
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
    prompt: 'Create a text scramble effect that reveals characters one-by-one, substituting random characters before settling on the final letter. Include a blinking cursor and auto-cycle through multiple phrases.',
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
    prompt: 'Create springy draggable cards using Framer Motion with spring physics. Cards should bounce elastically when released, scale up on drag, and have a 3D tilt effect on hover.',
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
    prompt: 'Create a canvas grid of dots that ripple outward from the mouse cursor. Dots should change size and color based on wave displacement, creating a water-ripple effect across the grid.',
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
    prompt: 'Create a CSS 3D rotating cube with preserve-3d. Each of the 6 faces should have a different gradient color. The cube should auto-rotate and respond to mouse movement for interactive rotation.',
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
    prompt: 'Create a canvas-based sine wave interference pattern with 3 wave sources. One source follows the mouse. Render per-pixel using mathematical sine functions to create beautiful interference patterns.',
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
    prompt: 'Create magnetic buttons using Framer Motion that attract toward the cursor when nearby. Each button should lerp toward the cursor on hover with a 3D tilt effect based on cursor position.',
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
    prompt: 'Create an SVG line-drawing animation using stroke-dashoffset. Stagger the draw of multiple paths with easing, then auto-reverse and loop with a brief pause between cycles.',
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
    prompt: 'Create a 3D tilt card using CSS perspective and transforms. The card should tilt toward the mouse cursor with a dynamic glare highlight that follows the cursor. Use spring-based smooth interpolation.',
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
    prompt: 'Create glitch text using CSS clip-path to split RGB channels. Add periodic glitch bursts on a timer with red and cyan offset layers that randomly shift and clip.',
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
    prompt: 'Create a canvas lava lamp using metaball simulation. Include 8 blobs with collision response and radial gradients for an organic, glowing effect. Blobs should merge and separate smoothly.',
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
    prompt: 'Create a cinematic text reveal using IntersectionObserver. Words should stagger in with translateY and opacity, using CSS transitions with cubic-bezier easing for a smooth entrance.',
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
    prompt: 'Create a typewriter effect that types characters one-by-one with a blinking cursor. Use interval-based animation with auto-reset and a CSS-animated cursor that blinks when idle.',
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
    prompt: 'Create a canvas noise texture using procedural generation. Animate sine-based noise patterns with RGB channel variation to create a shifting, textured background.',
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
    prompt: 'Create a drag-and-throw interaction using Framer Motion. Items should have momentum based on release velocity, with boundary constraints and a bounce-back effect when hitting edges.',
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
    prompt: 'Create a scroll-triggered staggered entrance for an 8-item grid. Use IntersectionObserver to trigger CSS transitions with incremental delays and spring easing for a cascading effect.',
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
    prompt: 'Create an elastic accordion using Framer Motion AnimatePresence. Spring-based height animations with layout transitions for smooth expand/collapse. Include smooth rotation on the indicator arrow.',
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
    prompt: 'Create an aurora shader effect using canvas 2D radial gradient mesh. The gradient center should follow the mouse with animated hue rotation for a flowing, northern-lights effect.',
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
    prompt: 'Create a layout flip animation using CSS transitions. Randomly swap grid items every 2 seconds with smooth position animations and scale variation for an organic, rearranging effect.',
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
    prompt: 'Create a bouncy loader using Framer Motion with 5 colored dots. Each dot should bounce with a staggered delay cascade, using Y-axis bounce with scale pulse for a playful loading indicator.',
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
    prompt: 'Create a 3D card fan using CSS transforms with transform-origin at the bottom. Use Framer Motion spring physics for rotation and fan cards wider on hover for an interactive spread effect.',
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
    prompt: 'Create a confetti burst using canvas 2D particles. Click triggers an explosion of 80 colored rectangular particles with gravity, rotation, and fade-out for a celebratory effect.',
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
    prompt: 'Create a cursor trail effect using canvas 2D. Track 50 points along the cursor path with age-based opacity decay and HSL color cycling for a fluid, rainbow trail.',
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
    prompt: 'Create a morphing gradient using CSS animations with hue shift. Click to cycle the hue by 40 degrees. Combine with border-radius morphing for an organic, fluid gradient effect.',
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
    prompt: 'Create a snap carousel using Framer Motion drag with snap points. Spring-based smooth scrolling between items with a dot indicator showing the current position.',
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
    prompt: 'Create a staggered list entrance using Framer Motion. Each item enters from a different direction (left, right, top, bottom) with staggered delays and spring easing for a dynamic reveal.',
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
    prompt: 'Create a WebGL distortion effect using Three.js. Use a vertex shader for mouse-driven displacement and a fragment shader with animated color gradient for a psychedelic visual.',
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
    prompt: 'Create a scroll-velocity skew effect. Track scroll speed and apply CSS skew transform proportional to velocity, clamped to ±10 degrees. Auto-reset to 0 when scroll stops.',
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
    prompt: 'Create a page transition using Framer Motion clip-path curtain wipe. Use AnimatePresence mode="wait" with inset-based directional reveal for smooth page-to-page transitions.',
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
    prompt: 'Create a 3D product card using CSS transforms with dynamic lighting. Mouse movement drives a glare effect across the surface. Use multiple translateZ layers for depth and parallax.',
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
    prompt: 'Create a parallax layers effect with 4 layers moving at different scroll speeds. Use IntersectionObserver for efficient visibility detection and GSAP for smooth, performant parallax scrolling.',
  },
]
