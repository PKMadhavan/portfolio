"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { SKILLS } from "@/lib/constants";

const CATEGORY_STYLE: Record<string, { icon: string; gradient: string; border: string; badge: string }> = {
  "AI / ML": {
    icon: "🤖",
    gradient: "from-[#e10600] to-[#ff4500]",
    border: "border-[#e10600]/30 hover:border-[#e10600]/60",
    badge: "bg-[#e10600]/10 text-[#ff6040] border-[#e10600]/30 hover:bg-[#e10600]/20 hover:text-[#ff8060]",
  },
  "Frontend": {
    icon: "🎨",
    gradient: "from-[#ff8000] to-[#ffcc00]",
    border: "border-[#ff8000]/30 hover:border-[#ff8000]/60",
    badge: "bg-[#ff8000]/10 text-[#ffaa40] border-[#ff8000]/30 hover:bg-[#ff8000]/20 hover:text-[#ffcc60]",
  },
  "Backend & Infra": {
    icon: "⚙️",
    gradient: "from-[#00d4aa] to-[#0099ff]",
    border: "border-[#00d4aa]/30 hover:border-[#00d4aa]/60",
    badge: "bg-[#00d4aa]/10 text-[#00d4aa] border-[#00d4aa]/30 hover:bg-[#00d4aa]/20 hover:text-[#40e8c4]",
  },
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 },
    },
  };

  const badgeVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20"
      style={{ background: "linear-gradient(180deg, #15151e 0%, #1a1a28 50%, #15151e 100%)" }}
    >
      {/* Decorative stripe */}
      <div className="absolute top-0 left-0 right-0 stripe-bar opacity-60" />

      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">02. skills</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Tech Stack</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.entries(SKILLS) as [string, readonly string[]][]).map(
            ([category, skills], catIdx) => {
              const style = CATEGORY_STYLE[category] ?? CATEGORY_STYLE["AI / ML"];
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : catIdx * 0.12 }}
                  className={`card-f1 rounded-lg overflow-hidden ${style.border}`}
                >
                  {/* Category header with gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${style.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl" role="img" aria-label={category}>
                        {style.icon}
                      </span>
                      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                        {category}
                      </h3>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="flex flex-wrap gap-2"
                    >
                      {skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={badgeVariants}
                          className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-mono font-medium border transition-colors cursor-default ${style.badge}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
