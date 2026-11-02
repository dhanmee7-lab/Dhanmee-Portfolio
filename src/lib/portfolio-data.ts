export const PROFILE = {
  name: "Dhanmeeswaran G",
  headline:
    "Cyber Security Engineering Student | Java Backend Developer | Ethical Hacking Enthusiast",
  tagline: "Building Secure Systems. Defending Digital Futures.",
  status: "Cyber Security Engineering Student",
  location: "Tamil Nadu, India",
  email: "dhanmee7@gmail.com",
  phone: "YOUR PHONE HERE",
  linkedin: "https://www.linkedin.com/in/dhanmeeswaran-g-b36618318/",
  github: "https://github.com/dhanmee7-lab",
  instagram: "@im_dhanmees__",
  quote: "The strongest defense begins with continuous learning.",
};

export const ROLES = [
  "Cyber Security Engineer",
  "Ethical Hacker",
  "Java Backend Developer",
  "SOC Analyst",
  "AI Security Enthusiast",
  "Zero Trust Researcher",
];

export const BOOT_LINES = [
  "Initializing Security Engine...",
  "Loading Threat Intelligence...",
  "Connecting Secure Network...",
  "Decrypting Portfolio...",
  "Identity Verified...",
];

export const ABOUT_PARAGRAPHS = [
  "Hello, I'm Dhanmeeswaran G. I am a Cyber Security Engineering student with a strong foundation in software development, networking, and cybersecurity.",
  "Before engineering, I successfully completed a Diploma in Computer Science Engineering, where I built my programming and technical fundamentals.",
  "Today, I specialize in Java backend development, Spring Boot, secure web applications, JWT authentication, REST APIs, and cybersecurity technologies.",
  "I enjoy learning through practical projects, cybersecurity labs, and hands-on experimentation. I believe cybersecurity is not just about defending systems — it is about understanding how attackers think and building solutions that stay resilient.",
  "I continuously improve my knowledge in ethical hacking, Zero Trust Architecture, AI-powered cybersecurity, cloud security, digital forensics, and secure software engineering. My goal is to become a professional Cyber Security Engineer capable of designing intelligent security solutions for modern organizations.",
];

export const SKILL_GROUPS: { title: string; code: string; items: string[] }[] = [
  { title: "Programming", code: "LANG", items: ["Java", "Python", "JavaScript", "SQL"] },
  {
    title: "Backend",
    code: "SRV",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Hibernate",
      "JPA",
      "REST API",
      "JWT Authentication",
      "Maven",
    ],
  },
  { title: "Frontend", code: "UI", items: ["React", "Redux", "HTML", "CSS", "Bootstrap"] },
  { title: "Database", code: "DB", items: ["MySQL"] },
  {
    title: "Cybersecurity",
    code: "SEC",
    items: [
      "Kali Linux",
      "Wireshark",
      "Burp Suite",
      "Nmap",
      "Metasploit",
      "Linux",
      "OWASP Top 10",
      "Networking",
    ],
  },
  { title: "Tooling", code: "OPS", items: ["Git", "GitHub", "Docker"] },
];

export type ProjectItem = {
  id: string;
  name: string;
  projectName: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  visual: "dashboard" | "network" | "library";
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    name: "AssetArc",
    projectName: "AssetArc",
    subtitle: "Industrial Equipment Lifecycle Monitor",
    description:
      "AssetArc is a full-stack industrial asset lifecycle monitoring system developed using Java Spring Boot, React, JWT Authentication, MySQL, Hibernate, and REST APIs. It enables organizations to register assets, monitor equipment health, schedule preventive maintenance, assign technicians, manage maintenance history, and visualize operational dashboards.",
    technologies: [
      "Role Based Authentication",
      "JWT Login",
      "Maintenance Scheduling",
      "Dashboard",
      "Asset Monitoring",
      "REST APIs",
      "React Dashboard",
      "Spring Boot Backend",
      "MySQL Database",
    ],
    liveDemoUrl: "#",
    githubUrl: "https://github.com/dhanmee7-lab/Asset-ARC",
    visual: "dashboard",
  },
  {
    id: "02",
    name: "VeriSentinel",
    projectName: "VeriSentinel",
    subtitle: "Real-Time Information Verification & Credibility Intelligence Platform",
    description:
      "VeriSentinel is an information verification platform designed to analyze digital content, assess credibility, identify potentially misleading information, and provide evidence-based verification insights through an intelligent analysis pipeline.",
    technologies: [
      "Information Verification",
      "Credibility Analysis",
      "AI/ML",
      "Evidence Intelligence",
      "NLP",
      "REST APIs",
      "React",
      "Python",
    ],
    liveDemoUrl: "#",
    githubUrl: "https://github.com/dhanmee7-lab/VeriSentinel",
    visual: "network",
  },
  {
    id: "03",
    name: "CivicNeuron",
    projectName: "CivicNeuron",
    subtitle: "Civic Intelligence & Public Service Platform",
    description:
      "CivicNeuron is a civic technology platform designed to connect citizens with public services, simplify issue reporting, track civic requests, and provide data-driven insights for transparent community management.",
    technologies: [
      "Civic Technology",
      "Smart Governance",
      "Issue Reporting",
      "Data Analytics",
      "Public Services",
      "React",
      "Spring Boot",
      "MySQL",
    ],
    liveDemoUrl: "#",
    githubUrl: "https://github.com/dhanmee7-lab/CivicNeuron",
    visual: "dashboard",
  },
  {
    id: "04",
    name: "AUREVIA",
    projectName: "AUREVIA",
    subtitle: "School Library Management System",
    description:
      "Aurevia is a full-stack School Library Management System designed to simplify library operations through efficient book management, member management, borrowing and returns, due-date tracking, overdue fine management, and analytical dashboards.",
    technologies: [
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "REST APIs",
      "JWT Authentication",
      "Library Management",
      "Dashboard",
      "Responsive UI",
    ],
    liveDemoUrl: "#",
    githubUrl: "https://github.com/dhanmee7-lab/Aurevia",
    visual: "library",
  },
];

export const EDUCATION = [
  {
    period: "2023 – 2025",
    title: "Diploma in Computer Science Engineering",
    body: "Built strong programming fundamentals. Learned Java, databases, software engineering, networking, and web technologies.",
    focus: [] as string[],
  },
  {
    period: "2025 – Present",
    title: "B.E. Computer Science and Engineering (Cyber Security)",
    body: "Sri Krishna College of Engineering and Technology (SK C E T), Coimbatore. Current focus areas across offensive and defensive security engineering.",
    focus: [
      "Ethical Hacking",
      "Network Security",
      "Secure Software Development",
      "AI Security",
      "Zero Trust",
      "Cloud Security",
      "Digital Forensics",
      "Threat Detection",
    ],
  },
];

export const CERTIFICATIONS = [
  { title: "Java Internship", detail: "Backend development program with hands-on Spring Boot." },
  { title: "Cybersecurity Learning", detail: "Continuous coursework across security domains." },
  { title: "Hands-on Labs", detail: "Practical offensive and defensive lab exercises." },
  { title: "Future Certifications", detail: "Roadmap toward industry security certifications." },
];

export const ACHIEVEMENTS = [
  "Completed Diploma in Computer Science Engineering",
  "Currently pursuing Cyber Security Engineering",
  "Developed AssetArc",
  "Completed multiple cybersecurity labs",
  "Hands-on Java Backend Development",
  "Continuously learning cybersecurity technologies",
];

export const STATS = [
  { value: 2, suffix: "+", label: "Major Projects" },
  { value: 20, suffix: "+", label: "Technologies Learned" },
  { value: 100, suffix: "+", label: "Hours of Hands-on Learning" },
  { value: null, suffix: "Growing", label: "Cybersecurity Journey" },
];

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "credentials", label: "Credentials" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];
