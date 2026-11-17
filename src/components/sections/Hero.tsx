import { motion } from "motion/react";
import { Download, ChevronRight, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3DObject } from "@/components/cyber/Hero3DObject";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-7xl lg:grid-cols-12 gap-10 px-5 pt-28 pb-16 lg:pt-32 lg:pb-20 sm:px-8 z-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-7 z-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-primary uppercase"
          >
            <div className="h-4 w-[2px] bg-alert" />
            CYBER SECURITY ENGINEERING STUDENT
          </motion.div>

          {/* Main Heading — Strictly single-line desktop alignment */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-[clamp(1.55rem,3.8vw,3.4rem)] font-black uppercase tracking-tight flex items-baseline gap-x-2.5 sm:gap-x-4 sm:flex-nowrap flex-wrap sm:whitespace-nowrap leading-none"
          >
            <span className="text-primary text-glow">DHANMEESWARAN</span>
            <span className="text-foreground tracking-normal font-black">G</span>
          </motion.h1>

          {/* Subheading & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-4 max-w-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-foreground leading-snug">
              BUILDING <span className="text-primary">SECURE</span> SYSTEMS.{" "}
              <br className="hidden sm:inline" />
              DEFENDING <span className="text-primary">DIGITAL FUTURES</span>.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Cyber Security Engineering student passionate about building secure, scalable, and
              intelligent systems. Exploring the intersection of security, cloud, and emerging
              technologies.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <Button variant="cyber" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#projects">
                VIEW PROJECTS <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghostCyber" size="lg" className="w-full sm:w-auto" asChild>
              <a href="/resume.pdf" download>
                DOWNLOAD RESUME <Download className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Stats & Location Group */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col gap-6 pt-4"
          >
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary text-glow">3+</span>
                <span className="text-[10px] tracking-widest text-primary/85">PROJECTS</span>
              </div>
              <div className="h-8 w-px bg-moss/35 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary text-glow">2+</span>
                <span className="text-[10px] tracking-widest text-primary/85">TECH STACKS</span>
              </div>
              <div className="h-8 w-px bg-moss/35 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary text-glow">∞</span>
                <span className="text-[10px] tracking-widest text-primary/85">LEARNING ALWAYS</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-primary/90">
              <span className="h-1.5 w-1.5 rounded-full bg-alert" aria-hidden="true" />
              <div className="h-[1px] w-6 bg-moss" />
              TAMIL NADU, INDIA
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — 3D Titanium Sculpture & Cyber Core */}
        <div className="lg:col-span-5 relative flex flex-col justify-center min-h-[440px] z-10 mt-8 lg:mt-0">
          <Hero3DObject />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/85"
      >
        <Mouse className="h-4 w-4 text-primary animate-bounce" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">SCROLL DOWN</span>
      </motion.div>
    </section>
  );
}
