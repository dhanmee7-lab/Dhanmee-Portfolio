import { motion } from "motion/react";
import { Github } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";

function AssetArcPreview() {
  const bars = [62, 38, 84, 51, 73, 29, 95, 44];
  return (
    <div className="hud-panel h-full min-h-[240px] p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-primary">
        <span>ASSET HEALTH</span>
        <span className="flex items-center gap-1.5 text-primary text-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${b}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
            className={`flex-1 rounded-t-sm border-t ${
              b >= 70 ? "border-primary bg-primary/85" : "border-primary/70 bg-moss/60"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 font-mono text-xs">
        {[
          { k: "UPTIME", v: "99.4%", critical: false },
          { k: "TASKS", v: "27", critical: false },
          { k: "ALERTS", v: "03", critical: true },
        ].map(({ k, v, critical }) => (
          <div
            key={k}
            className={`rounded-md border bg-background/85 p-2 ${
              critical ? "border-alert/45" : "border-moss/35"
            }`}
          >
            <div
              className={`flex items-center justify-between text-[9px] tracking-[0.2em] ${
                critical ? "text-alert" : "text-primary/80"
              }`}
            >
              <span>{k}</span>
              {critical && (
                <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
              )}
            </div>
            <div className="mt-0.5 font-bold text-primary text-glow">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VeriSentinelPreview() {
  const evidenceNodes = [
    { x: 20, y: 30, status: "verified" },
    { x: 80, y: 20, status: "flagged" },
    { x: 50, y: 75, status: "analyzing" },
    { x: 30, y: 60, status: "verified" },
    { x: 70, y: 65, status: "analyzing" },
  ];
  return (
    <div className="hud-panel relative h-full min-h-[240px] overflow-hidden p-5 flex flex-col">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-primary">
        <span>CREDIBILITY INTELLIGENCE</span>
        <span className="text-primary text-glow flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          ANALYZING
        </span>
      </div>

      <div className="flex-1 flex gap-4 mt-2">
        {/* Left side: Score and Metrics */}
        <div className="flex flex-col justify-between font-mono w-1/3">
          <div>
            <div className="text-[10px] tracking-widest text-primary/80 mb-1">CONFIDENCE</div>
            <div className="text-3xl font-semibold text-primary text-glow">
              94<span className="text-sm text-primary">%</span>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="text-[9px] text-primary/80 tracking-widest mb-1">SOURCES</div>
              <div className="flex gap-1">
                {[1, 1, 1, 1, 0].map((v, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-sm ${v ? "bg-primary" : "bg-moss/30"}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-primary/80 tracking-widest mb-1">EVIDENCE</div>
              <div className="text-primary font-semibold text-[10px]">7 NODES LINKED</div>
            </div>
          </div>
        </div>

        {/* Right side: Verification Mesh */}
        <div className="relative flex-1 rounded-md border border-moss/35 bg-background/85 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)]" />
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
                strokeDasharray={node.status !== "verified" ? "2,2" : "none"}
                className={
                  node.status === "flagged"
                    ? "text-alert/80"
                    : node.status === "analyzing"
                      ? "text-primary/80 animate-pulse"
                      : "text-moss/55"
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
                    node.status === "flagged"
                      ? "fill-alert stroke-alert"
                      : node.status === "analyzing"
                        ? "fill-background stroke-primary"
                        : "fill-moss"
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
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-primary">
        <span>CIVIC INTELLIGENCE</span>
        <span className="text-primary text-glow">DATA SYNCED</span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 mt-2">
        {/* Left: Metrics & Categories */}
        <div className="flex flex-col justify-between font-mono">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded border border-alert/40 p-2 bg-background/85">
              <div className="flex items-center justify-between text-[9px] text-alert tracking-widest">
                <span>PENDING</span>
                <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
              </div>
              <div className="text-primary text-glow font-bold text-lg">124</div>
            </div>
            <div className="rounded border border-moss/35 p-2 bg-background/85">
              <div className="text-[9px] text-primary/80 tracking-widest">RESOLVED</div>
              <div className="text-primary text-glow font-bold text-lg">892</div>
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-[9px] tracking-wider mb-1">
                  <span className="text-primary/90">{cat.name}</span>
                  <span className="font-semibold text-primary">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-background border border-moss/35 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map/Network */}
        <div className="relative rounded-md border border-moss/35 bg-background/80 overflow-hidden flex items-center justify-center p-2">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-85">
            {/* Simple grid representing city blocks */}
            <g stroke="currentColor" className="text-moss/30" strokeWidth="0.5">
              {[20, 40, 60, 80].map((v) => (
                <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" />
              ))}
              {[20, 40, 60, 80].map((v) => (
                <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} />
              ))}
            </g>
            {/* Nodes representing civic requests */}
            <circle cx="20" cy="40" r="3" className="fill-primary" />
            <circle cx="60" cy="20" r="2.5" className="fill-moss" />
            <circle cx="40" cy="80" r="3" className="fill-alert" />
            <circle
              cx="40"
              cy="80"
              r="5.5"
              className="fill-none stroke-alert/50"
              strokeWidth="0.6"
            />
            <circle cx="80" cy="60" r="3.5" className="fill-primary" />
            <circle cx="60" cy="60" r="2" className="fill-primary" />
            <path
              d="M 20 40 L 40 80 L 60 60"
              fill="none"
              stroke="currentColor"
              className="text-moss/65"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AureviaPreview() {
  const kpis = [
    { label: "TOTAL BOOKS", value: "2,480" },
    { label: "REGISTERED MEMBERS", value: "640" },
    { label: "BOOKS BORROWED", value: "184" },
    { label: "OVERDUE BOOKS", value: "09", alert: true },
  ];

  const inventory = [
    { category: "COMPUTER SCI", stock: 88 },
    { category: "SCIENCE & MATH", stock: 76 },
    { category: "LITERATURE", stock: 64 },
    { category: "REFERENCE", stock: 52 },
  ];

  const activity = [
    { day: "MON", borrowed: 58, overdue: 14 },
    { day: "TUE", borrowed: 74, overdue: 18 },
    { day: "WED", borrowed: 65, overdue: 12 },
    { day: "THU", borrowed: 88, overdue: 22 },
    { day: "FRI", borrowed: 94, overdue: 16 },
    { day: "SAT", borrowed: 46, overdue: 10 },
  ];

  return (
    <div className="hud-panel relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden p-5">
      {/* Header */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em]">
        <span className="text-primary">LIBRARY OPS DASHBOARD</span>
        <span className="flex items-center gap-1.5 text-[9px] text-primary text-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          SAMPLE PREVIEW
        </span>
      </div>

      {/* 4 Illustrative KPI Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 font-mono">
        {kpis.map((item) => (
          <div
            key={item.label}
            className={`flex flex-col justify-between rounded-sm border bg-background/85 p-2.5 ${
              item.alert ? "border-alert/45" : "border-moss/35"
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <span
                className={`text-[8px] leading-tight tracking-[0.14em] ${
                  item.alert ? "text-alert" : "text-primary/80"
                }`}
              >
                {item.label}
              </span>
              {item.alert && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-alert" aria-hidden="true" />
              )}
            </div>
            <div className="mt-1.5 text-base font-bold text-primary text-glow sm:text-lg">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Charts: Inventory + Borrowing Activity */}
      <div className="mt-3.5 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 font-mono">
        {/* Book Inventory Visualization */}
        <div className="flex flex-col rounded-sm border border-moss/35 bg-background/80 p-3">
          <div className="mb-3 flex items-center justify-between text-[9px] tracking-[0.18em]">
            <span className="text-primary">BOOK INVENTORY</span>
            <span className="text-moss">CATALOG</span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-2.5">
            {inventory.map((row, idx) => (
              <div key={row.category}>
                <div className="mb-1 flex justify-between text-[8.5px] tracking-wider">
                  <span className="text-primary/90">{row.category}</span>
                  <span className="font-semibold text-primary">{row.stock}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-sm border border-moss/35 bg-background">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.stock}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: idx * 0.08, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Borrowing Activity Chart */}
        <div className="flex flex-col justify-between rounded-sm border border-moss/35 bg-background/80 p-3">
          <div className="mb-3 flex items-center justify-between text-[9px] tracking-[0.18em]">
            <span className="text-primary">BORROWING ACTIVITY</span>
            <div className="flex items-center gap-2 text-[8px]">
              <span className="flex items-center gap-1 text-primary">
                <span className="h-1.5 w-1.5 rounded-sm bg-primary" />
                ISSUED
              </span>
              <span className="flex items-center gap-1 text-alert">
                <span className="h-1.5 w-1.5 rounded-sm bg-alert" />
                OVERDUE
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex h-28 items-end gap-2 border-b border-moss/35 pb-1.5">
              {activity.map((d, idx) => (
                <div key={d.day} className="flex h-full flex-1 items-end justify-center gap-0.5">
                  <motion.span
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.borrowed}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.07, ease: "easeOut" }}
                    className="w-2.5 rounded-t-sm border-t border-primary bg-primary/85"
                  />
                  <motion.span
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.overdue}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + idx * 0.07, ease: "easeOut" }}
                    className="w-1 rounded-t-sm bg-alert/80"
                  />
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-2">
              {activity.map((d) => (
                <span
                  key={d.day}
                  className="flex-1 text-center text-[8px] tracking-wider text-primary/80"
                >
                  {d.day}
                </span>
              ))}
            </div>
          </div>
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
              <span
                className="pointer-events-none absolute top-0 right-0 h-3.5 w-3.5 border-t-2 border-r-2 border-alert/75"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-black text-primary/85 text-glow">
                  {p.id}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-wide text-foreground">
                    {p.projectName}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary">
                    <span className="h-3 w-[2px] shrink-0 bg-alert" aria-hidden="true" />
                    {p.subtitle.toUpperCase()}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-moss/45 bg-background px-3 py-1.5 font-mono text-[11px] text-primary transition-colors hover:border-primary hover:bg-primary/10"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={p.liveDemoUrl}
                  target={p.liveDemoUrl.startsWith("http") ? "_blank" : undefined}
                  rel={p.liveDemoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="relative flex items-center gap-2 pb-0.5 font-mono text-[10px] tracking-[0.2em] text-primary transition-opacity after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-alert after:transition-transform after:duration-200 hover:opacity-90 hover:after:scale-x-100"
                >
                  VIEW PROJECT <span className="text-alert">→</span>
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-sm border border-moss/50 bg-background px-3.5 py-2 font-mono text-[10px] tracking-[0.2em] text-primary transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_16px_-6px_rgba(57,255,136,0.4)]"
                >
                  <Github
                    className="h-3.5 w-3.5 text-primary transition-colors"
                    aria-hidden="true"
                  />
                  <span>VIEW SOURCE CODE</span>
                </a>
              </div>
            </div>
            {p.id === "01" && <AssetArcPreview />}
            {p.id === "02" && <VeriSentinelPreview />}
            {p.id === "03" && <CivicNeuronPreview />}
            {p.id === "04" && <AureviaPreview />}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
