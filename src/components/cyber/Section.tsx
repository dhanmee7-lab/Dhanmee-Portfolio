import { motion } from "motion/react";
import type { ReactNode } from "react";

export function SectionHeading({
  code,
  title,
  subtitle,
}: {
  code: string;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-primary/80">
        <span className="h-px w-10 bg-primary/50" />
        {code}
      </div>
      <h2 className="mt-4 text-3xl font-black uppercase sm:text-4xl md:text-5xl">
        <span className="text-foreground">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
