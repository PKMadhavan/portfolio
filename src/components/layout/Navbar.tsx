"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);
  const shouldReduce = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/20 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="stripe-bar w-full opacity-80" />
      <nav className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="font-heading text-xl text-foreground hover:text-[#e10600] transition-colors duration-300"
        >
          {SITE_CONFIG.name}
          <span className="text-[#e10600]">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors ${
                    active ? "text-foreground" : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-[#e10600] to-[#ff8000]"
                      transition={shouldReduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right: theme + hamburger */}
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-magnetic
              className="relative p-2 rounded-lg text-foreground/50 hover:text-foreground transition-colors overflow-hidden group"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors rounded-lg" />
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </button>
          )}
          <button
            className="md:hidden p-2 rounded-lg text-foreground/50 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-b border-white/5"
          >
            <ul className="flex flex-col px-6 py-3 gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition-colors ${
                        active
                          ? "text-[#e10600] bg-[#e10600]/10"
                          : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
