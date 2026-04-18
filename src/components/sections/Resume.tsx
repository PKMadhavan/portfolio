"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isDesktop;
}

export function Resume() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <section
      id="resume"
      ref={ref}
      className="relative py-20"
      style={{ background: "linear-gradient(180deg, #15151e 0%, #1a1a28 50%, #15151e 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 stripe-bar opacity-40" />

      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-label">04. resume</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Resume</h2>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={SITE_CONFIG.resumeUrl}
              download
              className="btn-f1 inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-sm font-bold uppercase tracking-widest"
            >
              <Download size={15} />
              Download PDF
            </a>
            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-white/20 bg-transparent text-white font-mono text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-colors"
            >
              <ExternalLink size={15} />
              Open in New Tab
            </a>
          </div>

          {isDesktop ? (
            <div
              className="rounded-lg overflow-hidden shadow-2xl shadow-black/60"
              style={{ border: "1px solid rgba(225,6,0,0.2)" }}
            >
              {/* Red top stripe on iframe container */}
              <div className="stripe-bar" />
              <iframe
                src={`${SITE_CONFIG.resumeUrl}#toolbar=0&navpanes=0`}
                title="Resume PDF"
                className="w-full bg-[#1f1f2e]"
                style={{ height: "80vh", minHeight: 600 }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-16 rounded-lg border border-dashed border-white/20 bg-[#1f1f2e]/50 text-center">
              <p className="text-[#9ca3af] text-sm font-mono">PDF preview available on desktop.</p>
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                className="btn-f1 inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-sm font-bold uppercase tracking-widest"
              >
                <Download size={15} />
                Download Resume
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
