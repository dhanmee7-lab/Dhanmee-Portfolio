import { useEffect, useRef } from "react";

/**
 * Layered canvas ambience: minimal cyber grid, sparse binary rain, drifting particles,
 * network packets. One RAF loop, DPR aware, motion-safe.
 */
export function CyberBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    type Column = { x: number; y: number; speed: number; chars: string[] };
    type Packet = { t: number; speed: number; lane: number };

    let particles: Particle[] = [];
    let columns: Column[] = [];
    let packets: Packet[] = [];

    const glyphs = "01".split("");

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sparse particles
      const count = Math.min(60, Math.round((w * h) / 25000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.4 + 0.1,
      }));

      // Very sparse binary rain
      const colWidth = 40;
      columns = Array.from({ length: Math.ceil(w / colWidth) }, (_, i) => ({
        x: i * colWidth + 10,
        y: Math.random() * -h * 2,
        speed: Math.random() * 20 + 15,
        chars: Array.from({ length: 8 }, () => glyphs[(Math.random() * glyphs.length) | 0]!),
      })).filter(() => Math.random() > 0.5); // only keep half the columns

      // Minimal security packets (red)
      packets = Array.from({ length: 5 }, (_, i) => ({
        t: Math.random(),
        speed: Math.random() * 0.04 + 0.02,
        lane: Math.floor(Math.random() * 10),
      }));
    };

    seed();
    const onResize = () => seed();
    window.addEventListener("resize", onResize);

    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, w, h);

      // binary rain (muted gold/white)
      ctx.font = "10px ui-monospace, monospace";
      for (const c of columns) {
        c.y += c.speed * dt * 5;
        if (c.y - c.chars.length * 14 > h) {
          c.y = Math.random() * -200;
          c.speed = Math.random() * 20 + 15;
        }
        c.chars.forEach((ch, idx) => {
          const y = c.y - idx * 14;
          if (y < -20 || y > h + 20) return;
          const fade = 1 - idx / c.chars.length;
          // White leading char, trailing muted gold
          ctx.fillStyle =
            idx === 0 ? `rgba(255,255,255,${0.5 * fade})` : `rgba(212,175,55,${0.15 * fade})`;
          ctx.fillText(ch, c.x, y);
        });
        if (Math.random() < 0.02) {
          c.chars[(Math.random() * c.chars.length) | 0] =
            glyphs[(Math.random() * glyphs.length) | 0]!;
        }
      }

      // particles + links (dark gold)
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,55,${p.a * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - d / 100)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // network packets travelling horizontal lanes (muted red)
      for (const pk of packets) {
        pk.t += pk.speed * dt;
        if (pk.t > 1.2) {
          pk.t = -0.2;
          pk.lane = Math.floor(Math.random() * 10); // change lane
        }
        const y = (h / 11) * (pk.lane + 1);
        const x = pk.t * w;
        const g = ctx.createLinearGradient(x - 50, y, x, y);
        g.addColorStop(0, "rgba(193,18,31,0)");
        g.addColorStop(1, "rgba(193,18,31,0.6)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x - 50, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030303]">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />

      {/* Canvas for dynamic elements */}
      <canvas ref={ref} className="h-full w-full opacity-60" aria-hidden="true" />

      {/* HUD Corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-primary/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/20" />

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 opacity-40" aria-hidden="true" />
    </div>
  );
}
