"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { SKILLS } from "@/lib/constants";

const CATEGORY_CONFIG: Record<string, { accent: string; glow: string; barClass: string }> = {
  "AI / ML": {
    accent: "#e10600",
    glow: "rgba(225,6,0,0.15)",
    barClass: "from-[#e10600] to-[#ff4500]",
  },
  "Frontend": {
    accent: "#ff8000",
    glow: "rgba(255,128,0,0.15)",
    barClass: "from-[#ff8000] to-[#ffcc00]",
  },
  "Backend & Infra": {
    accent: "#00d4aa",
    glow: "rgba(0,212,170,0.15)",
    barClass: "from-[#00d4aa] to-[#0099ff]",
  },
};

const ICONS: Record<string, string> = {
  "AI / ML": "🤖",
  "Frontend": "🎨",
  "Backend & Infra": "⚙️",
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const badgeVariants: Variants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 6 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
  };

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(225,6,0,0.3), transparent)" }}
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">02. skills</div>
          <h2 className="font-heading text-5xl md:text-6xl text-foreground">Tech Stack</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.entries(SKILLS) as [string, readonly string[]][]).map(([cat, skills], ci) => {
            const cfg = CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG["AI / ML"];
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: shouldReduce ? 0 : ci * 0.12 }}
                className="glass rounded-2xl overflow-hidden"
                style={{
                  boxShadow: isInView ? `0 0 40px ${cfg.glow}` : "none",
                }}
              >
                {/* Top gradient bar */}
                <div className={`h-[3px] bg-gradient-to-r ${cfg.barClass}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl" role="img" aria-label={cat}>{ICONS[cat]}</span>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/80">{cat}</h3>
                  </div>
                  <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ staggerChildren: shouldReduce ? 0 : 0.05, delayChildren: ci * 0.12 }}
                    className="flex flex-wrap gap-2"
                  >
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={badgeVariants}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono border border-white/10 bg-white/5 text-foreground/65 hover:text-foreground hover:border-white/25 transition-colors cursor-default"
                        style={{ "--accent": cfg.accent } as React.CSSProperties}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
