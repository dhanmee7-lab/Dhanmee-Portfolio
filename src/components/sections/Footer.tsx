import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 py-14">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="mx-auto max-w-2xl font-mono text-sm leading-relaxed text-foreground sm:text-base">
          &ldquo;{PROFILE.quote}&rdquo;
        </p>
        <div className="mt-8 flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          <span>{PROFILE.name} · Cyber Security Engineering</span>
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-alert hover:text-primary transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max gap-8 font-mono text-[10px] tracking-[0.4em] text-primary/30 uppercase">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {[
                "ZERO TRUST",
                "THREAT INTELLIGENCE",
                "SPRING SECURITY",
                "PENETRATION TESTING",
                "DIGITAL FORENSICS",
                "AI SECURITY",
                "SECURE SDLC",
              ].map((t) => (
                <span key={t}>{t} ·</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
