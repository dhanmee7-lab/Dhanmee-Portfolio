import { motion } from "motion/react";
import { ABOUT_PARAGRAPHS } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";

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
              className="text-base leading-relaxed text-foreground/80 md:text-lg"
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
            className="relative border border-primary/20 bg-[#0D0D0D]/80 backdrop-blur-sm p-10 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] w-full max-w-sm"
          >
            {/* HUD Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

            <div className="flex flex-col space-y-6 font-mono text-xl tracking-[0.4em] text-center">
              <span className="text-muted-foreground border-b border-primary/10 pb-4">THINK</span>
              <span className="text-muted-foreground border-b border-primary/10 pb-4">ANALYZE</span>
              <span className="text-muted-foreground border-b border-primary/10 pb-4">SECURE</span>
              <span className="text-alert font-bold pt-2">REPEAT</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
