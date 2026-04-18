import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <footer className="relative border-t border-white/10 py-6 px-6 overflow-hidden">
        {/* Bottom red stripe */}
        <div className="stripe-bar absolute bottom-0 left-0 right-0" />
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#9ca3af]">
          <span>
            Built with{" "}
            <span className="text-[#e10600] font-bold">Next.js</span>
            {" · "}
            <span className="text-[#ff8000] font-bold">Tailwind CSS</span>
            {" · "}
            <span className="text-[#00d4aa] font-bold">Framer Motion</span>
          </span>
          <span>© {new Date().getFullYear()} <span className="text-white">Madhavan PK</span></span>
        </div>
      </footer>
    </>
  );
}
