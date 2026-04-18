"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FileText, ArrowDown, Mail } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { SITE_CONFIG } from "@/lib/constants";

const NAME_WORDS = SITE_CONFIG.name.split(" ");

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.4,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, skewY: 4 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeUp: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Speed lines */}
      <div className="speed-lines" aria-hidden />

      {/* Gradient orbs — red/orange F1 palette */}
      <div
        aria-hidden
        className="gradient-orb w-[500px] h-[500px] top-0 -left-40 opacity-30"
        style={{ background: "radial-gradient(circle, #e10600 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="gradient-orb w-96 h-96 bottom-0 -right-20 opacity-25"
        style={{ background: "radial-gradient(circle, #ff8000 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="gradient-orb w-64 h-64 top-1/3 left-1/2 -translate-x-1/2 opacity-15"
        style={{ background: "radial-gradient(circle, #ffcc00 0%, transparent 70%)" }}
      />

      {/* Vertical racing stripes */}
      <div
        aria-hidden
        className="racing-stripe h-2/3 top-1/6 left-[12%] opacity-30"
      />
      <div
        aria-hidden
        className="racing-stripe h-1/2 top-1/4 right-[12%] opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, #ff8000 30%, #ffcc00 70%, transparent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Role badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-[#e10600]/40 bg-[#e10600]/10 text-[#e10600] text-xs font-mono font-bold uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
          {SITE_CONFIG.role}
        </motion.div>

        {/* Animated name */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-6 overflow-hidden"
        >
          {NAME_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: "inline-block" }}
              className="mr-5 last:mr-0"
            >
              {i === NAME_WORDS.length - 1 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                <span className="text-white">{word}</span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Red stripe bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.85, duration: 0.6, ease: "easeOut" }}
          className="stripe-bar max-w-xs mx-auto mb-8"
          style={{ transformOrigin: "left" }}
        />

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.9 }}
          className="text-[#9ca3af] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {SITE_CONFIG.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={SITE_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-f1 flex items-center gap-2 px-7 py-3.5 rounded-sm font-mono text-sm font-bold uppercase tracking-wide"
          >
            <FileText size={16} />
            View Resume
          </a>
          <a
            href={`https://github.com/${SITE_CONFIG.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm border border-white/20 bg-white/5 text-white font-mono text-sm font-bold uppercase tracking-wide hover:bg-white/10 hover:border-white/40 transition-colors"
          >
            <GitHubIcon style={{ width: 16, height: 16 }} />
            GitHub
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm border border-[#ff8000]/40 bg-[#ff8000]/10 text-[#ff8000] font-mono text-sm font-bold uppercase tracking-wide hover:bg-[#ff8000]/20 hover:border-[#ff8000]/60 transition-colors"
          >
            <Mail size={16} />
            Contact
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 1.3 }}
          className="flex items-center justify-center gap-8 mt-14 pt-8 border-t border-white/10"
        >
          {[
            { value: "AI", label: "Engineer" },
            { value: "MS", label: "Grad Student" },
            { value: "OSS", label: "Contributor" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-3xl gradient-text">{value}</p>
              <p className="text-xs font-mono text-[#9ca3af] uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.6 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9ca3af] hover:text-[#e10600] transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-mono uppercase tracking-widest">scroll</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
