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
  const shouldReduce = useReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <section id="resume" ref={ref} className="relative py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,128,0,0.3), transparent)" }}
      />
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff8000, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">04. resume</div>
          <h2 className="font-heading text-5xl md:text-6xl text-foreground">Resume</h2>
        </motion.div>

        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={SITE_CONFIG.resumeUrl}
              download
              data-magnetic
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-widest"
            >
              <Download size={15} />
              Download PDF
            </a>
            <a
              href={SITE_CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="glass inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
            >
              <ExternalLink size={15} />
              Open in New Tab
            </a>
          </div>

          {isDesktop ? (
            <div className="glass rounded-2xl overflow-hidden">
              <div
                className="h-[3px]"
                style={{ background: "linear-gradient(to right, #e10600, #ff8000, #ffcc00)" }}
              />
              <iframe
                src={`${SITE_CONFIG.resumeUrl}#toolbar=0&navpanes=0`}
                title="Resume PDF"
                className="w-full"
                style={{ height: "80vh", minHeight: 600 }}
              />
            </div>
          ) : (
            <div className="glass flex flex-col items-center justify-center gap-4 py-16 rounded-2xl text-center">
              <p className="text-foreground/45 text-sm font-mono">PDF preview available on desktop.</p>
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-widest"
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
