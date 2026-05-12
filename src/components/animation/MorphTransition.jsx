import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const MorphTransition = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const requestRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Configuration
  const DURATION = 0.8; // Faster, snappier transition

  useImperativeHandle(ref, () => ({
    trigger: (clientX, clientY, targetColor, onMidpoint) => {
      if (isActive) return;
      setIsActive(true);

      const x = clientX / window.innerWidth;
      const y = 1.0 - (clientY / window.innerHeight);

      if (materialRef.current) {
        materialRef.current.uniforms.uOrigin.value.set(x, y);
        materialRef.current.uniforms.uColor.value.set(targetColor);
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsActive(false);
          if (materialRef.current) {
             gsap.set(materialRef.current.uniforms.uProgress, { value: 0 });
          }
        }
      });

      // Smarter dynamic sequence:
      // 1. Rapid expansion to cover screen
      // 2. Brief hold to allow for heavy DOM updates/navigation
      // 3. Fluid drain to reveal new content
      
      timeline.to(materialRef.current.uniforms.uProgress, {
        value: 0.5,
        duration: DURATION * 0.6,
        ease: "power3.in",
        onComplete: () => {
          if (onMidpoint) onMidpoint();
        }
      });

      timeline.to(materialRef.current.uniforms.uProgress, {
        value: 0.55, // Small movement during hold for "living" liquid feel
        duration: 0.2, // The "Hold" period
        ease: "none"
      });

      timeline.to(materialRef.current.uniforms.uProgress, {
        value: 1.0,
        duration: DURATION * 0.8,
        ease: "power3.out"
      });
    }
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup Three.js
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); // Disabled antialias for raw speed
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1); // Force pixelRatio 1 for massive GPU performance boost on Retina/4K displays
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uOrigin: { value: new THREE.Vector2(0.5, 0.5) },
        uColor: { value: new THREE.Color(0xdc2626) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uOrigin;
        uniform vec3 uColor;
        uniform vec2 uResolution;

        // Optimized Simplex Noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m*m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          vec3 g = a0 * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
          vec3 l = 1.79284291400159 - 0.85373472095314 * ( g*g + h*h );
          vec3 v_res = vec3(g.x * l.x, g.y * l.y, g.z * l.z);
          return 130.0 * dot(m, v_res);
        }

        void main() {
          vec2 uv = vUv;
          vec2 ratio = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 p = (uv - uOrigin) * ratio;
          float d = length(p);
          
          // Organic Liquid Dynamics
          float noise = snoise(uv * 1.5 + uTime * 0.2) * 0.15;
          noise += snoise(uv * 3.0 - uTime * 0.4) * 0.08;
          noise += snoise(uv * 6.0 + uTime * 0.1) * 0.04;
          
          // Sequencing
          // 0.0 -> 0.5: Expand (fill screen)
          // 0.5 -> 1.0: Drain (reveal screen)
          
          float fill = smoothstep(0.0, 0.5, uProgress);
          float drain = smoothstep(0.5, 1.0, uProgress);
          
          // Radius calculation for a perfect screen cover
          // A radius of ~1.5 covers the screen regardless of aspect ratio
          float radius = fill * 2.5; 
          float innerRadius = drain * 3.5;
          
          float mask = smoothstep(radius + noise, radius + noise - 0.15, d);
          float innerMask = smoothstep(innerRadius + noise, innerRadius + noise - 0.2, d);
          
          float finalAlpha = clamp(mask - innerMask, 0.0, 1.0);
          
          if (finalAlpha < 0.001) discard;
          
          // Premium feel: Deep saturation at the center, slight fade at edges
          vec3 color = mix(uColor * 0.8, uColor, finalAlpha);
          gl_FragColor = vec4(color, finalAlpha * 0.95);
        }
      `
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = (time) => {
      material.uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: isActive ? 'all' : 'none'
      }}
    />
  );
});

export default MorphTransition;
