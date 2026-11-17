import { motion } from "motion/react";
import { Award, BadgeCheck, Briefcase, Trophy } from "lucide-react";
import { ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeading
        code="05 / RECORD"
        title="Experience & Credentials"
        subtitle="Internship, certifications and verified milestones."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <TiltCard intensity={5} glareOpacity={0.08} className="[transform-style:preserve-3d]">
          <div className="hud-panel p-7 [transform-style:preserve-3d]">
            <span
              className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-moss/45 [transform:translateZ(14px)]"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 [transform:translateZ(18px)]">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                Java Application Development Internship
              </h3>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base [transform:translateZ(12px)]">
              Worked on Java programming concepts, backend development, Spring Boot fundamentals,
              object-oriented programming, and practical software development.
            </p>
          </div>
        </TiltCard>
      </motion.div>

      <div className="mb-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {CERTIFICATIONS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="h-full"
          >
            <TiltCard
              intensity={8}
              glareOpacity={0.12}
              className="h-full [transform-style:preserve-3d]"
            >
              <div className="hud-panel h-full p-6 flex flex-col justify-between [transform-style:preserve-3d]">
                <div>
                  <BadgeCheck className="h-6 w-6 text-primary [transform:translateZ(20px)]" />
                  <h4 className="mt-4 text-base font-bold text-foreground [transform:translateZ(16px)]">
                    {c.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground [transform:translateZ(12px)]">
                    {c.detail}
                  </p>
                </div>
                <div>
                  <div className="mt-5 h-px w-full bg-moss/30" />
                  <span className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-primary [transform:translateZ(16px)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
                    CERTIFIED TRACK
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a}
            initial={{ opacity: 0, x: i % 2 ? 22 : -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="hud-panel flex items-center gap-4 rounded-md p-4 transition-colors hover:border-alert/60"
          >
            {i === 0 ? (
              <Trophy className="h-5 w-5 shrink-0 text-primary" />
            ) : (
              <Award className="h-5 w-5 shrink-0 text-primary/85" />
            )}
            <p className="text-sm text-foreground">{a}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
