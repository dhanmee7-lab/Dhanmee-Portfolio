import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { NAV_LINKS } from "@/lib/portfolio-data";

export function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled ? "glass py-3 border-b border-primary/20" : "py-5"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display text-sm font-black tracking-[0.2em] text-primary"
        >
          <Shield className="h-4 w-4" />
          DG<span className="text-muted-foreground">/SEC</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-md px-3 py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-all ${
                  active === l.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-alert animate-pulse" />
            SYSTEM ONLINE
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="rounded-md border border-border px-3 py-2 font-mono text-[11px] tracking-[0.2em] text-primary lg:hidden"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="glass mx-5 mt-3 grid gap-1 rounded-md p-3 lg:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 font-mono text-xs tracking-[0.2em] uppercase text-foreground/85"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
