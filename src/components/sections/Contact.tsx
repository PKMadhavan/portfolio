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

const SOCIAL_STYLE: Record<string, { border: string; bg: string; iconBg: string; iconColor: string }> = {
  github: {
    border: "border-white/15 hover:border-white/40",
    bg: "hover:bg-white/5",
    iconBg: "bg-white/10",
    iconColor: "text-white",
  },
  linkedin: {
    border: "border-[#0ea5e9]/30 hover:border-[#0ea5e9]/60",
    bg: "hover:bg-[#0ea5e9]/5",
    iconBg: "bg-[#0ea5e9]/10",
    iconColor: "text-[#38bdf8]",
  },
  mail: {
    border: "border-[#e10600]/30 hover:border-[#e10600]/60",
    bg: "hover:bg-[#e10600]/5",
    iconBg: "bg-[#e10600]/10",
    iconColor: "text-[#e10600]",
  },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
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
    "w-full bg-[#1f1f2e] border border-white/15 rounded-sm px-4 py-3 text-sm font-mono text-white placeholder:text-[#9ca3af]/60 focus:outline-none focus:ring-1 focus:ring-[#e10600]/60 focus:border-[#e10600]/60 transition-colors";

  return (
    <section id="contact" ref={ref} className="relative py-20 overflow-hidden">
      {/* Orange glow bottom-right */}
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff8000, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">05. contact</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Social links */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#9ca3af] leading-relaxed text-lg">
              I&apos;m currently open to new opportunities. Whether you have a question,
              a project idea, or just want to say hi — my inbox is always open.
            </p>

            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon as IconKey] ?? Mail;
                const s = SOCIAL_STYLE[link.icon] ?? SOCIAL_STYLE.mail;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== "mail" ? "_blank" : undefined}
                    rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-4 p-4 rounded-sm border bg-[#1f1f2e] transition-colors group ${s.border} ${s.bg}`}
                  >
                    <span className={`p-2 rounded-sm ${s.iconBg} ${s.iconColor} text-lg leading-none`}>
                      <Icon style={{ width: 18, height: 18 }} />
                    </span>
                    <div>
                      <p className={`text-sm font-mono font-bold uppercase tracking-wide text-white group-hover:${s.iconColor} transition-colors`}>
                        {link.label}
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        {link.href.replace("mailto:", "").replace("https://", "")}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-widest text-[#9ca3af] mb-2">
                  Name
                </label>
                <input
                  id="contact-name" type="text" name="name" required
                  value={form.name} onChange={handleChange} placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-widest text-[#9ca3af] mb-2">
                  Email
                </label>
                <input
                  id="contact-email" type="email" name="email" required
                  value={form.email} onChange={handleChange} placeholder="your@email.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase tracking-widest text-[#9ca3af] mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="What's on your mind?"
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="btn-f1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-mono text-sm font-bold uppercase tracking-widest mt-2"
              >
                <Send size={15} />
                Send Message
              </button>
              <p className="text-xs text-[#9ca3af]/60 text-center font-mono">
                Opens your default email client
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
