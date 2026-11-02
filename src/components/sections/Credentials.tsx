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
        className="hud-panel mb-12 p-7"
      >
        <span
          className="pointer-events-none absolute top-0 right-0 h-3.5 w-3.5 border-t-2 border-r-2 border-alert/75"
          aria-hidden="true"
        />
        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            Java Application Development Internship
          </h3>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Worked on Java programming concepts, backend development, Spring Boot fundamentals,
          object-oriented programming, and practical software development.
        </p>
      </motion.div>

      <div className="mb-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {CERTIFICATIONS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <TiltCard>
              <div className="hud-panel h-full p-6">
                <BadgeCheck className="h-6 w-6 text-primary" />
                <h4 className="mt-4 text-base font-bold text-foreground">{c.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
                <div className="mt-5 h-px w-full bg-moss/30" />
                <span className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
                  CERTIFIED TRACK
                </span>
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
