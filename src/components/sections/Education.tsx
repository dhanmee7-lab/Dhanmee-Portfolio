import { motion } from "motion/react";
import { EDUCATION } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        code="04 / TIMELINE"
        title="Education"
        subtitle="From software fundamentals to cyber security engineering."
      />

      <div className="relative pl-8 sm:pl-12">
        <span className="absolute top-0 left-2 h-full w-px bg-[image:linear-gradient(to_bottom,transparent,var(--color-primary),transparent)] sm:left-4" />
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
              <span className="absolute top-6 -left-[26px] h-3 w-3 rounded-full bg-alert sm:-left-[42px]">
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-alert" />
              </span>
              <div className="hud-panel p-6">
                <span className="font-mono text-xs tracking-[0.3em] text-primary">{e.period}</span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{e.body}</p>
                {e.focus.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.focus.map((f) => (
                      <li
                        key={f}
                        className="rounded-sm border border-primary/25 bg-[#0D0D0D] px-3 py-1.5 font-mono text-[11px] text-foreground/85"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
