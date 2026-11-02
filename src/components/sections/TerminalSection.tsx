import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { ACHIEVEMENTS, EDUCATION, PROFILE, PROJECTS, SKILL_GROUPS } from "@/lib/portfolio-data";

type Line = { kind: "in" | "out" | "err"; text: string };

const HELP = [
  "Available commands:",
  "  help        show this list",
  "  about       operator profile",
  "  education   academic timeline",
  "  skills      technology arsenal",
  "  projects    deployed missions",
  "  resume      download resume",
  "  linkedin    open LinkedIn profile",
  "  contact     contact channels",
  "  whoami      current identity",
  "  clear       wipe the console",
];

function run(cmd: string): { out: string[]; clear?: boolean; open?: string; error?: boolean } {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return { out: [] };
    case "help":
      return { out: HELP };
    case "about":
      return {
        out: [
          `${PROFILE.name} — ${PROFILE.status}`,
          "Java backend developer and ethical hacking enthusiast.",
          "Focus: Spring Boot, secure web apps, JWT, Zero Trust, AI security.",
        ],
      };
    case "education":
      return { out: EDUCATION.map((e) => `${e.period}  ${e.title}`) };
    case "skills":
      return { out: SKILL_GROUPS.map((g) => `${g.code.padEnd(5)} ${g.items.join(", ")}`) };
    case "projects":
      return { out: PROJECTS.map((p) => `[${p.id}] ${p.name} — ${p.subtitle}`) };
    case "resume":
      return { out: ["Initiating resume download..."], open: "/resume.pdf" };
    case "linkedin":
      return { out: ["Opening LinkedIn profile..."], open: PROFILE.linkedin };
    case "contact":
      return {
        out: [
          `email    ${PROFILE.email}`,
          `phone    ${PROFILE.phone}`,
          `linkedin ${PROFILE.linkedin}`,
          `location ${PROFILE.location}`,
        ],
      };
    case "whoami":
      return { out: [`dhanmeeswaran@cybersec:~$ ${PROFILE.name}`, ACHIEVEMENTS[0]!] };
    case "clear":
      return { out: [], clear: true };
    default:
      return {
        out: [`[ERR] command not found: ${c}`, "type 'help' for available commands"],
        error: true,
      };
  }
}

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Kali GNU/Linux — secure shell established." },
    { kind: "out", text: "Type 'help' to list available commands." },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = run(value);
    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "in", text: value },
        ...result.out.map((text, idx) => ({
          kind: (result.error && idx === 0 ? "err" : "out") as Line["kind"],
          text,
        })),
      ]);
    }
    if (result.open) window.open(result.open, "_blank", "noopener");
    setValue("");
  };

  return (
    <Section id="terminal">
      <SectionHeading
        code="06 / SHELL"
        title="Interactive Terminal"
        subtitle="Query the portfolio directly from a simulated Kali Linux console."
      />

      <div className="hud-panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-alert" />
          <span className="h-3 w-3 rounded-full bg-moss" />
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="ml-3 font-mono text-xs text-primary tracking-widest">
            TERMINAL <span className="text-alert">//</span> SECURE_SHELL
          </span>
        </div>

        <div
          ref={scrollRef}
          className="h-80 space-y-1 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <p
              key={i}
              className={
                l.kind === "in"
                  ? "text-foreground"
                  : l.kind === "err"
                    ? "text-alert"
                    : "text-primary/85"
              }
            >
              {l.kind === "in" ? (
                <>
                  <span className="text-primary">
                    ┌──(dhan<span className="text-alert">㉿</span>sec)-[~]
                  </span>
                  <br />
                  <span className="text-alert">└─$ </span>
                  <span className="text-alert font-semibold">{l.text}</span>
                </>
              ) : (
                <span className="whitespace-pre-wrap">{l.text}</span>
              )}
            </p>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2 pt-2">
            <label htmlFor="cyber-terminal" className="text-alert">
              └─$
            </label>
            <input
              id="cyber-terminal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder="type a command..."
              className="flex-1 bg-transparent font-mono text-[13px] text-foreground caret-primary outline-none placeholder:text-moss/70"
            />
          </form>
        </div>
      </div>
    </Section>
  );
}
