import { useEffect, useRef, useState, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glareOpacity?: number;
}

/**
 * Premium 3D Perspective Tilt Card
 * - Interactive multi-axis 3D rotation with smooth dampening
 * - Specular holographic emerald cursor-tracking glare
 * - Preserve-3D transform layer for nested floating dimensional elements
 * - Automatic touch / coarse pointer detection to avoid scroll interference
 * - Smooth cinematic return to rest position
 */
export function TiltCard({
  children,
  className = "",
  intensity = 10,
  glareOpacity = 0.12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
  );
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, active: false });
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointers to keep mobile scrolling buttery smooth
    if (typeof window !== "undefined") {
      setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCoarse) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const rotX = -normY * intensity;
    const rotY = normX * intensity;

    setTransform(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px) translateY(-4px)`,
    );
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    if (isCoarse) return;
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)");
    setGlarePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      className={`group relative transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {/* Dynamic Specular Emerald Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-lg transition-opacity duration-300"
        style={{
          opacity: glarePos.active ? 1 : 0,
          background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(57, 255, 136, ${glareOpacity}), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle border sheen illumination with emerald-cobalt mixed lighting */}
      <div
        className="pointer-events-none absolute -inset-[1px] z-20 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(57, 255, 136, 0.35) 0%, rgba(36, 91, 255, 0.22) 55%, transparent 75%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Card Content with 3D child preservation */}
      <div className="relative h-full w-full [transform-style:preserve-3d]">{children}</div>
    </div>
  );
}
