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

      // Normalize coordinates
      const x = clientX / window.innerWidth;
      const y = 1.0 - (clientY / window.innerHeight);

      if (materialRef.current) {
        materialRef.current.uniforms.uOrigin.value.set(x, y);
        materialRef.current.uniforms.uColor.value.set(targetColor);
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsActive(false);
        }
      });

      // Phase 1: Expand the liquid mask
      let midpointFired = false;
      
      timeline.to(materialRef.current.uniforms.uProgress, {
        value: 1.0,
        duration: DURATION,
        ease: "power2.inOut",
        onUpdate: () => {
          // Smart sequencing: Fire the callback at the peak (when screen is obscured)
          if (materialRef.current.uniforms.uProgress.value >= 0.5 && !midpointFired) {
            midpointFired = true;
            if (onMidpoint) onMidpoint();
          }
        }
      });
      
      // Reset after transition
      timeline.set(materialRef.current.uniforms.uProgress, { value: 0 });
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

        // Simplified Noise for performance and reliability
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          vec3 g = a0 * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
          vec3 l = 1.79284291400159 - 0.85373472095314 * ( g*g + h*h );
          vec3 v_res;
          v_res.x = g.x * l.x;
          v_res.y = g.y * l.y;
          v_res.z = g.z * l.z;
          return 130.0 * dot(m, v_res);
        }

        void main() {
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 uv = vUv * aspect;
          vec2 origin = uOrigin * aspect;

          float d = distance(uv, origin);
          
          float progress = uProgress;
          
          // Phase 1: Expand circle from 0.0 to 0.5
          float fill = smoothstep(0.0, 0.5, progress);
          // Phase 2: Reveal background from 0.5 to 1.0
          float drain = smoothstep(0.5, 1.0, progress);
          
          // Multi-layered noise for "liquid" feel
          float noise = snoise(vUv * 2.0 + uTime * 0.3) * 0.2;
          noise += snoise(vUv * 4.0 - uTime * 0.2) * 0.1;
          
          // Liquid radius calculation
          float radius = fill * 2.5; // Enough to cover screen
          float innerRadius = drain * 3.0; // Enough to clear screen
          
          // Main blob mask
          float mask = smoothstep(radius + noise, radius + noise - 0.1, d);
          // Inner clearing mask
          float innerMask = smoothstep(innerRadius + noise, innerRadius + noise - 0.1, d);
          
          float finalAlpha = clamp(mask - innerMask, 0.0, 1.0);
          
          if (finalAlpha < 0.01) discard;
          
          // Multiply alpha by 0.8 to make it semi-transparent
          // This allows the user to see the UI elements physically morphing underneath
          gl_FragColor = vec4(uColor, finalAlpha * 0.8);
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
