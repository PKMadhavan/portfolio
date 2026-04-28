export const SITE_CONFIG = {
  name: "Madhavan PK",
  role: "AI Engineer & Full-Stack Developer",
  bio: "I build intelligent systems and beautiful interfaces. Passionate about machine learning, RAG pipelines, and shipping production-ready software. Currently open to full-time roles.",
  email: "madhavanpk9802@gmail.com",
  github: "PKMadhavan",
  linkedin: "madhavan-pk",
  resumeUrl: "/resume.pdf",
  university: "DePaul University",
  degree: "M.S. Aritificial Intelligence",
  graduationYear: "2026",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const SKILLS = {
  "AI / ML": [
    "Python",
    "LangChain",
    "LlamaIndex",
    "RAG",
    "OpenAI API",
    "Hugging Face",
    "PyTorch",
    "Vector DBs",
  ],
  "Frontend": [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
  ],
  "Backend & Infra": [
    "Node.js",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Vercel",
    "AWS",
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: `https://github.com/PKMadhavan`,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: `https://linkedin.com/in/madhavan-pk`,
    icon: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:pkmadhavan9802@gmail.com`,
    icon: "mail",
  },
] as const;

export const MARQUEE_SKILLS = [
  "Python", "TypeScript", "React", "Next.js", "LangChain", "LlamaIndex",
  "RAG", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "AWS", "Vercel",
  "OpenAI", "Hugging Face", "Framer Motion", "Three.js", "Redis",
] as const;
