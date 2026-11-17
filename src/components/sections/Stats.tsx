import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { STATS } from "@/lib/portfolio-data";
import { Section } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{n}</span>;
}

export function Stats() {
  return (
    <Section id="stats" className="py-16">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="h-full"
          >
            <TiltCard
              intensity={9}
              glareOpacity={0.12}
              className="h-full [transform-style:preserve-3d]"
            >
              <div className="hud-panel p-7 text-center h-full flex flex-col justify-center [transform-style:preserve-3d]">
                <span
                  className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-moss/45 [transform:translateZ(12px)]"
                  aria-hidden="true"
                />
                <div className="font-display text-4xl font-black text-primary text-glow sm:text-5xl [transform:translateZ(26px)] transition-transform duration-300">
                  {s.value === null ? (
                    s.suffix
                  ) : (
                    <>
                      <Counter target={s.value} />
                      {s.suffix}
                    </>
                  )}
                </div>
                <p className="mt-3 font-mono text-[11px] tracking-[0.28em] text-primary/85 uppercase [transform:translateZ(16px)]">
                  {s.label}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
