import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { toCanvas } from 'html-to-image';

const VoxelTransition = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  
  // Configuration
  const ROWS = 20; 
  const COLS = 35; 

  useImperativeHandle(ref, () => ({
    triggerTransition: async (clientX, clientY) => {
      // Step 1: Normalize Origin Coordinates
      const originX = clientX / window.innerWidth;
      const originY = 1.0 - (clientY / window.innerHeight);

      const container = containerRef.current;
      if (!container) return;
      
      const containerElement = document.getElementById('root') || document.body;
      
      // Inject a global style to completely STRIP CSS animations.
      // This is CRITICAL because the cloned SVG resets the timeline to 0s, 
      // causing the <ScrollReveal> components to be permanently stuck at opacity: 0!
      // By using animation: none, they instantly fall back to their natural opacity: 1.
      const captureFixStyle = document.createElement('style');
      captureFixStyle.innerHTML = `
        * {
          animation: none !important;
        }
        html, body, #root, #root > div {
          overflow: visible !important;
          height: auto !important;
          min-height: auto !important;
        }
      `;
      document.head.appendChild(captureFixStyle);
      
      // Wait one frame to ensure the browser applies the style
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Temporary fix for 'fixed' nav bar so it appears correctly in a full-document capture
      const nav = document.querySelector('nav');
      let originalNavPos = '';
      let originalNavTop = '';
      if (nav) {
        originalNavPos = nav.style.position;
        originalNavTop = nav.style.top;
        nav.style.position = 'absolute';
        nav.style.top = window.scrollY + 'px';
      }

      let canvas;
      let originalContainerHeight = '';
      try {
        const fullWidth = document.documentElement.scrollWidth;
        const fullHeight = document.documentElement.scrollHeight;
        
        originalContainerHeight = containerElement.style.height;
        containerElement.style.height = fullHeight + 'px';
        
        // Add a small delay to ensure height style is fully applied by the browser
        await new Promise(resolve => requestAnimationFrame(resolve));

        // Capture the FULL document by explicitly forcing scroll dimensions
        const capturePromise = toCanvas(containerElement, {
          pixelRatio: 1,
          width: fullWidth,
          height: fullHeight,
          backgroundColor: '#ffffff',
          style: {
            transform: 'none'
          },
          filter: (node) => {
            if (node.id === 'voxel-container') return false;
            if (node.className && typeof node.className === 'string' && node.className.includes('bg-white') && node.className.includes('fixed inset-0')) {
              return false;
            }
            return true;
          }
        });
        
        // 5-second safety timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("html-to-image timeout exceeded")), 5000);
        });

        canvas = await Promise.race([capturePromise, timeoutPromise]);
      } catch (err) {
        console.warn("VoxelTransition capture failed or timed out:", err);
        return; // Resolve the promise immediately so the UI doesn't freeze
      } finally {
        // Restore nav
        if (nav) {
          nav.style.position = originalNavPos;
          nav.style.top = originalNavTop;
        }
        
        // Remove the CSS animation and layout overrides
        if (captureFixStyle && captureFixStyle.parentNode) {
          captureFixStyle.parentNode.removeChild(captureFixStyle);
        }
        
        // Restore container height
        containerElement.style.height = originalContainerHeight;
      }


      const texture = new THREE.CanvasTexture(canvas);
      
      // Calculate crop rect to map the full-document texture to just the viewport
      const pixelRatio = 1;
      const docW = canvas.width / pixelRatio;
      const docH = canvas.height / pixelRatio;
      
      const ratioX = window.innerWidth / docW;
      const ratioY = window.innerHeight / docH;
      
      const offsetX = window.scrollX / docW;
      const offsetY = 1.0 - ((window.scrollY + window.innerHeight) / docH);
      
      const uCrop = new THREE.Vector4(offsetX, offsetY, ratioX, ratioY);
      
      container.style.opacity = '1';
      container.style.pointerEvents = 'all';

      // Setup Three.js
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      const cameraZ = 50;
      camera.position.z = cameraZ;
      const fovY = camera.fov * (Math.PI / 180);
      const viewHeight = 2 * Math.tan(fovY / 2) * cameraZ;
      const viewWidth = viewHeight * camera.aspect;

      const scene = new THREE.Scene();

      const count = ROWS * COLS;
      
      const voxelW = viewWidth / COLS;
      const voxelH = viewHeight / ROWS;
      const voxelD = voxelW * 0.8; // Give them some thickness
      
      // Use a bevel-like geometry for a better glass edge catching light
      const geometry = new THREE.BoxGeometry(voxelW, voxelH, voxelD);

      // Glass Material with Chromatic Aberration Custom Shader
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uRows: { value: ROWS },
          uCols: { value: COLS },
          uViewW: { value: viewWidth },
          uViewH: { value: viewHeight },
          uCrop: { value: uCrop }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          
          uniform float uRows;
          uniform float uCols;
          uniform float uViewW;
          uniform float uViewH;
          
          void main() {
            vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
            vec4 mvPosition = viewMatrix * worldPosition;
            gl_Position = projectionMatrix * mvPosition;
            
            vViewPosition = -mvPosition.xyz;
            
            mat3 instanceNormalMatrix = mat3(instanceMatrix);
            vNormal = normalize(normalMatrix * instanceNormalMatrix * normal);
            
            float posX = instanceMatrix[3][0];
            float posY = instanceMatrix[3][1];
            
            vec2 localUv = uv - 0.5;
            
            float normLocalX = localUv.x * (1.0 / uCols);
            float normLocalY = localUv.y * (1.0 / uRows);
            
            float normalizedX = (posX / uViewW) + 0.5 + normLocalX;
            float normalizedY = (posY / uViewH) + 0.5 + normLocalY;
            
            vUv = vec2(normalizedX, normalizedY);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          uniform sampler2D uTexture;
          uniform vec4 uCrop;
          
          vec2 mapUv(vec2 uv) {
            // Visual scale adjustment: slightly scale down the image
            // Lower than 1.0 = Zoom Out (smaller image)
            // Higher than 1.0 = Zoom In (larger image)
            float zoom = 0.98; 
            
            // Center the UV, scale it, and uncenter
            vec2 scaledUv = ((uv - 0.5) / zoom) + 0.5;
            
            return vec2(
              scaledUv.x * uCrop.z + uCrop.x,
              scaledUv.y * uCrop.w + uCrop.y
            );
          }
          
          void main() {
            if(vUv.x < 0.0 || vUv.x > 1.0 || vUv.y < 0.0 || vUv.y > 1.0) {
              discard;
            }
            
            vec3 viewDir = normalize(vViewPosition);
            vec3 normal = normalize(vNormal);
            
            // Fresnel for edge highlights and aberration intensity
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
            
            // Chromatic Aberration: Shift RGB slightly based on viewing angle
            float shift = 0.015 * fresnel;
            
            vec2 tUv = mapUv(vUv);
            
            float r = texture2D(uTexture, tUv + vec2(shift, shift)).r;
            float g = texture2D(uTexture, tUv).g;
            float b = texture2D(uTexture, tUv - vec2(shift, shift)).b;
            vec3 glassColor = vec3(r, g, b);
            
            // Specular Glare (Shiny glass)
            vec3 lightDir = normalize(vec3(0.5, 1.0, 1.0));
            vec3 halfVector = normalize(lightDir + viewDir);
            float specular = pow(max(dot(normal, halfVector), 0.0), 60.0);
            glassColor += vec3(specular) * 0.9;
            
            // Seamless Integration: If normal is perfectly flat towards camera (z=1), no effects.
            float isFlatFront = smoothstep(0.99, 1.0, normal.z);
            
            vec4 pureTexture = texture2D(uTexture, tUv);
            vec3 finalColor = mix(glassColor, pureTexture.rgb, isFlatFront);
            
            // Alpha: slightly transparent on sides
            float alpha = mix(0.9, 1.0, isFlatFront);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true
      });

      const mesh = new THREE.InstancedMesh(geometry, material, count);
      
      const dummy = new THREE.Object3D();
      const instancesData = [];
      let i = 0;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          
          const posX = (x - (COLS / 2) + 0.5) * voxelW;
          const posY = (y - (ROWS / 2) + 0.5) * voxelH;
          
          dummy.position.set(posX, posY, 0);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          
          const normX = x / COLS;
          const normY = y / ROWS;
          
          const dist = Math.sqrt(
            Math.pow(normX - originX, 2) + 
            Math.pow(normY - originY, 2)
          );
          
          // Pre-calculate highly dynamic scatter paths
          const dirX = (normX - originX);
          const dirY = (normY - originY);
          // Explode outwards and towards camera
          const targetX = posX + dirX * (Math.random() * 30 + 10);
          const targetY = posY + dirY * (Math.random() * 30 + 10);
          const targetZ = Math.random() * 30 + 10;
          
          // Random spin
          const rotX = (Math.random() - 0.5) * Math.PI * 4;
          const rotY = (Math.random() - 0.5) * Math.PI * 4;
          const rotZ = (Math.random() - 0.5) * Math.PI * 2;

          instancesData.push({
            startX: posX, startY: posY, startZ: 0,
            targetX, targetY, targetZ,
            rotX, rotY, rotZ,
            dist
          });
          
          i++;
        }
      }
      
      scene.add(mesh);

      // Animation Loop
      const progressArray = new Array(count).fill(0);
      let activeTweens = count;
      let isDisposed = false;
      
      instancesData.forEach((data, index) => {
        gsap.to(progressArray, {
          [index]: 1,
          duration: 1.5 + Math.random() * 0.8, // Variable duration for chaos
          ease: "expo.inOut", 
          delay: data.dist * 0.7, // Radial ripple delay
          onUpdate: () => {
            if (isDisposed) return;
            const p = progressArray[index];
            
            // Layered easing for different properties
            const posP = gsap.parseEase("power3.inOut")(p);
            const rotP = gsap.parseEase("back.out(1.5)")(p);
            const scaleP = gsap.parseEase("power2.in")(p);
            
            dummy.position.set(
              data.startX + (data.targetX - data.startX) * posP,
              data.startY + (data.targetY - data.startY) * posP,
              data.startZ + (data.targetZ - data.startZ) * posP
            );
            
            dummy.rotation.set(
              data.rotX * rotP,
              data.rotY * rotP,
              data.rotZ * rotP
            );
            
            // Shrink away
            dummy.scale.setScalar(1.0 - (scaleP * 0.99));
            
            dummy.updateMatrix();
            mesh.setMatrixAt(index, dummy.matrix);
          },
          onComplete: () => {
             activeTweens--;
             if (activeTweens === 0 && !isDisposed) {
                isDisposed = true;
                setTimeout(() => {
                  container.style.opacity = '0';
                  container.style.pointerEvents = 'none';
                  if (container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                  }
                  geometry.dispose();
                  material.dispose();
                  texture.dispose();
                  renderer.dispose();
                  
                  if (props.onComplete) props.onComplete();
                }, 100);
             }
          }
        });
      });

      const animate = () => {
        if(isDisposed) return; 
        requestAnimationFrame(animate);
        mesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();
    }
  }));

  return (
    <div 
      id="voxel-container"
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        backgroundColor: 'transparent'
      }} 
    />
  );
});

export default VoxelTransition;
