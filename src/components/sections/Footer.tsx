import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-cyber-darker border-t border-cyber-pink/10 pt-16 pb-8 overflow-hidden z-10">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(232,102,255,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top: Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="font-orbitron font-bold text-3xl mb-2 flex items-center">
            <span className="text-white/40">&lt;</span>
            <span className="bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan bg-clip-text text-transparent px-2 drop-shadow-[0_0_15px_rgba(232,102,255,0.3)]">
              ANSH PRADHAN
            </span>
            <span className="text-white/40">/&gt;</span>
          </div>
          <div className="font-rajdhani text-cyber-light/40 text-sm tracking-[0.2em] uppercase">
            AI/ML Engineer | LLM, RAG & Intelligent Systems
          </div>
        </div>

        {/* Middle: Nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10">
          {["Home", "About", "Skills", "Projects", "Experience", "Certifications", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase() === "home" ? "hero" : item.toLowerCase()}`}
              className="font-rajdhani font-medium text-cyber-light/60 hover:text-cyber-pink transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex justify-center gap-4 mb-16">
          <a
            href="https://github.com/AnshPradhan14"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cyber-light/60 hover:border-cyber-pink/50 hover:bg-cyber-pink/10 hover:text-white hover:shadow-[0_0_15px_rgba(232,102,255,0.3)] transition-all duration-300 group"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/anshpradhan14/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cyber-light/60 hover:border-cyber-pink/50 hover:bg-cyber-pink/10 hover:text-white hover:shadow-[0_0_15px_rgba(232,102,255,0.3)] transition-all duration-300 group"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:anshpradhan911@gmail.com"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cyber-light/60 hover:border-cyber-pink/50 hover:bg-cyber-pink/10 hover:text-white hover:shadow-[0_0_15px_rgba(232,102,255,0.3)] transition-all duration-300 group"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-8 border-t border-white/5 font-rajdhani text-sm text-cyber-light/40 gap-4">
          <div className="hidden md:block" /> {/* Left Spacer for centering */}
          
          <div className="text-center">
            &copy; {new Date().getFullYear()} Ansh Pradhan. Built with curiosity, code, and a passion for AI.
          </div>

          <div className="flex justify-center md:justify-end">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-cyber-pink transition-colors group"
            >
              <span>BACK TO TOP</span>
              <span className="group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
