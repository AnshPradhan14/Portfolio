import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const experiences = [
  {
    role: "AI/ML Research Intern",
    company: "Institute for Plasma Research (IPR) – Dept. of Atomic Energy, Govt. of India",
    date: "February 2026 – Present",
    points: [
      "Researching Retrieval-Augmented Generation (RAG) architectures and LLM-based systems for building domain-specific knowledge retrieval solutions.",
      "Analyzing modern RAG pipelines, hybrid retrieval techniques, and LLM orchestration frameworks through research and survey papers.",
      "Experimenting with document chunking strategies, semantic embeddings, and vector search methods to improve retrieval accuracy.",
      "Designing a scalable RAG-powered knowledge base for intelligent querying."
    ],
    tech: ["RAG", "LLMs", "Vector Databases", "Python"]
  },
  {
    role: "AI/ML Intern",
    company: "Edunet Foundation",
    date: "June 2025 – August 2025",
    points: [
      "Built an interactive employee income prediction app using ML algorithms and the UCI Adult dataset for real-time insights.",
      "Created a Streamlit interface allowing feature selection and multi-model comparison for personalized forecasting.",
      "Delivered end-to-end pipeline from preprocessing and evaluation to cloud deployment, achieving 86%+ accuracy."
    ],
    tech: ["Machine Learning", "Streamlit", "Python", "Scikit-learn"]
  },
  {
    role: "AI/ML & Data Science Intern",
    company: "India Space Academy",
    date: "June 2025 – July 2025",
    points: [
      "Applied statistical outlier detection and velocity dispersion analysis on large astrophysical datasets to estimate galaxy cluster mass using physics-informed regression techniques.",
      "Performed nonlinear curve fitting and numerical integration on observational supernova data to accurately model universe expansion parameters.",
      "Developed a real-time spatiotemporal data pipeline and interactive web dashboard to analyze ISS trajectories and predict visibility windows using geospatial data processing."
    ],
    tech: ["Data Science", "Python", "Streamlit", "Cartopy"]
  },
  {
    role: "Vice President – Computer Society & Gaming Club",
    company: "Institute of Advanced Research",
    date: "March 2024 – August 2025",
    points: [
      "Led strategic event planning to boost participation by 65% through organizing major hackathons, coding challenges, and AI workshops.",
      "Built industry partnerships and secured funding for three large-scale university tech events, enhancing campus engagement.",
      "Mentored 20+ students and coordinated with stakeholders to foster an innovative, collaborative tech community."
    ],
    tech: ["Leadership", "Event Management", "Mentoring"]
  },
  {
    role: "Python Developer Intern",
    company: "Oasis Infobyte",
    date: "March 2024 – April 2024",
    points: [
      "Developed a PyQt-based weather forecasting tool leveraging time-series analysis to deliver accurate, data-driven predictions for users.",
      "Built a machine learning system for BMI prediction, showcasing how health analytics can provide personalized, actionable insights.",
      "Enhanced ability to transform complex datasets into clear, interactive reports, strengthening data communication and user engagement skills."
    ],
    tech: ["Python", "PyQt", "Machine Learning", "Data Visualization"]
  }
];

export function Experience() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="experience" className="relative py-24 z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader badge="TIMELINE" title="SYSTEM LOGS" />

        <div ref={ref} className="relative max-w-4xl mx-auto mt-16">
          {/* Vertical Center Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-pink via-cyber-purple to-cyber-cyan md:-translate-x-1/2 opacity-30 shadow-[0_0_15px_rgba(232,102,255,0.5)]" />

          <motion.div 
            className="flex flex-col gap-12"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-cyber-darker border-2 border-cyber-pink shadow-[0_0_15px_rgba(232,102,255,1)] md:-translate-x-1/2 z-10 -translate-x-1/2 mt-6 md:mt-0">
                    <div className="absolute inset-0 rounded-full border border-cyber-pink animate-ping opacity-60" />
                  </div>

                  <div className="w-full md:w-1/2" />

                  {/* Connecting Line (Desktop) */}
                  <div className={`hidden md:block absolute top-[28px] ${isLeft ? 'right-1/2 w-[calc(50%-1.5rem)]' : 'left-1/2 w-[calc(50%-1.5rem)]'} border-b border-dashed border-cyber-pink/30 -translate-y-1/2`} />

                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 mt-2 md:mt-0 ${isLeft ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <div className="cyber-card p-6 bg-black/40 border border-white/5 hover:border-cyber-pink/40 group">
                      <div className="font-orbitron font-bold text-xl text-cyber-pink drop-shadow-[0_0_8px_rgba(232,102,255,0.4)] mb-1">
                        {exp.role}
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
                        <div className="font-orbitron text-cyber-cyan text-sm tracking-wider uppercase">
                          {exp.company}
                        </div>
                        <div className="font-rajdhani text-cyber-light/40 text-xs tracking-wider">
                          [ {exp.date} ]
                        </div>
                      </div>
                      
                      <div className="h-[1px] w-full bg-gradient-to-r from-cyber-pink/20 to-transparent mb-4" />
                      
                      <ul className="space-y-3 mb-6">
                        {exp.points.map((pt, idx) => (
                          <li key={idx} className="font-rajdhani text-cyber-light/70 text-sm leading-relaxed flex items-start gap-2 text-left">
                            <span className="text-cyber-pink font-bold mt-[2px]">&gt;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                        {exp.tech.map(t => (
                          <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded font-orbitron text-[9px] uppercase tracking-widest text-cyber-light/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
