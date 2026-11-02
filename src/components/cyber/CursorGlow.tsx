import { useEffect, useState } from "react";

/** Mouse spotlight + cursor glow ring (desktop pointers only). */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!fine) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 transition-transform duration-100 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          background: "radial-gradient(circle, rgba(57,255,136,0.06), transparent 65%)",
        }}
      />
      <div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45"
        style={{ left: pos.x, top: pos.y, boxShadow: "var(--shadow-neon)" }}
      />
    </div>
  );
}
