import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BootSequence } from "@/components/cyber/BootSequence";
import { CyberBackground } from "@/components/cyber/CyberBackground";
import { CursorGlow } from "@/components/cyber/CursorGlow";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Credentials } from "@/components/sections/Credentials";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const TITLE = "Dhanmeeswaran G — Cyber Security Engineer Portfolio";
const DESCRIPTION =
  "Cyber Security Engineering student, Java backend developer and ethical hacking enthusiast. Projects in Zero Trust architecture, Spring Boot and secure application development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <CyberBackground />
      <CursorGlow />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className={booted ? "animate-glitch" : ""}
      >
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Education />
        <Credentials />
        <TerminalSection />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
