import { useEffect, useRef } from "react";

/**
 * 3D Holographic Perspective Environment
 * - 3D Infinite Perspective Horizon Grid with forward motion
 * - 3D Floating Geometric Nodes & Constellation Links
 * - Drifting 3D Wireframe Polyhedrons
 * - Interactive pointer parallax with smooth inertial dampening
 * - High-contrast text preservation with atmospheric gradient masking
 * - Pauses automatically when tab is hidden, motion-safe
 */
export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Parallax mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    type Node3D = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      r: number;
      alert?: boolean;
    };

    type Poly3D = {
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
      vrx: number;
      vry: number;
      size: number;
    };

    let nodes: Node3D[] = [];
    let polys: Poly3D[] = [];
    let gridOffset = 0;

    const seed = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 3D Nodes
      const count = Math.min(50, Math.round((w * h) / 32000));
      nodes = Array.from({ length: count }, (_, idx) => ({
        x: (Math.random() - 0.5) * w * 1.5,
        y: (Math.random() - 0.5) * h * 1.5,
        z: Math.random() * 800 + 100, // 100 to 900 depth
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        alert: idx === 0, // Rare alert node
      }));

      // 3D Floating Polyhedrons (Diamonds/Cubes)
      polys = Array.from({ length: 6 }, () => ({
        x: (Math.random() - 0.5) * w * 1.2,
        y: (Math.random() - 0.5) * h * 1.2,
        z: Math.random() * 600 + 200,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        vrx: (Math.random() - 0.5) * 0.008,
        vry: (Math.random() - 0.5) * 0.008,
        size: Math.random() * 16 + 12,
      }));
    };

    seed();

    const onResize = () => seed();
    window.addEventListener("resize", onResize);

    const onPointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let lastTime = performance.now();

    const draw = (now: number) => {
      if (document.hidden) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const fov = 450;
      const cx = w / 2 + mouse.x * 35;
      const cy = h * 0.52 + mouse.y * 25;

      // 1. Draw 3D Perspective Ground Grid (Tron/Command Horizon)
      gridOffset = (gridOffset + 18 * dt) % 40;
      const horizonY = h * 0.58 + mouse.y * 15;
      const gridBottomY = h + 100;
      const numLines = 18;

      ctx.save();
      // Vanishing perspective rays
      for (let i = -numLines; i <= numLines; i++) {
        const xBottom = cx + i * 90 + mouse.x * 60;
        ctx.beginPath();
        ctx.moveTo(cx, horizonY);
        ctx.lineTo(xBottom, gridBottomY);
        const distFromCenter = Math.abs(i) / numLines;
        ctx.strokeStyle = `rgba(38, 58, 43, ${0.45 * (1 - distFromCenter)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Horizontal perspective rungs with exponential depth spacing
      for (let z = 30; z <= 600; z += 35) {
        const effectiveZ = z - gridOffset;
        if (effectiveZ < 10) continue;
        const scale = fov / (fov + effectiveZ);
        const y = horizonY + (gridBottomY - horizonY) * scale;
        if (y < horizonY || y > h + 50) continue;

        const alpha = Math.min(0.35, Math.pow(scale, 1.4) * 0.6);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(109, 143, 99, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw 3D Floating Polyhedrons (Wireframe Octahedrons)
      polys.forEach((poly) => {
        poly.rx += poly.vrx;
        poly.ry += poly.vry;

        const pz = poly.z;
        const scale = fov / (fov + pz);
        const px = cx + (poly.x + mouse.x * 20) * scale;
        const py = cy + (poly.y + mouse.y * 20) * scale;

        if (px < -100 || px > w + 100 || py < -100 || py > h + 100) return;

        const s = poly.size * scale;
        const alpha = Math.max(0.08, Math.min(0.28, scale * 0.5));

        // Projected vertices of an octahedron
        const cosY = Math.cos(poly.ry);
        const sinY = Math.sin(poly.ry);
        const cosX = Math.cos(poly.rx);
        const sinX = Math.sin(poly.rx);

        const vTop = { x: px, y: py - s * cosX };
        const vBottom = { x: px, y: py + s * cosX };
        const vLeft = { x: px - s * cosY, y: py - s * sinY * sinX * 0.4 };
        const vRight = { x: px + s * cosY, y: py + s * sinY * sinX * 0.4 };

        ctx.strokeStyle = `rgba(57, 255, 136, ${alpha})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(vTop.x, vTop.y);
        ctx.lineTo(vLeft.x, vLeft.y);
        ctx.lineTo(vBottom.x, vBottom.y);
        ctx.lineTo(vRight.x, vRight.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(vTop.x, vTop.y);
        ctx.lineTo(vBottom.x, vBottom.y);
        ctx.stroke();
      });

      // 3. Project and Render 3D Constellation Nodes
      type ProjectedNode = {
        sx: number;
        sy: number;
        scale: number;
        alpha: number;
        alert: boolean;
      };
      const projectedNodes: ProjectedNode[] = [];

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Wrap boundaries
        if (n.x < -w) n.x = w;
        if (n.x > w) n.x = -w;
        if (n.y < -h) n.y = h;
        if (n.y > h) n.y = -h;
        if (n.z < 50) n.z = 850;
        if (n.z > 850) n.z = 50;

        const scale = fov / (fov + n.z);
        const sx = cx + (n.x + mouse.x * 40) * scale;
        const sy = cy + (n.y + mouse.y * 30) * scale;
        const alpha = Math.max(0.1, Math.min(0.65, scale * 0.75));

        projectedNodes.push({ sx, sy, scale, alpha, alert: Boolean(n.alert) });

        // Draw Node
        ctx.beginPath();
        ctx.arc(sx, sy, n.r * scale * 1.5, 0, Math.PI * 2);
        if (n.alert) {
          ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(57, 255, 136, ${alpha * 0.85})`;
        }
        ctx.fill();
      });

      // Draw Proximity Connections between 3D nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i]!;
          const p2 = projectedNodes[j]!;
          const dist = Math.hypot(p1.sx - p2.sx, p1.sy - p2.sy);
          if (dist < 110) {
            const linkAlpha = (1 - dist / 110) * Math.min(p1.alpha, p2.alpha) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.strokeStyle = `rgba(109, 143, 99, ${linkAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* 3D Canvas Layer */}
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      {/* Atmospheric depth vignette to protect text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_70%,rgba(0,0,0,0.95)_100%)]" />

      {/* Futuristic HUD Corners & Fiducial Ticks */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t border-l border-moss/45">
        <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 bg-alert/85" />
      </div>
      <div className="absolute top-6 right-6 h-8 w-8 border-t border-r border-moss/45" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-moss/45" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-moss/45">
        <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 bg-alert/85" />
      </div>

      {/* Subtle Scanlines */}
      <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />
    </div>
  );
}
