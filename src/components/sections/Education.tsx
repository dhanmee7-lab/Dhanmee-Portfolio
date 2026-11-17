import { motion } from "motion/react";
import { EDUCATION } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        code="04 / TIMELINE"
        title="Education"
        subtitle="From software fundamentals to cyber security engineering."
      />

      <div className="relative pl-8 sm:pl-12">
        <span className="absolute top-0 left-2 h-full w-px bg-[image:linear-gradient(to_bottom,transparent,var(--color-moss),transparent)] sm:left-4" />
        <div className="space-y-12">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute top-6 -left-[26px] h-3 w-3 rounded-full bg-primary sm:-left-[42px] z-10">
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary" />
              </span>
              <TiltCard intensity={6} glareOpacity={0.08} className="[transform-style:preserve-3d]">
                <div className="hud-panel p-6 [transform-style:preserve-3d]">
                  <span
                    className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-moss/45 [transform:translateZ(12px)]"
                    aria-hidden="true"
                  />
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.3em] text-primary [transform:translateZ(16px)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
                    {e.period}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-foreground [transform:translateZ(18px)]">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground [transform:translateZ(12px)]">
                    {e.body}
                  </p>
                  {e.focus.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2 [transform:translateZ(14px)]">
                      {e.focus.map((f) => (
                        <li
                          key={f}
                          className="rounded-sm border border-moss/45 bg-background px-3 py-1.5 font-mono text-[11px] text-primary transition-colors hover:border-primary hover:bg-primary/10"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
