import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Realistic Cinematic 3D Titanium Background with Dual Cobalt & Emerald Lighting
 * - Three genuine 3D perspective depth layers (Foreground, Midground, Background)
 * - Studio PMREM environment map providing authentic physical reflections on dark titanium
 * - Dual cinematic studio illumination: Primary Neon Emerald (#39FF88) rim on one flank,
 *   secondary Electric Cobalt Blue (#245BFF) ambient illumination on the opposing flank
 * - Mixed floating micro-dust particles: 80% emerald, 20% cobalt blue for atmospheric depth
 * - Unobstructed central column ensuring 100% text legibility across all sections
 * - Smooth camera scroll & pointer parallax across the full website
 * - 60 FPS performance: optimized geometries, pixel ratio clamping, pauses on tab hide
 */
export function DarkMetallicBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 1. Scene & Atmospheric Depth
    const scene = new THREE.Scene();
    const bgVoidColor = new THREE.Color(0x020503);
    scene.background = bgVoidColor;
    scene.fog = new THREE.FogExp2(0x020503, 0.018);

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      120,
    );
    camera.position.set(0, 0, 22);

    // 3. Studio Lighting & Procedural Environment Reflection Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 512;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext("2d");
    if (envCtx) {
      envCtx.fillStyle = "#020503";
      envCtx.fillRect(0, 0, 512, 256);

      // Studio key softbox reflection (white-emerald specular)
      const keyGrad = envCtx.createRadialGradient(140, 60, 0, 140, 60, 110);
      keyGrad.addColorStop(0, "#ffffff");
      keyGrad.addColorStop(0.35, "#e5faee");
      keyGrad.addColorStop(0.7, "#1d3a27");
      keyGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = keyGrad;
      envCtx.fillRect(40, 0, 200, 160);

      // Neon emerald rim light strip (Right Flank)
      const rimGrad = envCtx.createRadialGradient(380, 110, 0, 380, 110, 100);
      rimGrad.addColorStop(0, "#39ff88");
      rimGrad.addColorStop(0.45, "#13542c");
      rimGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = rimGrad;
      envCtx.fillRect(280, 20, 200, 180);

      // Electric Cobalt Blue rim light reflection strip (Left Flank)
      const cobaltGrad = envCtx.createRadialGradient(90, 160, 0, 90, 160, 85);
      cobaltGrad.addColorStop(0, "#245bff");
      cobaltGrad.addColorStop(0.35, "#0d2260");
      cobaltGrad.addColorStop(0.8, "#040b20");
      cobaltGrad.addColorStop(1, "transparent");
      envCtx.fillStyle = cobaltGrad;
      envCtx.fillRect(10, 80, 160, 160);

      // Muted moss fill reflection
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
    const ambientLight = new THREE.AmbientLight(0x091410, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe8fff0, 2.2);
    keyLight.position.set(-18, 22, 16);
    scene.add(keyLight);

    // Primary Neon Emerald Rim Light (Right Flank)
    const emeraldRimLight = new THREE.PointLight(0x39ff88, 5.0, 65, 1.6);
    emeraldRimLight.position.set(14, 6, -4);
    scene.add(emeraldRimLight);

    // Secondary Electric Cobalt Blue Ambient Rim Light (Left Flank)
    const cobaltRimLight = new THREE.DirectionalLight(0x245bff, 1.4);
    cobaltRimLight.position.set(-16, -10, -6);
    scene.add(cobaltRimLight);

    // Fill light (muted moss green)
    const fillLight = new THREE.DirectionalLight(0x6d8f63, 1.0);
    fillLight.position.set(16, -18, 10);
    scene.add(fillLight);

    // Horizon bounce light (deep titanium-cobalt bounce)
    const bottomBounce = new THREE.PointLight(0x08182b, 2.2, 50, 1.6);
    bottomBounce.position.set(0, -22, -12);
    scene.add(bottomBounce);

    // 4. Physically Based Materials
    const brushedTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x141f18,
      metalness: 0.92,
      roughness: 0.28,
      envMapIntensity: 1.4,
    });

    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x0c140f,
      metalness: 0.96,
      roughness: 0.16,
      envMapIntensity: 1.6,
    });

    // Root Group for architectural assemblies
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Track objects for disposal
    const disposables: { dispose: () => void }[] = [envMap, brushedTitaniumMat, darkChromeMat];

    // ==========================================
    // LAYER 1: BACKGROUND (Deep Monolithic Pillars & Massive Bulkheads, Z: -35 to -60)
    // ==========================================
    const bgGroup = new THREE.Group();
    worldGroup.add(bgGroup);

    const bgColGeom = new THREE.BoxGeometry(3.2, 65, 3.2);
    disposables.push(bgColGeom);

    const bgPillarPositions: [number, number, number][] = [
      [-28, 0, -45],
      [-16, 4, -52],
      [16, -4, -50],
      [30, 2, -48],
    ];

    bgPillarPositions.forEach(([x, y, z]) => {
      const colMesh = new THREE.Mesh(bgColGeom, brushedTitaniumMat);
      colMesh.position.set(x, y, z);
      colMesh.rotation.y = (Math.PI / 10) * (x > 0 ? 1 : -1);
      bgGroup.add(colMesh);
    });

    // Deep horizontal structural cross-beams spanning the horizon
    const bgBeamGeom = new THREE.BoxGeometry(80, 2.0, 2.0);
    disposables.push(bgBeamGeom);

    const bgBeamY = [-20, 0, 22];
    bgBeamY.forEach((by, idx) => {
      const beam = new THREE.Mesh(bgBeamGeom, darkChromeMat);
      beam.position.set(0, by, -48 - idx * 2);
      bgGroup.add(beam);
    });

    // ==========================================
    // LAYER 2: MIDGROUND (Precision Titanium Lateral Architectural Columns, Z: -14 to -28)
    // Left & Right Flanking Structures (Keeps center completely clear for readable text)
    // ==========================================
    const midGroup = new THREE.Group();
    worldGroup.add(midGroup);

    // Vertical Machined Titanium Pilasters (Left & Right Flanks)
    const midPillarGeom = new THREE.BoxGeometry(1.6, 50, 2.2);
    disposables.push(midPillarGeom);

    const leftMidPillar = new THREE.Mesh(midPillarGeom, brushedTitaniumMat);
    leftMidPillar.position.set(-18, 0, -18);
    leftMidPillar.rotation.y = 0.25;
    midGroup.add(leftMidPillar);

    const rightMidPillar = new THREE.Mesh(midPillarGeom, brushedTitaniumMat);
    rightMidPillar.position.set(18, 0, -18);
    rightMidPillar.rotation.y = -0.25;
    midGroup.add(rightMidPillar);

    // Diagonal engineering truss struts along the flanks
    const trussGeom = new THREE.CylinderGeometry(0.12, 0.12, 32, 16);
    disposables.push(trussGeom);

    const trussConfigs = [
      { x: -16, y: 0, z: -16, rz: Math.PI / 5 },
      { x: 16, y: 0, z: -16, rz: -Math.PI / 5 },
      { x: -22, y: 0, z: -24, rz: -Math.PI / 6 },
      { x: 22, y: 0, z: -24, rz: Math.PI / 6 },
    ];

    trussConfigs.forEach(({ x, y, z, rz }) => {
      const truss = new THREE.Mesh(trussGeom, darkChromeMat);
      truss.position.set(x, y, z);
      truss.rotation.z = rz;
      midGroup.add(truss);
    });

    // ==========================================
    // LAYER 3: FOREGROUND (Subtle Peripheral Framing Rails & Micro-Dust, Z: -2 to 6)
    // ==========================================
    const fgGroup = new THREE.Group();
    worldGroup.add(fgGroup);

    const frameRailGeom = new THREE.BoxGeometry(0.35, 42, 0.35);
    disposables.push(frameRailGeom);

    const leftRail = new THREE.Mesh(frameRailGeom, darkChromeMat);
    leftRail.position.set(-15, 0, 2);
    leftRail.rotation.y = 0.12;
    fgGroup.add(leftRail);

    const rightRail = new THREE.Mesh(frameRailGeom, darkChromeMat);
    rightRail.position.set(15, 0, 2);
    rightRail.rotation.y = -0.12;
    fgGroup.add(rightRail);

    // Floating metallic micro-dust particles (80% emerald, 20% cobalt blue)
    const particleCount = window.innerWidth < 768 ? 35 : 75;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);

    const cEmerald = new THREE.Color(0x39ff88);
    const cCobalt = new THREE.Color(0x245bff);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;

      particleSpeeds[i * 3] = (Math.random() - 0.5) * 0.003;
      particleSpeeds[i * 3 + 1] = -(Math.random() * 0.006 + 0.002);
      particleSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      // 20% Electric Cobalt Blue, 80% Neon Emerald
      const isCobalt = i % 5 === 0;
      const col = isCobalt ? cCobalt : cEmerald;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const positionAttr = new THREE.BufferAttribute(particlePositions, 3);
    particleGeom.setAttribute("position", positionAttr);
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    disposables.push(particleGeom);

    const particleMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(particleMat);

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    fgGroup.add(particleSystem);

    // Reduced motion media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Mouse & Scroll Parallax Interpolation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp for mouse and scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.045;

      // 3D Camera Travel through architectural space
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = scrollY / maxScroll;

      // Camera coordinates responsive to scroll position
      camera.position.x = mouse.x * 1.5;
      camera.position.y = -scrollProgress * 14 + mouse.y * 1.0;
      camera.position.z = 22 - scrollProgress * 3;
      camera.lookAt(0, -scrollProgress * 14, -15);

      if (!prefersReducedMotion) {
        // Subtle kinetic breathing of architectural assemblies
        midGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.02 + mouse.x * 0.025;
        midGroup.rotation.x = Math.cos(elapsedTime * 0.12) * 0.012 - mouse.y * 0.018;

        bgGroup.rotation.y = Math.sin(elapsedTime * 0.08) * 0.01;

        // Animate floating metallic dust motes
        for (let i = 0; i < particleCount; i++) {
          const idxX = i * 3;
          const idxY = i * 3 + 1;
          const idxZ = i * 3 + 2;

          const px = particlePositions[idxX];
          const py = particlePositions[idxY];
          const pz = particlePositions[idxZ];
          const sx = particleSpeeds[idxX];
          const sy = particleSpeeds[idxY];
          const sz = particleSpeeds[idxZ];

          if (
            px !== undefined &&
            py !== undefined &&
            pz !== undefined &&
            sx !== undefined &&
            sy !== undefined &&
            sz !== undefined
          ) {
            particlePositions[idxX] = px + sx;
            particlePositions[idxY] = py + sy;
            particlePositions[idxZ] = pz + sz;

            // Wrap boundaries
            if (particlePositions[idxY] < -14) particlePositions[idxY] = 14;
            if (particlePositions[idxX] > 16) particlePositions[idxX] = -16;
            if (particlePositions[idxX] < -16) particlePositions[idxX] = 16;
          }
        }
        positionAttr.needsUpdate = true;

        // Dynamic emerald rim light tracking
        emeraldRimLight.position.x = 14 + Math.sin(elapsedTime * 0.3) * 2;
        emeraldRimLight.position.y = 6 + Math.cos(elapsedTime * 0.25) * 2 - scrollProgress * 12;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);

      // Clean disposal
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020503]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
      {/* Subtle depth vignette to guarantee pure text legibility */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,_transparent_45%,_rgba(2,5,3,0.65)_100%] pointer-events-none" />
    </div>
  );
}
