import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * 3D Holographic Cyber Core & Orbital Structure
 * Pure mathematical 3D perspective projection on HTML5 Canvas:
 * - Nested multi-axis rotating orbital gimbal rings
 * - Holographic geodesic icosahedron core with glowing vertices
 * - Drifting ambient telemetry particles in 3D space
 * - Interactive pointer-driven pitch/yaw rotation with smooth inertia damping
 * - DPR aware, motion-safe, responsive, zero external bundle bloat
 */
export function Hero3DObject() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // Inertial mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 3D Point & Edge Math
    type Point3D = { x: number; y: number; z: number };
    type ProjectedPoint = { x: number; y: number; scale: number; visible: boolean };

    // Geodesic icosahedron golden-ratio vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ].map((v) => {
      // Normalize to unit sphere
      const len = Math.hypot(v.x, v.y, v.z);
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    });

    // Compute icosahedron edges (connect vertices within sqrt(2) distance)
    const edges: [number, number][] = [];
    for (let i = 0; i < baseVertices.length; i++) {
      for (let j = i + 1; j < baseVertices.length; j++) {
        const d = Math.hypot(
          baseVertices[i]!.x - baseVertices[j]!.x,
          baseVertices[i]!.y - baseVertices[j]!.y,
          baseVertices[i]!.z - baseVertices[j]!.z,
        );
        if (d < 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // 3D floating telemetry particles surrounding core
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => {
      const radius = 1.35 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = (Math.random() - 0.5) * Math.PI;
      return {
        x: radius * Math.cos(phiAngle) * Math.cos(theta),
        y: radius * Math.sin(phiAngle),
        z: radius * Math.cos(phiAngle) * Math.sin(theta),
        size: Math.random() * 1.8 + 0.8,
        speed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        theta,
        radius,
        phiAngle,
        alert: Math.random() < 0.08,
      };
    });

    const resize = () => {
      const targetEl = canvasContainerRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvasContainerRef.current) {
      ro.observe(canvasContainerRef.current);
    }

    // Continuous 3D rotation angles
    let angleX = 0.35;
    let angleY = 0.45;
    let angleZ = 0.15;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nx * 0.65;
      mouseRef.current.targetY = ny * 0.65;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 3D Matrix Rotation
    const rotate3D = (p: Point3D, rx: number, ry: number, rz: number): Point3D => {
      // Rotate around X
      const y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
      const z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
      // Rotate around Y
      const x2 = p.x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -p.x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rotate around Z
      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return { x: x3, y: y3, z: z2 };
    };

    // Perspective projection onto screen
    const fov = 3.2;
    const project = (p: Point3D, cx: number, cy: number, radius: number): ProjectedPoint => {
      const zOffset = p.z + fov;
      const scale = fov / Math.max(zOffset, 0.1);
      return {
        x: cx + p.x * radius * scale,
        y: cy + p.y * radius * scale,
        scale,
        visible: zOffset > 0,
      };
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Increment rotation with mouse bias
      angleX += (0.28 + mouseRef.current.y * 0.8) * dt;
      angleY += (0.42 + mouseRef.current.x * 0.8) * dt;
      angleZ += 0.12 * dt;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.28;

      // Ambient radial core glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.6);
      coreGlow.addColorStop(0, "rgba(57, 255, 136, 0.16)");
      coreGlow.addColorStop(0.4, "rgba(109, 143, 99, 0.08)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Render 3 Orbital Gimbal Rings with different tilts & axes
      const rings = [
        {
          r: baseRadius * 1.35,
          rx: angleX * 0.7,
          ry: angleY * 0.5,
          rz: 0.4,
          segments: 48,
          dash: [4, 4],
          moss: true,
        },
        {
          r: baseRadius * 1.62,
          rx: -angleX * 0.5,
          ry: angleY * 0.9,
          rz: -0.6,
          segments: 64,
          dash: [],
          moss: false,
        },
        {
          r: baseRadius * 1.95,
          rx: angleX * 0.3,
          ry: -angleY * 0.6,
          rz: 1.1,
          segments: 72,
          dash: [8, 8],
          moss: true,
        },
      ];

      rings.forEach((ring) => {
        ctx.beginPath();
        if (ring.dash.length) {
          ctx.setLineDash(ring.dash);
        } else {
          ctx.setLineDash([]);
        }

        let first = true;
        for (let i = 0; i <= ring.segments; i++) {
          const theta = (i / ring.segments) * Math.PI * 2;
          const rawP: Point3D = {
            x: Math.cos(theta),
            y: 0,
            z: Math.sin(theta),
          };
          const rotated = rotate3D(rawP, ring.rx, ring.ry, ring.rz);
          const prj = project(rotated, cx, cy, ring.r);
          if (first) {
            ctx.moveTo(prj.x, prj.y);
            first = false;
          } else {
            ctx.lineTo(prj.x, prj.y);
          }
        }
        ctx.strokeStyle = ring.moss ? "rgba(109, 143, 99, 0.32)" : "rgba(57, 255, 136, 0.5)";
        ctx.lineWidth = ring.moss ? 1 : 1.3;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Transform & Project icosahedron core vertices
      const coreVerticesProjected = baseVertices.map((v) => {
        const rotated = rotate3D(v, angleX, angleY, angleZ);
        const prj = project(rotated, cx, cy, baseRadius * 0.85);
        return { ...prj, z: rotated.z };
      });

      // Draw Icosahedron Edges with depth attenuation
      edges.forEach(([i, j]) => {
        const p1 = coreVerticesProjected[i]!;
        const p2 = coreVerticesProjected[j]!;
        const avgZ = (p1.z + p2.z) / 2;
        // Depth-based opacity (foreground is brighter, background is fainter)
        const alpha = Math.max(0.12, Math.min(0.85, (avgZ + 1) * 0.45 + 0.15));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(57, 255, 136, ${alpha})`;
        ctx.lineWidth = avgZ > 0 ? 1.4 : 0.8;
        ctx.stroke();
      });

      // Draw Icosahedron Vertices
      coreVerticesProjected.forEach((p, idx) => {
        const alpha = Math.max(0.2, (p.z + 1) * 0.45 + 0.15);
        const radius = (p.z > 0 ? 2.8 : 1.8) * p.scale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        // One vertex is the tracking alert beacon
        if (idx === 0) {
          ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 3, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(57, 255, 136, ${alpha})`;
          ctx.fill();
        }
      });

      // Draw orbiting satellites / telemetry particles
      particles.forEach((part) => {
        part.theta += part.speed;
        const rawP: Point3D = {
          x: part.radius * Math.cos(part.phiAngle) * Math.cos(part.theta),
          y: part.radius * Math.sin(part.phiAngle),
          z: part.radius * Math.cos(part.phiAngle) * Math.sin(part.theta),
        };
        const rotated = rotate3D(rawP, angleX * 0.8, angleY * 0.8, angleZ * 0.5);
        const prj = project(rotated, cx, cy, baseRadius);

        const alpha = Math.max(0.15, (rotated.z + 1.5) * 0.35);
        ctx.beginPath();
        ctx.arc(prj.x, prj.y, part.size * prj.scale, 0, Math.PI * 2);
        if (part.alert) {
          ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(57, 255, 136, ${alpha * 0.85})`;
        }
        ctx.fill();

        // Subtle link to center if close
        if (Math.abs(rotated.z) < 0.25 && Math.random() < 0.1) {
          ctx.beginPath();
          ctx.moveTo(prj.x, prj.y);
          ctx.lineTo(cx, cy);
          ctx.strokeStyle = `rgba(109, 143, 99, ${alpha * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-full min-h-[440px] max-h-[540px] w-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card/95 p-6 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-primary/50 group"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Corner Accent Brackets */}
      <span className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-moss/70" />
      <span className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-alert/80" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-alert/80" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-moss/70" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/80 pb-3 font-mono text-[10px] tracking-[0.25em]">
        <div className="flex items-center gap-2 text-primary">
          <span className="h-2 w-[2px] bg-alert" />
          <span>CYBER CORE // 3D MATRIX</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-primary text-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>{hovered ? "SYNCED" : "ORBITAL"}</span>
        </div>
      </div>

      {/* Center Interactive 3D Canvas */}
      <div
        ref={canvasContainerRef}
        className="relative flex-1 min-h-[260px] max-h-[360px] w-full overflow-hidden py-2"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          aria-label="Interactive 3D Holographic Cyber Core"
        />
        <div className="pointer-events-none absolute bottom-1 right-2 z-10 font-mono text-[8px] tracking-[0.2em] text-moss/70">
          DRAG / HOVER TO ROTATE
        </div>
      </div>

      {/* Bottom Focus Areas Deck */}
      <div className="relative z-10 border-t border-border/80 pt-4 font-mono">
        <div className="mb-2.5 flex items-center justify-between text-[9px] tracking-[0.25em] text-primary/80">
          <span>OPERATOR PRIORITIES</span>
          <span className="text-moss">2026 // DEFENSE</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] tracking-wider sm:grid-cols-4">
          {[
            { label: "SECURITY", code: "SEC-01" },
            { label: "INNOVATION", code: "INN-02" },
            { label: "RESILIENCE", code: "RES-03" },
            { label: "A BETTER FUTURE", code: "FUT-04", highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-sm border p-2 text-center transition-colors ${
                item.highlight
                  ? "border-primary/40 bg-primary/10 text-primary text-glow font-bold"
                  : "border-moss/30 bg-background/80 text-foreground hover:border-primary/40"
              }`}
            >
              <div className="text-[7.5px] tracking-widest text-primary/70">{item.code}</div>
              <div className="mt-0.5 truncate text-[10px] font-semibold">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
