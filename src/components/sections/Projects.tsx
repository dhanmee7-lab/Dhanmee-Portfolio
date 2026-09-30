import { motion } from "motion/react";
import { PROJECTS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";

function AssetArcPreview() {
  const bars = [62, 38, 84, 51, 73, 29, 95, 44];
  return (
    <div className="hud-panel h-full min-h-[240px] p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
        <span>ASSET HEALTH</span>
        <span className="text-accent">LIVE</span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${b}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
            className="flex-1 rounded-t-sm bg-primary opacity-80"
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-xs">
        {[
          ["UPTIME", "99.4%"],
          ["TASKS", "27"],
          ["ALERTS", "03"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-border p-2">
            <div className="text-[9px] tracking-[0.2em] text-muted-foreground">{k}</div>
            <div className={k === "ALERTS" ? "text-alert text-glow" : "text-primary"}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VeriSentinelPreview() {
  const evidenceNodes = [
    { x: 20, y: 30, status: "verified" },
    { x: 80, y: 20, status: "verified" },
    { x: 50, y: 75, status: "analyzing" },
    { x: 30, y: 60, status: "verified" },
    { x: 70, y: 65, status: "analyzing" },
  ];
  return (
    <div className="hud-panel relative h-full min-h-[240px] overflow-hidden p-5 flex flex-col">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
        <span>CREDIBILITY INTELLIGENCE</span>
        <span className="text-alert flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-alert animate-pulse" />
          ANALYZING
        </span>
      </div>

      <div className="flex-1 flex gap-4 mt-2">
        {/* Left side: Score and Metrics */}
        <div className="flex flex-col justify-between font-mono w-1/3">
          <div>
            <div className="text-[10px] tracking-widest text-muted-foreground mb-1">CONFIDENCE</div>
            <div className="text-3xl font-light text-primary">
              94<span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="text-[9px] text-muted-foreground tracking-widest mb-1">SOURCES</div>
              <div className="flex gap-1">
                {[1, 1, 1, 1, 0].map((v, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-sm ${v ? "bg-primary/80" : "bg-primary/20"}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-muted-foreground tracking-widest mb-1">EVIDENCE</div>
              <div className="text-accent text-[10px]">7 NODES LINKED</div>
            </div>
          </div>
        </div>

        {/* Right side: Verification Mesh */}
        <div className="relative flex-1 rounded-md border border-border/50 bg-background/50 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)]" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {/* Connections to central node */}
            {evidenceNodes.map((node, i) => (
              <line
                key={`line-${i}`}
                x1="50"
                y1="45"
                x2={node.x}
                y2={node.y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray={node.status === "analyzing" ? "2,2" : "none"}
                className={
                  node.status === "analyzing" ? "text-alert/60 animate-pulse" : "text-primary/30"
                }
              />
            ))}
            {/* Central Node */}
            <circle
              cx="50"
              cy="45"
              r="5"
              className="fill-background stroke-primary"
              strokeWidth="1"
            />
            <circle cx="50" cy="45" r="2" className="fill-primary animate-pulse" />

            {/* Evidence Nodes */}
            {evidenceNodes.map((node, i) => (
              <g key={`node-${i}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.5"
                  className={
                    node.status === "analyzing" ? "fill-background stroke-alert" : "fill-primary"
                  }
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function CivicNeuronPreview() {
  const categories = [
    { name: "INFRASTRUCTURE", value: 78 },
    { name: "SANITATION", value: 45 },
    { name: "UTILITIES", value: 92 },
  ];
  return (
    <div className="hud-panel relative h-full min-h-[240px] overflow-hidden p-5 flex flex-col">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
        <span>CIVIC INTELLIGENCE</span>
        <span className="text-primary">DATA SYNCED</span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 mt-2">
        {/* Left: Metrics & Categories */}
        <div className="flex flex-col justify-between font-mono">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded border border-border/50 p-2 bg-background/50">
              <div className="text-[9px] text-muted-foreground tracking-widest">PENDING</div>
              <div className="text-alert text-lg">124</div>
            </div>
            <div className="rounded border border-border/50 p-2 bg-background/50">
              <div className="text-[9px] text-muted-foreground tracking-widest">RESOLVED</div>
              <div className="text-primary text-lg">892</div>
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-[9px] tracking-wider text-muted-foreground mb-1">
                  <span>{cat.name}</span>
                  <span>{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-primary/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map/Network */}
        <div className="relative rounded-md border border-border/50 bg-background/30 overflow-hidden flex items-center justify-center p-2">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            {/* Simple grid representing city blocks */}
            <g stroke="currentColor" className="text-muted-foreground/20" strokeWidth="0.5">
              {[20, 40, 60, 80].map((v) => (
                <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" />
              ))}
              {[20, 40, 60, 80].map((v) => (
                <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} />
              ))}
            </g>
            {/* Nodes representing civic requests */}
            <circle cx="20" cy="40" r="3" className="fill-primary" />
            <circle cx="60" cy="20" r="2.5" className="fill-primary/70" />
            <circle cx="40" cy="80" r="4" className="fill-accent/80" />
            <circle cx="80" cy="60" r="3.5" className="fill-primary" />
            <circle cx="60" cy="60" r="2" className="fill-accent" />
            <path
              d="M 20 40 L 40 80 L 60 60"
              fill="none"
              stroke="currentColor"
              className="text-accent/30"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        code="03 / MISSIONS"
        title="Projects"
        subtitle="Deployed systems combining secure backend engineering and adaptive defense research."
      />

      <div className="space-y-16">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className={`grid items-stretch gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="hud-panel p-7">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-black text-primary/30">{p.id}</span>
                <div>
                  <h3 className="text-2xl font-black tracking-wide text-foreground">{p.name}</h3>
                  <p className="font-mono text-xs tracking-[0.2em] text-accent">
                    {p.subtitle.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-foreground/75 md:text-base">
                {p.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-sm border border-primary/25 bg-[#0D0D0D] px-3 py-1.5 font-mono text-[11px] text-foreground/85"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex">
                <a
                  href="#"
                  className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-primary hover:text-alert transition-colors"
                >
                  VIEW PROJECT <span className="text-alert">→</span>
                </a>
              </div>
            </div>
            {p.id === "01" && <AssetArcPreview />}
            {p.id === "02" && <VeriSentinelPreview />}
            {p.id === "03" && <CivicNeuronPreview />}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
