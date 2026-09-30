import { useRef, useState, type ReactNode } from "react";

/** 3D tilt wrapper with neon border highlight following the pointer. */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
  });
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${(px - 0.5) * intensity}deg) translateY(-4px)`,
    });
    setSpot({ x: px * 100, y: py * 100, on: true });
  };

  const reset = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });
    setSpot((s) => ({ ...s, on: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={`group relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.14), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
