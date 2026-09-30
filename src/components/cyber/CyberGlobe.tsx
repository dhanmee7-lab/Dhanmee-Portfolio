import { useEffect, useRef } from "react";

/** Wireframe rotating globe with orbital arcs and threat pings, drawn on canvas. */
export function CyberGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let size = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pings = Array.from({ length: 14 }, () => ({
      lat: (Math.random() - 0.5) * Math.PI * 0.85,
      lon: Math.random() * Math.PI * 2,
      phase: Math.random(),
    }));

    let t = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = size * 0.38;
      t += 0.004;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // atmosphere
      const glow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.5);
      glow.addColorStop(0, "rgba(212,175,55,0.16)");
      glow.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(212,175,55,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // latitude rings
      for (let i = -4; i <= 4; i++) {
        const lat = (i / 5) * (Math.PI / 2);
        const rr = Math.cos(lat) * r;
        const yy = cy + Math.sin(lat) * r;
        ctx.strokeStyle = "rgba(212,175,55,0.16)";
        ctx.beginPath();
        ctx.ellipse(cx, yy, rr, rr * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // longitude meridians rotating
      for (let i = 0; i < 12; i++) {
        const a = t + (i / 12) * Math.PI;
        const rx = Math.abs(Math.cos(a)) * r;
        ctx.strokeStyle = `rgba(212,175,55,${0.06 + 0.14 * Math.abs(Math.sin(a))})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // threat pings on the visible hemisphere
      for (const p of pings) {
        const lon = p.lon + t * 2;
        const x = cx + Math.cos(p.lat) * Math.sin(lon) * r;
        const y = cy - Math.sin(p.lat) * r;
        const front = Math.cos(lon) > 0;
        if (!front) continue;
        const pulse = (t * 1.6 + p.phase) % 1;
        ctx.fillStyle = "rgba(193,18,31,0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(193,18,31,${0.5 * (1 - pulse)})`;
        ctx.beginPath();
        ctx.arc(x, y, 3 + pulse * 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      // orbital ring
      ctx.strokeStyle = "rgba(212,175,55,0.3)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.25, r * 0.34, Math.sin(t) * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      const sat = t * 3;
      const sx = cx + Math.cos(sat) * r * 1.25;
      const sy = cy + Math.sin(sat) * r * 0.34;
      ctx.fillStyle = "rgba(255,215,0,0.95)";
      ctx.beginPath();
      ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
