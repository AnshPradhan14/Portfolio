import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { CyberCard } from "../ui/CyberCard";
import { GlassPill } from "../ui/GlassPill";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import anshProfile from "@/assets/ansh-profile.jpg";

export function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 z-10">
      <div className="container mx-auto px-6">
        <SectionHeader badge="ABOUT ME" title="WHO AM I?" />

        <div
          ref={ref}
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left: Avatar Card */}
          <motion.div
            className="lg:col-span-5"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <CyberCard className="flex flex-col items-center justify-center p-8 text-center border-cyber-pink/30 shadow-[0_0_30px_rgba(232,102,255,0.1)]">
              {/* Profile Image with Conic Gradient Border */}
              <div className="relative w-48 h-48 mb-6 group mx-auto flex items-center justify-center rounded-full bg-cyber-darker">
                {/* Outer Rotating Border (-inset-1 extends outside the 48x48 container) */}
                <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--cyber-pink),var(--cyber-cyan),var(--cyber-purple),var(--cyber-pink))] animate-[spin_4s_linear_infinite] z-0" />
                
                {/* Inner Dark Background */}
                <div className="absolute inset-0.5 rounded-full bg-cyber-darker z-10" />
                
                {/* Image */}
                <img 
                  src={anshProfile} 
                  alt="Ansh Pradhan" 
                  className="relative z-20 w-[176px] h-[176px] rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="font-orbitron font-bold text-2xl text-white mb-2 tracking-wider">
                ANSH PRADHAN
              </h3>

              <div className="flex gap-2 justify-center flex-wrap mb-6">
                <GlassPill>AI / ML Engineer</GlassPill>
                <GlassPill>DATA SCIENCE</GlassPill>
              </div>

              <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-rajdhani font-semibold text-green-400 text-sm tracking-widest uppercase">
                  AVAILABLE FOR WORK
                </span>
              </div>
            </CyberCard>
          </motion.div>

          {/* Right: Bio Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <motion.div variants={fadeInUp} className="text-cyber-light/75 font-rajdhani text-lg leading-[1.8]">
              <p className="mb-4">
                Final-year Computer Engineering (AI Major) student passionate about building intelligent systems with machine learning, data science, and modern AI. I enjoy turning complex data and ideas into practical applications from predictive models and analytics to LLM and RAG-powered tools.
              </p>
              <p>
                Focused on building practical AI applications — from AI Agents, RAG-based assistants and ML models to data-driven systems that turn complex data into useful insights. Always exploring the cutting edge of LLMs, deep learning, and intelligent automation.
              </p>
            </motion.div>

            {/* Stat Cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { number: "4+", label: "Internships" },
                { number: "9+", label: "Projects Built" },
                { number: "9+", label: "Certifications" }
              ].map((stat, i) => (
                <CyberCard key={i} className="p-4 text-center hover:-translate-y-1 transition-transform border border-white/5">
                  <div className="font-orbitron font-bold text-3xl gradient-text mb-1">
                    {stat.number}
                  </div>
                  <div className="font-rajdhani text-cyber-light/60 text-sm tracking-wider uppercase">
                    {stat.label}
                  </div>
                </CyberCard>
              ))}
            </motion.div>

            {/* Focus Areas */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-orbitron text-sm text-cyber-pink tracking-widest mb-4">FOCUS AREAS</h4>
              <div className="flex flex-wrap gap-3">
                {["Machine Learning & Deep Learning", "Large Language Models & RAG", "AI Automation", "Data Science & Analytics", "AI-powered Web Applications"].map((interest) => (
                  <GlassPill key={interest} className="border-cyber-pink/30 hover:border-cyber-pink text-cyber-light">
                    {interest}
                  </GlassPill>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
