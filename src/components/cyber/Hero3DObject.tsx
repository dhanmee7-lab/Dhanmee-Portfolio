import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Premium Floating Black-Chrome and Brushed-Titanium 3D Sculpture
 * - Sophisticated faceted dodecahedral titanium centerpiece with studio specular luster
 * - Physically based materials (metalness 0.90, roughness 0.22, flat-faceted shading)
 * - Studio environment map providing authentic chrome reflections and emerald rim highlights
 * - Inner glowing emerald reactor core pulsing with gentle respiratory frequency
 * - Two proportionate, solid metallic orbital rings angled in 3D space with independent kinetic rotation
 * - Precision satellite beacon nodes tracing orbits
 * - Grounded floor contact shadow
 * - Pointer-driven inertia tilt and smooth natural animation
 * - Full operator priorities panel with completely rendered labels (never truncated)
 */
export function Hero3DObject() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 5.3);

    // 2. Studio Lighting & Procedural Environment Reflection Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext("2d");
    if (envCtx) {
      envCtx.fillStyle = "#020503";
      envCtx.fillRect(0, 0, 512, 256);

      // Studio key softbox (white-emerald specular source)
      const keyGrad = envCtx.createRadialGradient(140, 60, 0, 140, 60, 100);
      keyGrad.addColorStop(0, "#ffffff");
      keyGrad.addColorStop(0.35, "#e8ffef");
      keyGrad.addColorStop(0.75, "#254a33");
      keyGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = keyGrad;
      envCtx.fillRect(40, 0, 200, 160);

      // Neon emerald rim light strip
      const rimGrad = envCtx.createRadialGradient(380, 120, 0, 380, 120, 90);
      rimGrad.addColorStop(0, "#39ff88");
      rimGrad.addColorStop(0.4, "#1d723f");
      rimGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = rimGrad;
      envCtx.fillRect(290, 30, 180, 180);

      // Moss fill reflection
      const fillGrad = envCtx.createRadialGradient(256, 210, 0, 256, 210, 80);
      fillGrad.addColorStop(0, "#6d8f63");
      fillGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = fillGrad;
      envCtx.fillRect(176, 130, 160, 120);
    }

    const envTexture = new THREE.CanvasTexture(envCanvas);
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    envTexture.dispose();
    pmremGenerator.dispose();

    // Direct Studio Lights
    const ambientLight = new THREE.AmbientLight(0x0c1810, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(-3.5, 4.5, 4.2);
    scene.add(keyLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x39ff88, 3.8);
    emeraldRimLight.position.set(3.8, -2.2, -2.5);
    scene.add(emeraldRimLight);

    const fillLight = new THREE.PointLight(0x6d8f63, 1.8, 12);
    fillLight.position.set(0, 3, 2);
    scene.add(fillLight);

    // 3. Materials
    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1f2e26,
      metalness: 0.92,
      roughness: 0.22,
      flatShading: true,
      emissive: 0x051a0e,
      emissiveIntensity: 0.2,
      envMapIntensity: 1.4,
    });

    const titaniumRingMat1 = new THREE.MeshStandardMaterial({
      color: 0x24362b,
      metalness: 0.95,
      roughness: 0.16,
      emissive: 0x082414,
      emissiveIntensity: 0.25,
      envMapIntensity: 1.6,
    });

    const titaniumRingMat2 = new THREE.MeshStandardMaterial({
      color: 0x1c2a22,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x051c0f,
      emissiveIntensity: 0.2,
      envMapIntensity: 1.5,
    });

    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x39ff88,
      emissive: 0x39ff88,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.5,
      flatShading: true,
    });

    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x39ff88,
    });

    // Tracking for cleanup
    const disposables: { dispose: () => void }[] = [
      envMap,
      darkTitaniumMat,
      titaniumRingMat1,
      titaniumRingMat2,
      innerCoreMat,
      beaconMat,
    ];

    // Root interactive group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Sculpture Centerpiece Group
    const sculptureGroup = new THREE.Group();
    rootGroup.add(sculptureGroup);

    // Outer Faceted Titanium Centerpiece (Faceted Dodecahedron)
    const outerGeom = new THREE.DodecahedronGeometry(1.0, 0);
    disposables.push(outerGeom);
    const outerMesh = new THREE.Mesh(outerGeom, darkTitaniumMat);
    sculptureGroup.add(outerMesh);

    // Refined subtle edge wire highlight (emerald reflection on chamfers)
    const wireGeom = new THREE.WireframeGeometry(outerGeom);
    disposables.push(wireGeom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x39ff88,
      transparent: true,
      opacity: 0.18,
    });
    disposables.push(wireMat);
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
    outerMesh.add(wireMesh);

    // Inner Glowing Emerald Reactor Core
    const innerGeom = new THREE.OctahedronGeometry(0.5, 0);
    disposables.push(innerGeom);
    const innerMesh = new THREE.Mesh(innerGeom, innerCoreMat);
    sculptureGroup.add(innerMesh);

    // 4. Two Proportionate, Solid Metallic Orbital Rings
    // Inner Ring: Radius 1.48, Tube 0.032
    const innerRingGeom = new THREE.TorusGeometry(1.48, 0.032, 16, 96);
    disposables.push(innerRingGeom);

    const innerRingGroup = new THREE.Group();
    innerRingGroup.rotation.set(Math.PI / 4, Math.PI / 10, 0);
    rootGroup.add(innerRingGroup);

    const innerRingMesh = new THREE.Mesh(innerRingGeom, titaniumRingMat1);
    innerRingGroup.add(innerRingMesh);

    // Satellite node on inner ring
    const innerBeadGeom = new THREE.SphereGeometry(0.045, 12, 12);
    disposables.push(innerBeadGeom);
    const innerBead = new THREE.Mesh(innerBeadGeom, beaconMat);
    innerBead.position.set(1.48, 0, 0);
    innerRingGroup.add(innerBead);

    // Outer Ring: Radius 1.85, Tube 0.026
    const outerRingGeom = new THREE.TorusGeometry(1.85, 0.026, 16, 96);
    disposables.push(outerRingGeom);

    const outerRingGroup = new THREE.Group();
    outerRingGroup.rotation.set(-Math.PI / 3.2, 0, Math.PI / 5);
    rootGroup.add(outerRingGroup);

    const outerRingMesh = new THREE.Mesh(outerRingGeom, titaniumRingMat2);
    outerRingGroup.add(outerRingMesh);

    // Satellite node on outer ring
    const outerBeadGeom = new THREE.SphereGeometry(0.04, 12, 12);
    disposables.push(outerBeadGeom);
    const outerBead = new THREE.Mesh(outerBeadGeom, beaconMat);
    outerBead.position.set(1.85, 0, 0);
    outerRingGroup.add(outerBead);

    // Floor Contact Shadow (Soft Radial Disc below sculpture)
    const shadowGeom = new THREE.PlaneGeometry(3.0, 1.4);
    disposables.push(shadowGeom);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.85)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    disposables.push(shadowTex);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    disposables.push(shadowMat);
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.set(0, -1.6, 0);
    shadowMesh.rotation.x = -Math.PI / 2;
    rootGroup.add(shadowMesh);

    // 5. Responsive Resize
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // 6. Interactive Inertia Drag / Pointer Move
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        pointer.targetY += dx * 0.008;
        pointer.targetX += dy * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointer.targetY = nx * 0.45;
        pointer.targetX = -ny * 0.35;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerLeave = () => {
      isDragging = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 7. Animation Loop
    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Pointer inertia damping
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;

      rootGroup.rotation.x = pointer.currentX;
      rootGroup.rotation.y = pointer.currentY;

      // Smooth, natural orbital kinetics
      sculptureGroup.rotation.y += 0.003;
      sculptureGroup.rotation.x = Math.sin(elapsed * 0.35) * 0.08;

      // Independent ring rotations
      innerRingMesh.rotation.z += 0.0045;
      outerRingMesh.rotation.z -= 0.0032;

      // Animate satellite nodes on the rings
      innerBead.position.x = Math.cos(elapsed * 0.8) * 1.48;
      innerBead.position.y = Math.sin(elapsed * 0.8) * 1.48;

      outerBead.position.x = Math.cos(-elapsed * 0.6) * 1.85;
      outerBead.position.y = Math.sin(-elapsed * 0.6) * 1.85;

      // Inner core breathing pulse
      innerCoreMat.emissiveIntensity = 0.65 + Math.sin(elapsed * 2.0) * 0.28;
      innerMesh.rotation.y -= 0.006;
      innerMesh.rotation.z += 0.004;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerLeave);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-full min-h-[440px] max-h-[540px] w-full flex-col justify-between overflow-hidden rounded-lg border border-border/70 bg-[#070c09]/92 p-5 sm:p-6 backdrop-blur-md shadow-[0_0_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-primary/40 group"
    >
      {/* Precision Micro-Accents */}
      <div className="pointer-events-none absolute top-2 left-2 font-mono text-[8px] text-moss/50 tracking-widest">
        // TITANIUM-CORE
      </div>
      <div className="pointer-events-none absolute top-2 right-2 font-mono text-[8px] text-primary/70 tracking-widest flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        {hovered ? "SYNCED" : "ONLINE"}
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/80 pt-1 pb-3 font-mono text-[10px] tracking-[0.25em]">
        <div className="flex items-center gap-2 text-primary">
          <span className="h-2 w-[2px] bg-primary" />
          <span>TITANIUM SCULPTURE // 3D CORE</span>
        </div>
        <div className="text-[9px] text-moss font-mono tracking-widest hidden sm:block">
          ORBITAL GIMBAL
        </div>
      </div>

      {/* Center 3D WebGL Canvas */}
      <div className="relative flex-1 min-h-[260px] max-h-[350px] w-full overflow-hidden py-1">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          aria-label="Floating Black Chrome and Titanium 3D Sculpture"
        />
        <div className="pointer-events-none absolute bottom-1 right-2 z-10 font-mono text-[8px] tracking-[0.2em] text-moss/60">
          DRAG / HOVER TO ROTATE
        </div>
      </div>

      {/* Bottom Operator Priorities Deck */}
      <div className="relative z-10 border-t border-border/80 pt-3.5 font-mono">
        <div className="mb-2.5 flex items-center justify-between text-[9px] tracking-[0.2em] text-primary/85">
          <span>OPERATOR PRIORITIES</span>
          <span className="text-moss">2026 // DEFENSE</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { code: "SEC-01", label: "SECURITY" },
            { code: "INN-02", label: "INNOVATION" },
            { code: "RES-03", label: "RESILIENCE" },
            { code: "FUT-04", label: "A BETTER FUTURE", highlight: true },
          ].map((item) => (
            <div
              key={item.code}
              className={`flex flex-col items-center justify-center rounded border px-2 py-2 text-center transition-all ${
                item.highlight
                  ? "border-primary/50 bg-primary/10 text-primary text-glow font-bold"
                  : "border-moss/30 bg-background/80 text-foreground hover:border-primary/40"
              }`}
            >
              <span className="text-[8px] sm:text-[8.5px] tracking-widest text-primary/70">
                {item.code}
              </span>
              <span className="mt-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
