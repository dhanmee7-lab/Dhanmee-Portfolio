import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "@/components/cyber/Section";
import { TiltCard } from "@/components/cyber/TiltCard";

const contactCards = [
  { icon: Mail, label: "EMAIL", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Linkedin, label: "LINKEDIN", value: "Connect on LinkedIn", href: PROFILE.linkedin },
  { icon: Github, label: "GITHUB", value: "View Repositories", href: PROFILE.github },
  { icon: MapPin, label: "LOCATION", value: PROFILE.location, href: null },
];

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        code="07 / UPLINK"
        title="Establish Contact"
        subtitle="Open channels for internships, collaborations and security engineering roles."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactCards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
          >
            <TiltCard>
              <div className="hud-panel flex flex-col items-center text-center p-8 h-full transition-colors hover:border-alert group">
                <span className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-[#0D0D0D] text-primary group-hover:text-alert group-hover:border-alert/50 transition-colors mb-6">
                  <c.icon className="h-5 w-5" />
                </span>

                <span className="block font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-3">
                  {c.label}
                </span>

                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="block text-sm font-bold text-foreground transition-colors group-hover:text-alert"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="block text-sm font-bold text-foreground">{c.value}</span>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
