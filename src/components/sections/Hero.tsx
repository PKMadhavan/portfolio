"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FileText, ArrowDown, Mail } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { SITE_CONFIG, MARQUEE_SKILLS } from "@/lib/constants";
import { useTypewriter } from "@/hooks/useTypewriter";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const ROLES = [
  "AI Engineer",
  "Full-Stack Developer",
  "ML Systems Builder",
  "RAG Architect",
  "Open Source Contributor",
];

function MarqueeRow() {
  const items = [...MARQUEE_SKILLS, ...MARQUEE_SKILLS];
  return (
    <div className="overflow-hidden border-y border-white/5 py-3 bg-black/10">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i} className="font-mono text-xs tracking-widest uppercase text-foreground/25 px-6 shrink-0">
            {s}<span className="ml-5 text-foreground/10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const shouldReduce = useReducedMotion();
  const role = useTypewriter(ROLES, 65, 1600);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 3D canvas background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Radial gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--background) 80%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-[1280px] mx-auto px-8 w-full pt-24 pb-8"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase text-foreground/50">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none tracking-tight mb-4"
        >
          {SITE_CONFIG.name.split(" ")[0]}{" "}
          <span className="gradient-text">{SITE_CONFIG.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-1 mb-6 h-8"
        >
          <span className="font-mono text-lg text-foreground/60">{role}</span>
          <span className="typewriter-cursor" aria-hidden />
        </motion.div>

        {/* Stripe bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
          className="stripe-bar w-32 mb-8"
          style={{ transformOrigin: "left" }}
        />

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-foreground/55 text-lg max-w-xl leading-relaxed mb-10"
        >
          {SITE_CONFIG.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href={SITE_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-wide"
          >
            <FileText size={15} />
            View Resume
          </a>
          <a
            href={`https://github.com/${SITE_CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="glass flex items-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-wide hover:text-white transition-colors"
          >
            <GitHubIcon style={{ width: 15, height: 15 }} />
            GitHub
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            data-magnetic
            className="glass flex items-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-wide text-[#ff8000] border-[#ff8000]/30 hover:border-[#ff8000]/60 transition-colors"
          >
            <Mail size={15} />
            Contact
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-white/5"
        >
          {[
            { v: "AI/ML", l: "Specialization" },
            { v: "M.S.", l: "Graduate" },
            { v: "2026", l: "Class Of" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <p className="font-heading text-3xl gradient-text">{v}</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/35 mt-1">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="relative z-10">
        <MarqueeRow />
      </div>

      {/* Scroll arrow */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="scroll-indicator absolute bottom-20 left-1/2 z-10 flex flex-col items-center gap-1 text-foreground/30 hover:text-[#e10600] transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
