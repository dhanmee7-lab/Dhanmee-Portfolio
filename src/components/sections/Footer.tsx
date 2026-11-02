import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <div className="mx-auto mb-6 flex items-center justify-center gap-2.5" aria-hidden="true">
          <span className="h-px w-10 bg-moss/50" />
          <span className="h-1.5 w-1.5 bg-alert" />
          <span className="h-px w-10 bg-moss/50" />
        </div>
        <p className="mx-auto max-w-2xl font-mono text-sm leading-relaxed text-foreground sm:text-base">
          &ldquo;{PROFILE.quote}&rdquo;
        </p>
        <div className="mt-8 flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-moss uppercase">
          <span>
            {PROFILE.name} <span className="text-alert">·</span> Cyber Security Engineering
          </span>
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-2 pb-0.5 text-primary transition-opacity after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-alert after:transition-transform hover:opacity-90 hover:after:scale-x-100"
          >
            GitHub ↗
          </a>
        </div>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max gap-8 font-mono text-[10px] tracking-[0.4em] text-moss/40 uppercase">
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
                <span key={t}>
                  {t} <span className="text-alert/75">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
