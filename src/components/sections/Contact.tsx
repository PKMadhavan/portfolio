"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
} as const;

type IconKey = keyof typeof ICON_MAP;

const SOCIAL_STYLE: Record<string, { iconColor: string; glowColor: string }> = {
  github: { iconColor: "text-foreground", glowColor: "rgba(255,255,255,0.05)" },
  linkedin: { iconColor: "text-[#38bdf8]", glowColor: "rgba(14,165,233,0.08)" },
  mail: { iconColor: "text-[#e10600]", glowColor: "rgba(225,6,0,0.08)" },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "w-full glass rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#e10600]/50 focus:border-[#e10600]/40 transition-colors";

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(225,6,0,0.3), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff8000, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">05. contact</div>
          <h2 className="font-heading text-5xl md:text-6xl text-foreground">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Social links */}
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-foreground/55 leading-relaxed text-lg">
              I&apos;m currently open to new opportunities. Whether you have a question,
              a project idea, or just want to say hi — my inbox is always open.
            </p>

            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link, i) => {
                const Icon = ICON_MAP[link.icon as IconKey] ?? Mail;
                const s = SOCIAL_STYLE[link.icon] ?? SOCIAL_STYLE.mail;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== "mail" ? "_blank" : undefined}
                    rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="glass flex items-center gap-4 p-4 rounded-xl group hover:scale-[1.02] transition-transform"
                  >
                    <span className={`p-2 rounded-lg bg-white/5 ${s.iconColor}`}>
                      <Icon style={{ width: 18, height: 18 }} />
                    </span>
                    <div>
                      <p className={`text-sm font-mono font-bold uppercase tracking-wide text-foreground/80 group-hover:${s.iconColor} transition-colors`}>
                        {link.label}
                      </p>
                      <p className="text-xs text-foreground/35 font-mono">
                        {link.href.replace("mailto:", "").replace("https://", "")}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-widest text-foreground/40 mb-2">
                  Name
                </label>
                <input
                  id="contact-name" type="text" name="name" required
                  value={form.name} onChange={handleChange} placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-widest text-foreground/40 mb-2">
                  Email
                </label>
                <input
                  id="contact-email" type="email" name="email" required
                  value={form.email} onChange={handleChange} placeholder="your@email.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-widest text-foreground/40 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="What&apos;s on your mind?"
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <button
                type="submit"
                data-magnetic
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-widest mt-2"
              >
                <Send size={15} />
                Send Message
              </button>
              <p className="text-xs text-foreground/30 text-center font-mono">
                Opens your default email client
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1280px] mx-auto px-8 mt-24 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-foreground/30">
          <span>
            Built with{" "}
            <span className="text-[#e10600] font-bold">Next.js</span>
            {" · "}
            <span className="text-[#ff8000] font-bold">Three.js</span>
            {" · "}
            <span className="text-[#00d4aa] font-bold">Framer Motion</span>
          </span>
          <span>© {new Date().getFullYear()} <span className="text-foreground/60">Madhavan Panneerselvam Kumar</span></span>
        </div>
      </div>
    </section>
  );
}
