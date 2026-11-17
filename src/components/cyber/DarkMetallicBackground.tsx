import { useEffect, useRef } from "react";

/**
 * Realistic Dark Metallic Background
 * - Black brushed-metal & dark titanium surfaces (#000000, #080B09)
 * - Anisotropic metallic grain & surface micro-roughness
 * - Industrial panel architecture with recessed grooves, bevels & chamfers
 * - Physical studio rim-lighting & soft emerald reflections (#39FF88, #6D8F63)
 * - Subtle pointer-driven specular sheen & parallax depth
 * - High-contrast central vignette protecting UI readability
 * - Motion-safe (prefers-reduced-motion) & battery-optimized (pauses on hidden tab)
 */
export function DarkMetallicBackground() {
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

    // Mouse parallax with smooth inertia
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

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

      // 1. Dark Titanium Base Plate Fill (#040605 to #000000)
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, "#060907");
      baseGrad.addColorStop(0.35, "#010201");
      baseGrad.addColorStop(0.7, "#000000");
      baseGrad.addColorStop(1, "#050806");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Studio light coordinates (drifting in slow cinematic orbit)
      const light1X = width * 0.42 + Math.cos(animTime * 0.18) * width * 0.28 + mouse.x * 45;
      const light1Y = height * 0.28 + Math.sin(animTime * 0.14) * height * 0.2 + mouse.y * 35;

      const light2X = width * 0.75 + Math.sin(animTime * 0.22) * width * 0.18 + mouse.x * 30;
      const light2Y = height * 0.68 + Math.cos(animTime * 0.16) * height * 0.22 + mouse.y * 25;

      // 2. Anisotropic Specular Sheen (Physical Brushed Metal Highlight)
      // Brushed titanium reflects light perpendicularly in elongated horizontal bands
      const sheenGrad1 = ctx.createRadialGradient(
        light1X,
        light1Y,
        0,
        light1X,
        light1Y,
        Math.max(width, height) * 0.65,
      );
      sheenGrad1.addColorStop(0, "rgba(57, 255, 136, 0.085)");
      sheenGrad1.addColorStop(0.2, "rgba(109, 143, 99, 0.05)");
      sheenGrad1.addColorStop(0.5, "rgba(38, 58, 43, 0.02)");
      sheenGrad1.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.scale(1.8, 0.65); // Anisotropic stretch along horizontal brushing axis
      ctx.fillStyle = sheenGrad1;
      ctx.fillRect(0, 0, width / 1.8, (height * 1.5) / 0.65);
      ctx.restore();

      // Secondary Rim Light Source (Emerald Fill)
      const sheenGrad2 = ctx.createRadialGradient(
        light2X,
        light2Y,
        0,
        light2X,
        light2Y,
        Math.max(width, height) * 0.55,
      );
      sheenGrad2.addColorStop(0, "rgba(57, 255, 136, 0.055)");
      sheenGrad2.addColorStop(0.3, "rgba(109, 143, 99, 0.03)");
      sheenGrad2.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.scale(1.6, 0.7);
      ctx.fillStyle = sheenGrad2;
      ctx.fillRect(0, 0, width / 1.6, (height * 1.5) / 0.7);
      ctx.restore();

      // 3. Industrial Architectural Panel Divisions & Seams
      // Defines subtle modular titanium armor plates with micro-bevels
      const panelCols = 3;
      const colWidth = width / panelCols;
      const seamY1 = height * 0.38 + mouse.y * 8;
      const seamY2 = height * 0.72 + mouse.y * 12;

      ctx.lineWidth = 1;

      // Vertical panel seams
      for (let i = 1; i < panelCols; i++) {
        const x = i * colWidth + mouse.x * 10 * i;

        // Shadow groove (recessed depth)
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
        ctx.stroke();

        // 1px emerald bevel specular edge
        ctx.beginPath();
        ctx.moveTo(x + 1, 0);
        ctx.lineTo(x + 1, height);
        ctx.strokeStyle = "rgba(109, 143, 99, 0.18)";
        ctx.stroke();

        // Intersection fasteners / hex bolt nodes
        [seamY1, seamY2].forEach((yPos) => {
          // Outer recessed ring
          ctx.beginPath();
          ctx.arc(x, yPos, 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(38, 58, 43, 0.4)";
          ctx.stroke();

          // Bolt core with specular reflection
          ctx.beginPath();
          ctx.arc(x, yPos, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(57, 255, 136, 0.25)";
          ctx.fill();
        });
      }

      // Horizontal panel seams
      [seamY1, seamY2].forEach((y, idx) => {
        // Deep shadow line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
        ctx.stroke();

        // Top chamfer bevel (metallic highlight)
        ctx.beginPath();
        ctx.moveTo(0, y - 1);
        ctx.lineTo(width, y - 1);
        ctx.strokeStyle = "rgba(109, 143, 99, 0.15)";
        ctx.stroke();

        // Bottom rim reflection
        ctx.beginPath();
        ctx.moveTo(0, y + 1);
        ctx.lineTo(width, y + 1);
        ctx.strokeStyle = idx === 0 ? "rgba(57, 255, 136, 0.1)" : "rgba(38, 58, 43, 0.2)";
        ctx.stroke();
      });

      // 4. Subtle Micro-Brushed Metal Lines (Fine Linear Texture Grain)
      // Generates thin, high-precision metallic grain striations across titanium panels
      const grainStep = Math.max(14, Math.round(height / 60));
      for (let y = 0; y < height; y += grainStep) {
        const grainAlpha = Math.sin(y * 0.05 + animTime * 0.1) * 0.015 + 0.025;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(109, 143, 99, ${grainAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 5. Recessed Telemetry Channel with Controlled Emerald/Red Indicator
      const channelY = height * 0.06;
      ctx.beginPath();
      ctx.moveTo(width * 0.15, channelY);
      ctx.lineTo(width * 0.85, channelY);
      ctx.strokeStyle = "rgba(38, 58, 43, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Moving specular pulse on telemetry track
      const pulseX = width * 0.15 + ((animTime * 45) % (width * 0.7));
      const pulseGrad = ctx.createLinearGradient(pulseX - 60, 0, pulseX + 60, 0);
      pulseGrad.addColorStop(0, "rgba(57, 255, 136, 0)");
      pulseGrad.addColorStop(0.5, "rgba(57, 255, 136, 0.35)");
      pulseGrad.addColorStop(1, "rgba(57, 255, 136, 0)");
      ctx.beginPath();
      ctx.moveTo(pulseX - 60, channelY);
      ctx.lineTo(pulseX + 60, channelY);
      ctx.strokeStyle = pulseGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

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
      {/* 1. Realistic Brushed Titanium Canvas */}
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      {/* 2. Micro-Brushed Anisotropic Texture Layer via Procedural SVG Filter */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.065] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="brushed-titanium-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.95"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#brushed-titanium-grain)" />
      </svg>

      {/* 3. Deep Atmospheric Studio Vignette — Ensures 100% Text Readability */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.72)_65%,rgba(0,0,0,0.96)_100%)]"
        aria-hidden="true"
      />

      {/* 4. Precision Engineering Corner Brackets & Fiducial Alignment Ticks */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-moss/50">
        <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 bg-alert" />
      </div>
      <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-moss/50" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-moss/50" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-moss/50">
        <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 bg-alert" />
      </div>

      {/* 5. Minimalist Engineering Coordinates & Datum Stamp */}
      <div className="absolute top-6 right-16 hidden font-mono text-[8px] tracking-[0.3em] text-moss/60 sm:block">
        SYS.TITANIUM // MAT.SPEC-2026 // MIL-STD-810H
      </div>
    </div>
  );
}
