"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Shader for the liquid epoxy spreading effect
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uConcreteColor;
  uniform vec3 uEpoxyColor1;
  uniform vec3 uEpoxyColor2;
  uniform vec3 uMetallicColor;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 center = vec2(0.5, 0.0);
    float dist = distance(vUv, center);
    
    // Create organic spreading edge
    float noise1 = snoise(vUv * 4.0 + uTime * 0.1) * 0.15;
    float noise2 = snoise(vUv * 8.0 - uTime * 0.05) * 0.08;
    float organicDist = dist + noise1 + noise2;
    
    // Progress controls the spread radius
    float spreadRadius = uProgress * 1.8;
    float edgeWidth = 0.15;
    
    // Calculate mask for epoxy spread
    float mask = smoothstep(spreadRadius, spreadRadius - edgeWidth, organicDist);
    
    // Concrete texture
    float concreteNoise = snoise(vUv * 20.0) * 0.1;
    vec3 concrete = uConcreteColor + concreteNoise;
    
    // Metallic epoxy with shimmer
    float shimmer = snoise(vUv * 30.0 + uTime * 0.5) * 0.5 + 0.5;
    float metallic = snoise(vUv * 15.0 + vec2(uTime * 0.2, 0.0)) * 0.5 + 0.5;
    
    vec3 epoxyBase = mix(uEpoxyColor1, uEpoxyColor2, metallic);
    vec3 epoxyFinal = mix(epoxyBase, uMetallicColor, shimmer * 0.3);
    
    // Add glossy highlight
    float highlight = pow(max(0.0, 1.0 - abs(vUv.x - 0.5) * 2.0), 3.0) * 0.2;
    epoxyFinal += highlight * mask;
    
    // Edge glow effect
    float edgeMask = smoothstep(spreadRadius - edgeWidth * 0.5, spreadRadius, organicDist);
    edgeMask *= smoothstep(spreadRadius, spreadRadius - edgeWidth, organicDist);
    vec3 edgeGlow = uMetallicColor * edgeMask * 0.5;
    
    // Final color
    vec3 finalColor = mix(concrete, epoxyFinal, mask) + edgeGlow;
    
    // Add reflection effect on epoxy
    float reflection = pow(shimmer, 2.0) * mask * 0.15;
    finalColor += reflection;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function EpoxyFloor({ onComplete }: { onComplete?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progressRef = useRef(0)
  const [isComplete, setIsComplete] = useState(false)
  const hasCalledComplete = useRef(false)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uConcreteColor: { value: new THREE.Color(0.35, 0.35, 0.38) },
      uEpoxyColor1: { value: new THREE.Color(0.15, 0.15, 0.18) },
      uEpoxyColor2: { value: new THREE.Color(0.25, 0.28, 0.35) },
      uMetallicColor: { value: new THREE.Color(0.4, 0.5, 0.7) },
    }),
    []
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.uTime.value = state.clock.elapsedTime

    // Animate progress over 2.5 seconds with easing
    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta * 0.4, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progressRef.current, 3)
      material.uniforms.uProgress.value = eased
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete && !hasCalledComplete.current) {
        hasCalledComplete.current = true
        onComplete()
      }
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[4, 3, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function Scene({ onComplete }: { onComplete?: () => void }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 1.5, 2)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-2, 3, 2]} intensity={0.5} color="#6699ff" />
      <EpoxyFloor onComplete={onComplete} />
    </>
  )
}

interface EpoxyAnimationProps {
  onComplete?: () => void
  className?: string
}

export function EpoxyAnimation({ onComplete, className }: EpoxyAnimationProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Detect low-power devices
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    // Check for low-power device indicators
    const checkLowPower = () => {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl")
      if (!gl) {
        setIsLowPower(true)
        return
      }
      
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        // Check for software renderers or low-end GPUs
        if (renderer.includes("SwiftShader") || renderer.includes("Software")) {
          setIsLowPower(true)
        }
      }
      
      // Also check for mobile with limited cores
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        setIsLowPower(true)
      }
    }

    checkLowPower()
  }, [])

  // Fallback for low-power devices or WebGL errors
  if (isLowPower || hasError) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-concrete to-metallic-blue animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className="!absolute inset-0"
      >
        <Scene onComplete={onComplete} />
      </Canvas>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent pointer-events-none" />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-metallic-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
