import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useCanvasPause } from '../../../hooks/useCanvasPause'

export function WebGLDistortion() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(true)
  const { ref: wrapperRef, isVisible } = useCanvasPause(0)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = 320
    const h = 280

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    cameraRef.current = camera

    const vertexShader = `
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec2 pos = position.xy;
        float dist = distance(pos, uMouse);
        float wave = sin(dist * 10.0 - uTime * 3.0) * 0.05 * smoothstep(0.5, 0.0, dist);
        pos += normalize(pos - uMouse) * wave;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        float r = sin(vUv.x * 3.0 + uTime) * 0.5 + 0.5;
        float g = sin(vUv.y * 4.0 + uTime * 1.3) * 0.5 + 0.5;
        float b = sin((vUv.x + vUv.y) * 2.5 + uTime * 0.7) * 0.5 + 0.5;
        vec3 color = mix(vec3(0.39, 0.4, 0.95), vec3(0.96, 0.25, 0.37), r);
        color = mix(color, vec3(0.06, 0.73, 0.51), g * 0.3);
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
      },
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let time = 0

    const animate = () => {
      if (!isVisibleRef.current) return
      time += 0.016
      material.uniforms.uTime.value = time
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
      renderer.render(scene, camera)
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    container.addEventListener('mousemove', onMouseMove)

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animRef.current)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="max-w-[320px] max-h-[280px] cursor-crosshair rounded-lg overflow-hidden" />
    </div>
  )
}
