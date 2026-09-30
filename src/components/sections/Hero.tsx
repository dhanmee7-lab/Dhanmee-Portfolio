import { motion } from "motion/react";
import { Download, ChevronRight, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="relative mx-auto grid w-full max-w-7xl lg:grid-cols-12 gap-12 px-5 pt-32 pb-24 sm:px-8 z-10">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10 z-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
          >
            <div className="h-4 w-[2px] bg-alert" />
            CYBER SECURITY ENGINEERING STUDENT
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl leading-[0.9] font-black uppercase sm:text-7xl xl:text-[5.5rem] tracking-tight flex flex-col"
          >
            <span className="text-primary text-glow pb-2">DHANMEESWARAN</span>
            <span className="text-foreground">G</span>
          </motion.h1>

          {/* Subheading & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6 max-w-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-foreground leading-snug">
              BUILDING <span className="text-primary">SECURE</span> SYSTEMS.{" "}
              <br className="hidden sm:block" />
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
            className="flex flex-wrap gap-4 pt-2"
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
            className="flex flex-col gap-8 pt-6"
          >
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 font-mono">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">3+</span>
                <span className="text-[10px] tracking-widest text-muted-foreground">PROJECTS</span>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">2+</span>
                <span className="text-[10px] tracking-widest text-muted-foreground">
                  TECH STACKS
                </span>
              </div>
              <div className="h-8 w-px bg-border hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">∞</span>
                <span className="text-[10px] tracking-widest text-muted-foreground">
                  LEARNING ALWAYS
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <div className="h-[1px] w-6 bg-alert" />
              TAMIL NADU, INDIA
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 relative flex flex-col justify-center min-h-[400px] lg:min-h-full z-10 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative border border-primary/20 bg-[#0D0D0D]/80 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
            {/* HUD Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8">
              <div className="h-4 w-[2px] bg-alert" />
              FOCUS AREAS // 2026
            </div>

            <div className="flex flex-col space-y-6 font-mono text-sm sm:text-base tracking-widest text-right">
              <span className="text-foreground border-b border-primary/10 pb-2">SECURITY</span>
              <span className="text-foreground border-b border-primary/10 pb-2">INNOVATION</span>
              <span className="text-foreground border-b border-primary/10 pb-2">RESILIENCE</span>
              <span className="text-alert font-bold pt-2">A BETTER TOMORROW</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <Mouse className="h-4 w-4 text-primary animate-bounce" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">SCROLL DOWN</span>
      </motion.div>
    </section>
  );
}
