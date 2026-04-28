"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [-30, 30]);

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #e10600, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">01. about</div>
          <h2 className="font-heading text-5xl md:text-6xl text-foreground">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center md:justify-start"
          >
            <motion.div style={{ y: imgY }} className="relative">
              {/* Glow ring */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl scale-105 opacity-30 blur-2xl"
                style={{ background: "radial-gradient(circle, #e10600 0%, transparent 70%)" }}
              />
              <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden glass">
                <Image
                  src="/profile.jpg"
                  alt={SITE_CONFIG.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(10,10,15,0.5) 0%, transparent 50%)" }}
                  aria-hidden
                />
              </div>
              {/* Decorative corner accent */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-20 h-20 rounded-br-2xl opacity-70"
                style={{ background: "linear-gradient(135deg, transparent 50%, rgba(225,6,0,0.6) 50%)" }}
              />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <p className="text-foreground/65 text-lg leading-relaxed">{SITE_CONFIG.bio}</p>
            <p className="text-foreground/50 leading-relaxed">
              I specialize in building production-grade AI systems — from RAG pipelines and
              vector search to full-stack web applications. I care deeply about developer
              experience, clean architecture, and shipping products that actually work.
            </p>

            {/* Glass info badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: GraduationCap, label: SITE_CONFIG.degree, color: "text-[#e10600]" },
                { icon: MapPin, label: SITE_CONFIG.university, color: "text-[#ff8000]" },
                { icon: Calendar, label: `Class of ${SITE_CONFIG.graduationYear}`, color: "text-[#00d4aa]" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="glass flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono">
                  <Icon size={14} className={color} />
                  <span className="text-foreground/80">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
