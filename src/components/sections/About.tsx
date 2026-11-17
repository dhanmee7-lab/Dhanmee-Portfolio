import { motion } from "motion/react";
import { ABOUT_PARAGRAPHS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        code="01 / IDENTITY"
        title="About Me"
        subtitle="Operator profile decrypted — background, specialization and mission."
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm"
          >
            <TiltCard
              intensity={9}
              glareOpacity={0.12}
              className="relative border border-border bg-card/95 backdrop-blur-sm p-10 rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.85),0_0_20px_rgba(57,255,136,0.06)] hover:shadow-[0_0_45px_rgba(57,255,136,0.18)] transition-shadow duration-500 w-full [transform-style:preserve-3d]"
            >
              {/* Refined Engineering Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-moss/50 [transform:translateZ(14px)]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-moss/50 [transform:translateZ(14px)]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-moss/50 [transform:translateZ(14px)]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-moss/50 [transform:translateZ(14px)]" />

              <div className="mb-6 flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] text-moss [transform:translateZ(18px)]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-alert animate-pulse"
                  aria-hidden="true"
                />
                <span>
                  OPERATOR <span className="text-alert">//</span> DOCTRINE
                </span>
              </div>

              <div className="flex flex-col space-y-6 font-mono text-xl tracking-[0.4em] text-center [transform-style:preserve-3d]">
                <span className="text-foreground border-b border-moss/30 pb-4 [transform:translateZ(16px)] transition-transform duration-300 hover:[transform:translateZ(24px)]">
                  THINK
                </span>
                <span className="text-foreground border-b border-moss/30 pb-4 [transform:translateZ(18px)] transition-transform duration-300 hover:[transform:translateZ(26px)]">
                  ANALYZE
                </span>
                <span className="text-foreground border-b border-moss/30 pb-4 [transform:translateZ(20px)] transition-transform duration-300 hover:[transform:translateZ(28px)]">
                  SECURE
                </span>
                <span className="text-primary text-glow font-bold pt-2 [transform:translateZ(26px)] transition-transform duration-300 hover:[transform:translateZ(34px)]">
                  REPEAT
                </span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
