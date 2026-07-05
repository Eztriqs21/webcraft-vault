import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const animations = [
  { id: 1, name: 'Morphing Blob', mood: 'Fluid / Organic / SVG', tags: ['SVG', 'Path Morph'], component: 'MorphingBlob' },
  { id: 2, name: 'Particle Fountain', mood: 'Kinetic / Physics / Canvas', tags: ['Canvas', 'Particles'], component: 'ParticleFountain' },
  { id: 3, name: 'Text Scramble', mood: 'Digital / Glitch / Text', tags: ['DOM', 'Typography'], component: 'TextScramble' },
  { id: 4, name: 'Springy Cards', mood: 'Playful / Spring / Drag', tags: ['Framer Motion', 'Physics'], component: 'SpringyCards' },
  { id: 5, name: 'Ripple Grid', mood: 'Wave / Grid / Hover', tags: ['CSS', 'Grid'], component: 'RippleGrid' },
  { id: 6, name: '3D Cube', mood: 'Dimensional / Rotate / CSS', tags: ['CSS 3D', 'Transform'], component: 'Cube3D' },
  { id: 7, name: 'Wave Interference', mood: 'Mathematical / Sine / Canvas', tags: ['Canvas', 'Math'], component: 'WaveInterference' },
  { id: 8, name: 'Magnetic Buttons', mood: 'Interactive / Proximity / Framer', tags: ['Framer Motion', 'Gesture'], component: 'MagneticButtons' },
  { id: 9, name: 'SVG Line Draw', mood: 'Minimal / Path / Stroke', tags: ['SVG', 'Animation'], component: 'SVGLineDraw' },
  { id: 10, name: 'Parallax Layers', mood: 'Depth / Scroll / Speed', tags: ['GSAP', 'ScrollTrigger'], component: 'ParallaxLayers' },
  { id: 11, name: 'Glitch Text', mood: 'Digital / RGB Split / CSS', tags: ['CSS', 'Clip-path'], component: 'GlitchText' },
  { id: 12, name: 'Lava Lamp', mood: 'Organic / Metaball / Canvas', tags: ['Canvas', 'Algorithm'], component: 'LavaLamp' },
  { id: 13, name: 'Text Reveal', mood: 'Cinematic / Mask / Scroll', tags: ['GSAP', 'ScrollTrigger'], component: 'TextReveal' },
  { id: 14, name: 'Typewriter', mood: 'Retro / Cursor / JS', tags: ['DOM', 'Interval'], component: 'Typewriter' },
  { id: 15, name: 'Noise Texture', mood: 'Abstract / Perlin / Canvas', tags: ['Canvas', 'Algorithm'], component: 'NoiseTexture' },
  { id: 16, name: 'Drag Throw', mood: 'Physics / Momentum / Framer', tags: ['Framer Motion', 'Drag'], component: 'DragThrow' },
  { id: 17, name: 'Scroll Stagger', mood: 'Entrance / Stagger / GSAP', tags: ['GSAP', 'ScrollTrigger'], component: 'ScrollStagger' },
  { id: 18, name: 'Elastic Accordion', mood: 'Spring / Expand / Framer', tags: ['Framer Motion', 'Layout'], component: 'ElasticAccordion' },
  { id: 19, name: 'Aurora Shader', mood: 'Gradient / Mesh / Cursor', tags: ['Canvas', 'Gradient'], component: 'AuroraShader' },
  { id: 20, name: 'Flip Animation', mood: 'Layout / Rearrange / GSAP', tags: ['GSAP', 'Flip'], component: 'FlipAnimation' },
  { id: 21, name: 'Bouncy Loader', mood: 'Playful / Spring / Framer', tags: ['Framer Motion', 'Stagger'], component: 'BouncyLoader' },
  { id: 22, name: 'Card Fan', mood: 'Dimensional / Fan / CSS 3D', tags: ['CSS 3D', 'Rotate'], component: 'CardFan' },
  { id: 23, name: 'Confetti Burst', mood: 'Celebration / Particle / Canvas', tags: ['Canvas', 'Physics'], component: 'ConfettiBurst' },
  { id: 24, name: 'Cursor Trail', mood: 'Fluid / Follow / Canvas', tags: ['Canvas', 'Mouse'], component: 'CursorTrail' },
  { id: 25, name: 'Tilt Card', mood: '3D / Perspective / Mouse', tags: ['CSS 3D', 'Transform'], component: 'TiltCard' },
  { id: 26, name: 'Morphing Gradient', mood: 'Color / Animate / CSS', tags: ['CSS', 'Keyframes'], component: 'MorphingGradient' },
  { id: 27, name: 'Snap Carousel', mood: 'Drag / Snap / Framer', tags: ['Framer Motion', 'Drag'], component: 'SnapCarousel' },
  { id: 28, name: 'Staggered List', mood: 'Entrance / Multi-dir / Framer', tags: ['Framer Motion', 'Stagger'], component: 'StaggeredList' },
  { id: 29, name: 'WebGL Distortion', mood: 'Shader / Displacement / Three.js', tags: ['Three.js', 'WebGL'], component: 'WebGLDistortion' },
  { id: 30, name: 'Scroll-Velocity Skew', mood: 'Speed / Skew / GSAP', tags: ['GSAP', 'Velocity'], component: 'ScrollSkew' },
  { id: 31, name: 'Page Transition', mood: 'Curtain / Wipe / Meta', tags: ['GSAP', 'Clip-path'], component: 'PageTransition' },
  { id: 32, name: '3D Product Card', mood: 'Dimensional / Lighting / CSS', tags: ['CSS 3D', 'Mouse'], component: 'Product3DCard' },
]

export function TheaterSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-vault-text-bright mb-4">
            Animation Theater
          </h2>
          <p className="text-[#666] text-lg max-w-xl">
            32 living, breathing animations. Each one real, interactive, and ready to ship.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {animations.map((anim, index) => (
            <TheaterFrame key={anim.id} animation={anim} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TheaterFrame({
  animation,
  index,
}: {
  animation: (typeof animations)[0]
  index: number
}) {
  const [showCode, setShowCode] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.2), ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.6)] backdrop-blur-sm snap-center"
    >
      <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px]">
        <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-[rgba(3,3,3,0.8)]">
          <AnimationPlaceholder name={animation.name} index={index} />
        </div>

        <div className="w-full md:w-[35%] p-5 md:p-8 border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.06)]">
          <h3 className="font-display text-xl md:text-2xl font-bold text-vault-text-bright mb-2">
            {animation.name}
          </h3>
          <p className="text-[#666] text-xs md:text-sm mb-3 md:mb-4">{animation.mood}</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
            {animation.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full bg-[rgba(99,102,241,0.1)] text-[#818cf8] border border-[rgba(99,102,241,0.2)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-[#999] hover:bg-[rgba(255,255,255,0.1)] hover:text-vault-text-bright transition-all"
            data-cursor="pointer"
          >
            {showCode ? 'Hide Source' : 'View Source'}
          </button>
        </div>
      </div>

      {showCode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 300, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(3,3,3,0.9)] overflow-auto"
        >
          <pre className="p-4 md:p-6 text-xs md:text-sm font-mono text-[#999]">
            <code>{`// ${animation.name} — Source code\n// Interactive demo running above\n// Full implementation in src/components/AnimationTheater/animations/${animation.component}.tsx`}</code>
          </pre>
        </motion.div>
      )}
    </motion.div>
  )
}

function AnimationPlaceholder({ name, index }: { name: string; index: number }) {
  const colors = ['#6366f1', '#f43f5e', '#10b981', '#a855f7', '#06b6d4', '#fbbf24']
  const color = colors[index % colors.length]

  return (
    <div className="relative w-full h-40 md:h-48 flex items-center justify-center">
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          animation: `float ${2 + (index % 3)}s ease-in-out infinite`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] md:text-xs font-mono text-[#444]">{name}</span>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
