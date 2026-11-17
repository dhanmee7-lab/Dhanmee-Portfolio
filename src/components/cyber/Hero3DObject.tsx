import { useEffect, useRef, useState } from "react";

/**
 * Floating Dark Chrome & Black Titanium Geometric Sculpture
 * - Solid faceted titanium & chrome polyhedron with real physical lighting
 * - Diffuse studio illumination, specular chrome highlights & emerald rim lighting
 * - Three dimensional dark chrome & titanium orbital gimbal rings with metallic bevels
 * - Inner pulsing emerald reactor node shining through geometric facets
 * - Soft dimensional drop shadow giving grounded physical weight
 * - Smooth pointer-driven pitch/yaw rotation with luxury inertia damping
 * - DPR-aware, motion-safe, responsive HTML5 Canvas 3D rendering
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

    // 3D Point & Face Math
    type Point3D = { x: number; y: number; z: number };
    type ProjectedPoint = { x: number; y: number; z: number; scale: number };

    // Rhombic Dodecahedral Titanium Core Vertices
    // 6 axial vertices + 8 cubic vertices = 14 vertices, 24 triangular facets
    const rOuter = 1.0;
    const rInner = 0.62;

    const axialVertices: Point3D[] = [
      { x: rOuter, y: 0, z: 0 }, // 0: +X
      { x: -rOuter, y: 0, z: 0 }, // 1: -X
      { x: 0, y: rOuter, z: 0 }, // 2: +Y
      { x: 0, y: -rOuter, z: 0 }, // 3: -Y
      { x: 0, y: 0, z: rOuter }, // 4: +Z
      { x: 0, y: 0, z: -rOuter }, // 5: -Z
    ];

    const cubicVertices: Point3D[] = [
      { x: rInner, y: rInner, z: rInner }, // 6: +++
      { x: -rInner, y: rInner, z: rInner }, // 7: -++
      { x: rInner, y: -rInner, z: rInner }, // 8: +-+
      { x: -rInner, y: -rInner, z: rInner }, // 9: --+
      { x: rInner, y: rInner, z: -rInner }, // 10: ++-
      { x: -rInner, y: rInner, z: -rInner }, // 11: -+-
      { x: rInner, y: -rInner, z: -rInner }, // 12: +--
      { x: -rInner, y: -rInner, z: -rInner }, // 13: ---
    ];

    const allVertices: Point3D[] = [...axialVertices, ...cubicVertices];

    // 24 Triangular Facets (connecting axial vertices to adjacent cubic vertices)
    const rawFaces: [number, number, number][] = [
      // +Z pyramid faces (connected to axial 4: +Z)
      [4, 6, 7],
      [4, 7, 9],
      [4, 9, 8],
      [4, 8, 6],
      // -Z pyramid faces (connected to axial 5: -Z)
      [5, 11, 10],
      [5, 10, 12],
      [5, 12, 13],
      [5, 13, 11],
      // +Y pyramid faces (connected to axial 2: +Y)
      [2, 10, 6],
      [2, 6, 7],
      [2, 7, 11],
      [2, 11, 10],
      // -Y pyramid faces (connected to axial 3: -Y)
      [3, 8, 12],
      [3, 12, 13],
      [3, 13, 9],
      [3, 9, 8],
      // +X pyramid faces (connected to axial 0: +X)
      [0, 6, 10],
      [0, 10, 12],
      [0, 12, 8],
      [0, 8, 6],
      // -X pyramid faces (connected to axial 1: -X)
      [1, 11, 7],
      [1, 7, 9],
      [1, 9, 13],
      [1, 13, 11],
    ];

    // Resize handler with zero height feedback loop
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

    // Rotation angles
    let angleX = 0.25;
    let angleY = 0.45;
    let angleZ = 0.12;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nx * 0.7;
      mouseRef.current.targetY = ny * 0.7;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 3D Matrix Rotation (X, Y, Z Euler)
    const rotate3D = (p: Point3D, rx: number, ry: number, rz: number): Point3D => {
      const y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
      const z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);

      const x2 = p.x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -p.x * Math.sin(ry) + z1 * Math.cos(ry);

      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return { x: x3, y: y3, z: z2 };
    };

    // Perspective projection onto screen
    const fov = 3.4;
    const project = (p: Point3D, cx: number, cy: number, radius: number): ProjectedPoint => {
      const zOffset = p.z + fov;
      const scale = fov / Math.max(zOffset, 0.1);
      return {
        x: cx + p.x * radius * scale,
        y: cy + p.y * radius * scale,
        z: p.z,
        scale,
      };
    };

    // Virtual Studio Light Direction Vectors (normalized)
    const light1 = { x: 0.52, y: -0.68, z: 0.52 }; // Overhead key light
    const light2 = { x: -0.58, y: 0.42, z: 0.68 }; // Emerald rim/fill light

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      // Inertial mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Slow luxury cinematic rotation
      angleX += (0.16 + mouseRef.current.y * 0.6) * dt;
      angleY += (0.24 + mouseRef.current.x * 0.6) * dt;
      angleZ += 0.08 * dt;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.32;

      // 1. Soft Dimensional Drop Shadow on Chamber Floor
      const shadowY = cy + baseRadius * 1.25;
      const shadowGrad = ctx.createRadialGradient(cx, shadowY, 0, cx, shadowY, baseRadius * 1.4);
      shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
      shadowGrad.addColorStop(0.5, "rgba(8, 14, 10, 0.35)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.save();
      ctx.scale(1, 0.32);
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(cx, shadowY / 0.32, baseRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Ambient Volumetric Emerald Core Glow
      const ambientGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseRadius * 1.5);
      ambientGlow.addColorStop(0, "rgba(57, 255, 136, 0.16)");
      ambientGlow.addColorStop(0.4, "rgba(109, 143, 99, 0.06)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Three Dimensional Dark Chrome Orbital Rings
      const rings = [
        // Ring 1: Outer Dark Chrome Ring with bevels
        {
          radius: baseRadius * 1.62,
          thickness: 3.5,
          rx: angleX * 0.75,
          ry: angleY * 0.55,
          rz: 0.42,
          segments: 56,
          isChrome: true,
        },
        // Ring 2: Mid Titanium Gimbal Ring with emerald calibration marks
        {
          radius: baseRadius * 1.95,
          thickness: 2.2,
          rx: -angleX * 0.5,
          ry: angleY * 0.85,
          rz: -0.65,
          segments: 64,
          isChrome: false,
        },
        // Ring 3: Inner Counter-Rotating Ring
        {
          radius: baseRadius * 1.32,
          thickness: 1.8,
          rx: angleX * 0.4,
          ry: -angleY * 0.65,
          rz: 1.15,
          segments: 48,
          isChrome: false,
        },
      ];

      rings.forEach((ring) => {
        const ringPoints: ProjectedPoint[] = [];
        for (let i = 0; i <= ring.segments; i++) {
          const theta = (i / ring.segments) * Math.PI * 2;
          const rawP: Point3D = {
            x: Math.cos(theta),
            y: 0,
            z: Math.sin(theta),
          };
          const rotated = rotate3D(rawP, ring.rx, ring.ry, ring.rz);
          ringPoints.push(project(rotated, cx, cy, ring.radius));
        }

        // Draw primary ring body
        ctx.beginPath();
        ctx.moveTo(ringPoints[0]!.x, ringPoints[0]!.y);
        for (let i = 1; i < ringPoints.length; i++) {
          ctx.lineTo(ringPoints[i]!.x, ringPoints[i]!.y);
        }
        ctx.strokeStyle = ring.isChrome ? "rgba(109, 143, 99, 0.45)" : "rgba(57, 255, 136, 0.35)";
        ctx.lineWidth = ring.thickness;
        ctx.stroke();

        // Specular chrome edge highlight along ring
        ctx.beginPath();
        for (let i = 0; i < ringPoints.length; i++) {
          const pt = ringPoints[i]!;
          if (pt.z > 0.2) {
            ctx.arc(pt.x, pt.y, ring.thickness * 0.7, 0, Math.PI * 2);
          }
        }
        ctx.fillStyle = ring.isChrome ? "rgba(255, 255, 255, 0.3)" : "rgba(57, 255, 136, 0.45)";
        ctx.fill();
      });

      // 4. Transform & Project All Sculpture Vertices
      const transformedVertices = allVertices.map((v) => {
        const rotated = rotate3D(v, angleX, angleY, angleZ);
        const prj = project(rotated, cx, cy, baseRadius * 0.88);
        return { rotated, prj };
      });

      // 5. Prepare and Depth-Sort Solid Faces (Painter's Algorithm)
      type FaceData = {
        indices: [number, number, number];
        centerZ: number;
        normalZ: number;
        diffuse1: number;
        diffuse2: number;
        specular: number;
        rim: number;
      };

      const faceList: FaceData[] = [];

      rawFaces.forEach(([i1, i2, i3]) => {
        const v1 = transformedVertices[i1]!.rotated;
        const v2 = transformedVertices[i2]!.rotated;
        const v3 = transformedVertices[i3]!.rotated;

        // Normal Vector via Cross Product: (v2 - v1) x (v3 - v1)
        const ax = v2.x - v1.x;
        const ay = v2.y - v1.y;
        const az = v2.z - v1.z;
        const bx = v3.x - v1.x;
        const by = v3.y - v1.y;
        const bz = v3.z - v1.z;

        let nx = ay * bz - az * by;
        let ny = az * bx - ax * bz;
        let nz = ax * by - ay * bx;
        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len;
        ny /= len;
        nz /= len;

        // Back-face culling with soft threshold
        if (nz < -0.2) return;

        const centerZ = (v1.z + v2.z + v3.z) / 3;

        // Physical lighting calculations
        const d1 = Math.max(0, nx * light1.x + ny * light1.y + nz * light1.z);
        const d2 = Math.max(0, nx * light2.x + ny * light2.y + nz * light2.z);

        // Blinn-Phong specular highlight for dark chrome
        const hx = light1.x;
        const hy = light1.y;
        const hz = light1.z + 1.0;
        const hLen = Math.hypot(hx, hy, hz) || 1;
        const specAngle = Math.max(0, (nx * hx + ny * hy + nz * hz) / hLen);
        const spec = Math.pow(specAngle, 18);

        // Emerald Fresnel Rim Lighting (high at grazing angles where nz is near 0)
        const rimFactor = Math.pow(Math.max(0, 1 - Math.abs(nz)), 2.6);

        faceList.push({
          indices: [i1, i2, i3],
          centerZ,
          normalZ: nz,
          diffuse1: d1,
          diffuse2: d2,
          specular: spec,
          rim: rimFactor,
        });
      });

      // Sort faces back to front
      faceList.sort((a, b) => a.centerZ - b.centerZ);

      // 6. Draw Inner Glowing Reactor Core before front faces
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(57, 255, 136, 0.4)";
      ctx.fill();

      // 7. Render Solid Shaded Metallic Faces
      faceList.forEach((face) => {
        const p1 = transformedVertices[face.indices[0]]!.prj;
        const p2 = transformedVertices[face.indices[1]]!.prj;
        const p3 = transformedVertices[face.indices[2]]!.prj;

        // Calculate physical color channels for Black Titanium / Dark Chrome
        const rVal = Math.min(
          255,
          Math.round(14 + face.diffuse1 * 26 + face.specular * 105 + face.rim * 20),
        );
        const gVal = Math.min(
          255,
          Math.round(
            22 + face.diffuse1 * 36 + face.diffuse2 * 55 + face.specular * 190 + face.rim * 145,
          ),
        );
        const bVal = Math.min(
          255,
          Math.round(18 + face.diffuse1 * 30 + face.specular * 110 + face.rim * 35),
        );

        // Solid shaded polygon face
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
        ctx.fill();

        // Metallic Chamfer Edge Highlight
        ctx.strokeStyle = `rgba(57, 255, 136, ${0.18 + face.rim * 0.55 + face.specular * 0.45})`;
        ctx.lineWidth = face.centerZ > 0 ? 1.4 : 0.8;
        ctx.stroke();
      });

      // 8. Precision Vertex Beacons & Status Nodes
      transformedVertices.forEach(({ prj, rotated }, idx) => {
        if (rotated.z < -0.3) return;
        const radius = (rotated.z > 0 ? 2.6 : 1.8) * prj.scale;
        ctx.beginPath();
        ctx.arc(prj.x, prj.y, radius, 0, Math.PI * 2);

        if (idx === 0) {
          // Alert telemetry beacon
          ctx.fillStyle = "rgba(255, 0, 0, 0.95)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(prj.x, prj.y, radius + 3, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(57, 255, 136, 0.85)";
          ctx.fill();
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
          <span>CYBER CORE // TITANIUM SCULPTURE</span>
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
          aria-label="Floating Dark Chrome and Black Titanium Geometric Sculpture"
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
