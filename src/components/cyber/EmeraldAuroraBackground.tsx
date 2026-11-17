import { useEffect, useRef } from "react";

/**
 * Emerald Aurora Cinematic Background
 * - Deep jet-black atmosphere (#000000)
 * - Multi-layer flowing emerald-green aurora ribbons (#39FF88, #6D8F63)
 * - Volumetric vertical ray striations (authentic aurora curtains)
 * - Ambient volumetric light breathing nodes
 * - Floating ethereal luminous motes (with rare alert telemetry marker)
 * - Smooth pointer parallax damping
 * - Respects prefers-reduced-motion & document.hidden
 * - Readability preservation via calibrated atmospheric vignette
 */
export function EmeraldAuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Mouse parallax with smooth inertial lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Ethereal drifting light particles
    type Particle = {
      x: number;
      y: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      vx: number;
      vy: number;
      phase: number;
      depth: number;
      isAlert: boolean;
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      const isMobile = width < 768;
      const count = isMobile
        ? 22
        : Math.min(42, Math.max(20, Math.round((width * height) / 38000)));
      particles = Array.from({ length: count }, (_, i) => {
        const depth = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: (Math.random() * 1.6 + 0.7) * depth,
          alpha: Math.random() * 0.38 + 0.12,
          baseAlpha: Math.random() * 0.38 + 0.12,
          vx: (Math.random() - 0.5) * 0.1 * depth,
          vy: -(Math.random() * 0.22 + 0.06) * depth,
          phase: Math.random() * Math.PI * 2,
          depth,
          isAlert: i === 0, // Rare red alert telemetry marker
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    // Aurora Ribbon definitions
    type RibbonConfig = {
      baseYRatio: number;
      curtainHeight: number;
      speed: number;
      amplitude1: number;
      amplitude2: number;
      freq1: number;
      freq2: number;
      colorBottom: string;
      colorMid: string;
      colorTop: string;
      rayShimmerFreq: number;
      rayShimmerSpeed: number;
      parallaxFactor: number;
    };

    const ribbons: RibbonConfig[] = [
      // 1. Deep Atmospheric Veil (Background Moss & Dark Emerald)
      {
        baseYRatio: 0.32,
        curtainHeight: 280,
        speed: 0.16,
        amplitude1: 55,
        amplitude2: 32,
        freq1: 0.0011,
        freq2: 0.0026,
        colorBottom: "rgba(109, 143, 99, 0.18)",
        colorMid: "rgba(57, 255, 136, 0.09)",
        colorTop: "rgba(0, 0, 0, 0)",
        rayShimmerFreq: 0.009,
        rayShimmerSpeed: 0.22,
        parallaxFactor: 15,
      },
      // 2. Main Luminous Emerald Aurora Ribbon (Midground Focal Wave)
      {
        baseYRatio: 0.48,
        curtainHeight: 240,
        speed: 0.24,
        amplitude1: 70,
        amplitude2: 45,
        freq1: 0.0014,
        freq2: 0.0031,
        colorBottom: "rgba(57, 255, 136, 0.28)",
        colorMid: "rgba(109, 143, 99, 0.14)",
        colorTop: "rgba(0, 0, 0, 0)",
        rayShimmerFreq: 0.014,
        rayShimmerSpeed: 0.35,
        parallaxFactor: 30,
      },
      // 3. High Ethereal Sweep (Upper Diagonal Flow)
      {
        baseYRatio: 0.22,
        curtainHeight: 200,
        speed: 0.19,
        amplitude1: 48,
        amplitude2: 28,
        freq1: 0.0016,
        freq2: 0.0038,
        colorBottom: "rgba(57, 255, 136, 0.20)",
        colorMid: "rgba(109, 143, 99, 0.09)",
        colorTop: "rgba(0, 0, 0, 0)",
        rayShimmerFreq: 0.011,
        rayShimmerSpeed: 0.28,
        parallaxFactor: 22,
      },
    ];

    let lastTime = performance.now();
    let animTime = 0;

    const render = (now: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      if (!prefersReducedMotion) {
        animTime += dt;
      }

      // Smooth pointer lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // 1. Clear with Deep Jet-Black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Volumetric Light Breathing Nodes
      const pulse1 = Math.sin(animTime * 0.25) * 0.15 + 0.85;
      const pulse2 = Math.cos(animTime * 0.2) * 0.15 + 0.85;

      // Node A: Upper Right Luminous Cloud
      const g1 = ctx.createRadialGradient(
        width * 0.72 + mouse.x * 25,
        height * 0.3 + mouse.y * 20,
        0,
        width * 0.72 + mouse.x * 25,
        height * 0.3 + mouse.y * 20,
        width * 0.55 * pulse1,
      );
      g1.addColorStop(0, "rgba(57, 255, 136, 0.07)");
      g1.addColorStop(0.45, "rgba(109, 143, 99, 0.04)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Node B: Mid-Left Atmospheric Moss Bloom
      const g2 = ctx.createRadialGradient(
        width * 0.25 + mouse.x * 20,
        height * 0.58 + mouse.y * 15,
        0,
        width * 0.25 + mouse.x * 20,
        height * 0.58 + mouse.y * 15,
        width * 0.48 * pulse2,
      );
      g2.addColorStop(0, "rgba(109, 143, 99, 0.065)");
      g2.addColorStop(0.5, "rgba(57, 255, 136, 0.025)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Volumetric Aurora Ribbons & Curtains
      ribbons.forEach((ribbon) => {
        const isMobile = width < 768;
        const step = Math.max(isMobile ? 8 : 6, Math.round(width / (isMobile ? 110 : 160)));
        const baseY = height * ribbon.baseYRatio + mouse.y * ribbon.parallaxFactor;
        const t = animTime * ribbon.speed;

        // Draw multiple translucent slices for volumetric depth & vertical striations
        ctx.save();
        ctx.beginPath();

        // Calculate bottom spline points
        const pointsBottom: { x: number; y: number }[] = [];
        const pointsTop: { x: number; y: number }[] = [];

        for (let x = -40; x <= width + 40; x += step) {
          // Complex organic wave with multi-harmonic superposition
          const wave1 = Math.sin(x * ribbon.freq1 + t) * ribbon.amplitude1;
          const wave2 = Math.cos(x * ribbon.freq2 - t * 0.8) * ribbon.amplitude2;
          const wave3 = Math.sin(x * 0.0006 + t * 0.5) * 20;

          const yBase = baseY + wave1 + wave2 + wave3;

          // Volumetric curtain height modulation
          const heightMod = ribbon.curtainHeight * (1 + 0.28 * Math.sin(x * 0.0022 - t * 0.6));
          const yTop = yBase - heightMod;

          pointsBottom.push({ x, y: yBase });
          pointsTop.push({ x, y: yTop });
        }

        // Create volumetric path: top edge forward, bottom edge backward
        ctx.moveTo(pointsTop[0]!.x, pointsTop[0]!.y);
        for (let i = 1; i < pointsTop.length; i++) {
          ctx.lineTo(pointsTop[i]!.x, pointsTop[i]!.y);
        }
        for (let i = pointsBottom.length - 1; i >= 0; i--) {
          ctx.lineTo(pointsBottom[i]!.x, pointsBottom[i]!.y);
        }
        ctx.closePath();

        // Vertical gradient for the entire ribbon curtain
        const ribbonGrad = ctx.createLinearGradient(0, baseY, 0, baseY - ribbon.curtainHeight);
        ribbonGrad.addColorStop(0, ribbon.colorBottom);
        ribbonGrad.addColorStop(0.38, ribbon.colorMid);
        ribbonGrad.addColorStop(1, ribbon.colorTop);

        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // 4. Aurora Borealis Vertical Ray Striations (Curtain Shimmer Flutes)
        const numRays = Math.min(36, Math.round(width / 38));
        const rayStep = width / numRays;

        for (let i = 0; i <= numRays; i++) {
          const rx = i * rayStep + Math.sin(i + t * 0.4) * 8;
          const sampleIdx = Math.min(
            pointsBottom.length - 1,
            Math.max(0, Math.round(((rx + 40) / (width + 80)) * pointsBottom.length)),
          );
          const pBot = pointsBottom[sampleIdx];
          const pTop = pointsTop[sampleIdx];
          if (!pBot || !pTop) continue;

          // Shimmer intensity via harmonic interference
          const shimmer =
            Math.pow(
              Math.max(0, Math.sin(rx * ribbon.rayShimmerFreq + animTime * ribbon.rayShimmerSpeed)),
              2.5,
            ) * 0.35;

          if (shimmer > 0.03) {
            const rayGrad = ctx.createLinearGradient(rx, pBot.y, rx, pTop.y);
            rayGrad.addColorStop(0, "rgba(57, 255, 136, 0)");
            rayGrad.addColorStop(0.25, `rgba(57, 255, 136, ${shimmer * 0.5})`);
            rayGrad.addColorStop(0.7, `rgba(109, 143, 99, ${shimmer * 0.25})`);
            rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.beginPath();
            ctx.moveTo(rx - 3, pBot.y);
            ctx.lineTo(rx + 3, pBot.y);
            ctx.lineTo(rx + 6, pTop.y);
            ctx.lineTo(rx - 6, pTop.y);
            ctx.closePath();
            ctx.fillStyle = rayGrad;
            ctx.fill();
          }
        }

        ctx.restore();
      });

      // 5. Ethereal Drifting Light Particles (Aurora Motes)
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx + Math.sin(p.phase + animTime * 0.6) * 0.25;
          p.y += p.vy;

          // Boundary wrap
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        }

        // Particle parallax
        const px = p.x + mouse.x * 20 * p.depth;
        const py = p.y + mouse.y * 15 * p.depth;

        // Soft breathing pulsation
        const pulse = Math.sin(animTime * 1.5 + p.phase) * 0.2 + 0.8;
        const currentAlpha = p.alpha * pulse;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);

        if (p.isAlert) {
          // Rare red alert telemetry marker
          ctx.fillStyle = `rgba(255, 0, 0, ${currentAlpha * 0.9})`;
          ctx.fill();
          // Subtle red halo
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 0, 0, ${currentAlpha * 0.3})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        } else {
          // Luminous emerald mote
          ctx.fillStyle = `rgba(57, 255, 136, ${currentAlpha * 0.85})`;
          ctx.fill();

          // Soft ambient halo for larger motes
          if (p.size > 1.4) {
            ctx.beginPath();
            ctx.arc(px, py, p.size * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(109, 143, 99, ${currentAlpha * 0.25})`;
            ctx.fill();
          }
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Cinematic Aurora Canvas */}
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      {/* Volumetric Radial Contrast Mask — Protects content legibility while framing the glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_68%,rgba(0,0,0,0.92)_100%)]"
        aria-hidden="true"
      />

      {/* Cyber Command Center HUD Corners & Ticks */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-moss/45">
        <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 bg-alert/85" />
      </div>
      <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-moss/45" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-moss/45" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-moss/45">
        <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 bg-alert/85" />
      </div>

      {/* Subtle Precision Scanline Texture */}
      <div className="scanlines absolute inset-0 opacity-25" aria-hidden="true" />
    </div>
  );
}
