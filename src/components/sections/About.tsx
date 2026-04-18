"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const leftVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const rightVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 50 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.15 },
    },
  };

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden">
      {/* Subtle red glow top-left */}
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e10600, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">01. about</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              {/* Red glow behind photo */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-lg opacity-40 blur-2xl scale-95"
                style={{ background: "radial-gradient(circle at 50% 100%, #e10600, transparent 60%)" }}
              />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border border-white/10 bg-[#1f1f2e]">
                <Image
                  src="/profile.jpg"
                  alt={`${SITE_CONFIG.name} profile photo`}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  priority={false}
                />
              </div>
              {/* F1 red corner accent */}
              <div
                aria-hidden
                className="absolute -bottom-2 -right-2 w-16 h-16 rounded-sm opacity-80"
                style={{ background: "linear-gradient(135deg, transparent 50%, #e10600 50%)" }}
              />
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <p className="text-[#9ca3af] text-lg leading-relaxed">{SITE_CONFIG.bio}</p>
            <p className="text-[#9ca3af] leading-relaxed">
              I specialize in building production-grade AI systems — from RAG pipelines and
              vector search to full-stack web applications. I care about developer experience,
              clean architecture, and shipping things that actually work.
            </p>

            {/* Info badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[#e10600]/30 bg-[#e10600]/10 text-sm font-mono">
                <GraduationCap size={15} className="text-[#e10600]" />
                <span className="text-white">{SITE_CONFIG.degree}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/15 bg-white/5 text-sm font-mono">
                <MapPin size={15} className="text-[#ff8000]" />
                <span className="text-white">{SITE_CONFIG.university}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[#00d4aa]/30 bg-[#00d4aa]/10 text-sm font-mono">
                <span className="text-[#00d4aa] text-xs font-bold">CLASS OF</span>
                <span className="text-white">{SITE_CONFIG.graduationYear}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
