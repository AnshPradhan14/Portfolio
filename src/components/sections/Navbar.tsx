import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Add offset to trigger slightly before it reaches top
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      
      // Default to '' (or hero) if at top
      if (window.scrollY < 100) {
        current = "hero";
      }

      setActiveSection(current);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "backdrop-blur-xl bg-cyber-darker/70 border-b",
        scrolled
          ? "border-cyber-pink/25 shadow-[0_4px_30px_rgba(232,102,255,0.08)] py-4"
          : "border-cyber-pink/10 py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-orbitron font-bold text-xl flex items-center group">
          <span className="text-white">&lt;</span>
          <span className="bg-gradient-to-r from-cyber-pink to-cyber-purple bg-clip-text text-transparent px-1 group-hover:drop-shadow-[0_0_10px_rgba(232,102,255,0.6)] transition-all">
            ANSH.AI
          </span>
          <span className="text-white">/&gt;</span>
          <span className="ml-2 animate-blink text-cyber-pink">|</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "relative font-rajdhani font-medium transition-colors duration-300 group hover:drop-shadow-[0_0_10px_rgba(232,102,255,0.6)]",
                  isActive ? "text-cyber-pink drop-shadow-[0_0_10px_rgba(232,102,255,0.6)]" : "text-cyber-light/60 hover:text-cyber-pink"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[2px] bg-cyber-pink transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0 origin-left group-hover:scale-x-100"
                )} />
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full font-orbitron text-sm font-semibold bg-gradient-to-r from-cyber-pink to-cyber-purple hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(232,102,255,0.3)] hover:shadow-[0_0_25px_rgba(232,102,255,0.6)] border border-transparent hover:border-white/20"
          >
            Hire Me →
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-cyber-light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-cyber-darker border-b border-cyber-pink/20"
          >
            <nav className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-rajdhani text-lg transition-colors",
                      isActive ? "text-cyber-pink font-semibold" : "text-cyber-light/80 hover:text-cyber-pink"
                    )}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-2 rounded-full font-orbitron text-sm bg-gradient-to-r from-cyber-pink to-cyber-purple shadow-[0_0_15px_rgba(232,102,255,0.3)]"
              >
                Hire Me →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
