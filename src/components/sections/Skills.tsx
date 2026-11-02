import { motion } from "motion/react";
import { SKILL_GROUPS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        code="02 / ARSENAL"
        title="Skills Matrix"
        subtitle="Holographic capability modules across development, data and security operations."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.55, delay: gi * 0.07 }}
          >
            <TiltCard>
              <div className="hud-panel h-full p-6">
                <span
                  className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-alert/75"
                  aria-hidden="true"
                />
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold tracking-wide text-foreground">{group.title}</h3>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-primary">
                    <span className="h-1 w-1 rounded-full bg-alert" aria-hidden="true" />
                    {group.code}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="rounded-sm border border-moss/45 bg-background px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
