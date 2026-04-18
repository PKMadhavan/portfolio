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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#15151e]/90 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      {/* F1 red top stripe */}
      <div className="stripe-bar w-full" style={{ height: 2 }} />

      <nav className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          className="flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-sm bg-[#e10600]" aria-hidden />
          <span className="font-heading text-lg text-white hover:text-[#e10600] transition-colors">
            {SITE_CONFIG.name.split(" ")[0]}
            <span className="text-[#e10600]">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors ${
                    isActive ? "text-white" : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: "linear-gradient(to right, #e10600, #ff8000)",
                      }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-sm text-[#9ca3af] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            className="md:hidden p-2 rounded-sm text-[#9ca3af] hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#1f1f2e]/95 backdrop-blur-md border-b border-white/10"
          >
            <ul className="flex flex-col px-6 py-3 gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-colors ${
                        isActive
                          ? "text-[#e10600] bg-[#e10600]/10 border-l-2 border-[#e10600]"
                          : "text-[#9ca3af] hover:text-white hover:bg-white/5"
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
