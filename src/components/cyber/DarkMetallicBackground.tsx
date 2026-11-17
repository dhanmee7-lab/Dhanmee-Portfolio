import { useEffect, useRef } from "react";

/**
 * Visibly Rich Black Titanium Environment
 * - Architectural dark brushed titanium armor plates (#0d1410, #141f18, #080d0a)
 * - Deep 3D recessed seam channels with crisp emerald bevel highlights & drop shadows
 * - Chamfered 45° mechanical corners & precision countersunk hex fasteners
 * - Prominent volumetric emerald studio halo illuminating the Hero section
 * - Procedural brushed-metal anisotropic grain & micro-texture
 * - Subtle floating metallic ambient dust motes catching rim lighting
 * - Balanced central contrast shield preserving 100% text legibility
 * - Motion-safe & battery-optimized (pauses on hidden tab)
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

    // Floating metallic dust particles
    type DustParticle = {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speedX: number;
      speedY: number;
      phase: number;
      depth: number;
      isAlert: boolean;
    };

    let dustParticles: DustParticle[] = [];

    const initDust = () => {
      const isMobile = width < 768;
      const count = isMobile
        ? 18
        : Math.min(36, Math.max(20, Math.round((width * height) / 42000)));
      dustParticles = Array.from({ length: count }, (_, i) => {
        const depth = Math.random() * 0.7 + 0.3;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: (Math.random() * 1.5 + 0.8) * depth,
          alpha: Math.random() * 0.45 + 0.2,
          speedX: (Math.random() - 0.5) * 0.12 * depth,
          speedY: -(Math.random() * 0.2 + 0.06) * depth,
          phase: Math.random() * Math.PI * 2,
          depth,
          isAlert: i === 0, // Rare red telemetry beacon
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDust();
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

      // 1. Base Dark Titanium Chassis (#080c09 to #030504)
      const chassisGrad = ctx.createLinearGradient(0, 0, width, height);
      chassisGrad.addColorStop(0, "#0a100c");
      chassisGrad.addColorStop(0.35, "#040705");
      chassisGrad.addColorStop(0.7, "#020302");
      chassisGrad.addColorStop(1, "#070c09");
      ctx.fillStyle = chassisGrad;
      ctx.fillRect(0, 0, width, height);

      // Studio key light coordinates
      const keyLightX = width * 0.32 + Math.cos(animTime * 0.14) * width * 0.15 + mouse.x * 35;
      const keyLightY = height * 0.36 + Math.sin(animTime * 0.12) * height * 0.12 + mouse.y * 25;

      const fillLightX = width * 0.75 + Math.sin(animTime * 0.18) * width * 0.18 + mouse.x * 25;
      const fillLightY = height * 0.65 + Math.cos(animTime * 0.15) * height * 0.18 + mouse.y * 20;

      // 2. Visible Architectural Titanium Armor Plates
      // 3 columns x 3 rows with distinct tonal plates and recessed seam channels
      const colWidth = width / 3;
      const rowHeight = height / 3;
      const seamW = 3.5; // Visible architectural channel width

      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 3; row++) {
          const px = col * colWidth + seamW / 2 + mouse.x * 8 * (col - 1);
          const py = row * rowHeight + seamW / 2 + mouse.y * 8 * (row - 1);
          const pw = colWidth - seamW;
          const ph = rowHeight - seamW;

          // Panel surface tone with subtle plate-to-plate variation
          const plateGrad = ctx.createLinearGradient(px, py, px + pw, py + ph);
          if ((col + row) % 2 === 0) {
            plateGrad.addColorStop(0, "#0e1511");
            plateGrad.addColorStop(0.5, "#090f0b");
            plateGrad.addColorStop(1, "#060a08");
          } else {
            plateGrad.addColorStop(0, "#121b15");
            plateGrad.addColorStop(0.5, "#0c130f");
            plateGrad.addColorStop(1, "#070c09");
          }

          ctx.fillStyle = plateGrad;
          ctx.beginPath();
          const chamfer = 14;
          // Chamfered plate polygon
          ctx.moveTo(px + chamfer, py);
          ctx.lineTo(px + pw - chamfer, py);
          ctx.lineTo(px + pw, py + chamfer);
          ctx.lineTo(px + pw, py + ph - chamfer);
          ctx.lineTo(px + pw - chamfer, py + ph);
          ctx.lineTo(px + chamfer, py + ph);
          ctx.lineTo(px, py + ph - chamfer);
          ctx.lineTo(px, py + chamfer);
          ctx.closePath();
          ctx.fill();

          // 3D Bevel Highlights (Crisp Emerald & Titanium Edges)
          // Top & Left edges catch overhead key light
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = "rgba(109, 143, 99, 0.42)";
          ctx.beginPath();
          ctx.moveTo(px + chamfer, py);
          ctx.lineTo(px + pw - chamfer, py);
          ctx.lineTo(px + pw, py + chamfer);
          ctx.stroke();

          ctx.strokeStyle = "rgba(57, 255, 136, 0.32)";
          ctx.beginPath();
          ctx.moveTo(px, py + ph - chamfer);
          ctx.lineTo(px, py + chamfer);
          ctx.lineTo(px + chamfer, py);
          ctx.stroke();

          // Bottom & Right edges cast dimensional shadows
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
          ctx.beginPath();
          ctx.moveTo(px + pw, py + chamfer);
          ctx.lineTo(px + pw, py + ph - chamfer);
          ctx.lineTo(px + pw - chamfer, py + ph);
          ctx.lineTo(px + chamfer, py + ph);
          ctx.stroke();

          // Precision hex fastener rivets in plate corners
          const boltOffset = 18;
          const boltPoints = [
            { bx: px + boltOffset, by: py + boltOffset },
            { bx: px + pw - boltOffset, by: py + boltOffset },
            { bx: px + boltOffset, by: py + ph - boltOffset },
            { bx: px + pw - boltOffset, by: py + ph - boltOffset },
          ];

          boltPoints.forEach(({ bx, by }) => {
            // Recessed countersunk ring
            ctx.beginPath();
            ctx.arc(bx, by, 3.8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
            ctx.fill();
            ctx.strokeStyle = "rgba(38, 58, 43, 0.55)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Specular metallic bolt center
            ctx.beginPath();
            ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(57, 255, 136, 0.45)";
            ctx.fill();
          });
        }
      }

      // 3. Prominent Hero Volumetric Emerald Spotlight Halo
      // Illuminates the hero area directly, lifting content out of plain darkness
      const heroGlow = ctx.createRadialGradient(
        keyLightX,
        keyLightY,
        0,
        keyLightX,
        keyLightY,
        Math.max(width, height) * 0.52,
      );
      heroGlow.addColorStop(0, "rgba(57, 255, 136, 0.16)");
      heroGlow.addColorStop(0.32, "rgba(109, 143, 99, 0.09)");
      heroGlow.addColorStop(0.68, "rgba(20, 32, 24, 0.035)");
      heroGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = heroGlow;
      ctx.fillRect(0, 0, width, height);

      // Secondary Ambient Sheen (Fill Light across Panels)
      const fillGlow = ctx.createRadialGradient(
        fillLightX,
        fillLightY,
        0,
        fillLightX,
        fillLightY,
        Math.max(width, height) * 0.48,
      );
      fillGlow.addColorStop(0, "rgba(57, 255, 136, 0.08)");
      fillGlow.addColorStop(0.4, "rgba(109, 143, 99, 0.045)");
      fillGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = fillGlow;
      ctx.fillRect(0, 0, width, height);

      // 4. Anisotropic Horizontal Brushed-Grain Striations
      // Visible horizontal metallic grain catching moving studio light
      const grainStep = Math.max(10, Math.round(height / 75));
      for (let y = 0; y < height; y += grainStep) {
        const grainIntensity =
          Math.sin(y * 0.06 + animTime * 0.12) * 0.02 +
          Math.cos(y * 0.015 - animTime * 0.08) * 0.015 +
          0.04;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(109, 143, 99, ${grainIntensity})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // 5. Architectural Datum Seam Track & Status Pulse
      const trackY = height * 0.07;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, trackY);
      ctx.lineTo(width * 0.9, trackY);
      ctx.strokeStyle = "rgba(38, 58, 43, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const pulsePos = width * 0.1 + ((animTime * 55) % (width * 0.8));
      const trackPulse = ctx.createLinearGradient(pulsePos - 75, 0, pulsePos + 75, 0);
      trackPulse.addColorStop(0, "rgba(57, 255, 136, 0)");
      trackPulse.addColorStop(0.5, "rgba(57, 255, 136, 0.45)");
      trackPulse.addColorStop(1, "rgba(57, 255, 136, 0)");
      ctx.beginPath();
      ctx.moveTo(pulsePos - 75, trackY);
      ctx.lineTo(pulsePos + 75, trackY);
      ctx.strokeStyle = trackPulse;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 6. Floating Metallic Dust Particles (Depth Layers)
      dustParticles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX + Math.sin(p.phase + animTime * 0.5) * 0.25;
          p.y += p.speedY;

          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
        }

        const px = p.x + mouse.x * 20 * p.depth;
        const py = p.y + mouse.y * 15 * p.depth;
        const pulse = Math.sin(animTime * 1.6 + p.phase) * 0.25 + 0.75;
        const alpha = p.alpha * pulse;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);

        if (p.isAlert) {
          ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.95})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(57, 255, 136, ${alpha * 0.85})`;
          ctx.fill();
          if (p.size > 1.2) {
            ctx.beginPath();
            ctx.arc(px, py, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(109, 143, 99, ${alpha * 0.22})`;
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
      {/* 1. Dimensional Black Titanium Canvas Layer */}
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      {/* 2. Procedural Brushed Titanium Micro-Grain Filter Overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="brushed-titanium-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045 0.92"
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
        <rect width="100%" height="100%" filter="url(#brushed-titanium-texture)" />
      </svg>

      {/* 3. Balanced Central Contrast Shield — Keeps UI Text & Panels Crystal Clear */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.65)_72%,rgba(0,0,0,0.92)_100%)]"
        aria-hidden="true"
      />

      {/* 4. Precision Engineering Corner Ticks & Datum Stamp */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-moss/50">
        <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 bg-alert" />
      </div>
      <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-moss/50" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-moss/50" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-moss/50">
        <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 bg-alert" />
      </div>

      {/* 5. Minimalist Engineering Datum Callout */}
      <div className="absolute top-6 right-16 hidden font-mono text-[8px] tracking-[0.3em] text-moss/70 sm:block">
        SYS.TITANIUM // MAT.SPEC-2026 // MIL-STD-810H
      </div>
    </div>
  );
}
