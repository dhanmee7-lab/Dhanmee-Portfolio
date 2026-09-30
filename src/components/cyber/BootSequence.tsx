import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BOOT_LINES } from "@/lib/portfolio-data";

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [granted, setGranted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 420 * (i + 1)));
    });
    timers.push(setTimeout(() => setGranted(true), 420 * BOOT_LINES.length + 260));
    timers.push(setTimeout(() => setExiting(true), 420 * BOOT_LINES.length + 1250));
    timers.push(setTimeout(onDone, 420 * BOOT_LINES.length + 1850));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const progress = Math.round((step / BOOT_LINES.length) * 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6"
        >
          <div className="scanlines pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative w-full max-w-xl font-mono text-sm">
            <div className="mb-6 flex items-center justify-between text-xs tracking-[0.3em] text-muted-foreground">
              <span>SECURE BOOT</span>
              <span>{progress}%</span>
            </div>

            <ul className="space-y-2">
              {BOOT_LINES.slice(0, step).map((line) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-primary"
                >
                  <span className="text-accent">[ OK ]</span>
                  <span className="text-foreground/80">{line}</span>
                </motion.li>
              ))}
              {step < BOOT_LINES.length && (
                <li className="text-muted-foreground">
                  <span className="animate-caret">█</span>
                </li>
              )}
            </ul>

            <div className="mt-8 h-[3px] w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full"
                style={{ background: "var(--gradient-cyber)" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.35 }}
              />
            </div>

            {granted && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="animate-glitch mt-10 text-center font-display text-2xl font-black tracking-[0.35em] text-accent sm:text-4xl"
              >
                ACCESS GRANTED
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
