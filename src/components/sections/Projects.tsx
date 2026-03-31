import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { CyberCard } from "../ui/CyberCard";
import { GlassPill } from "../ui/GlassPill";
import { CyberButton } from "../ui/CyberButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "p1",
    title: "Startup Idea Evaluator",
    description: "An automated market research platform powered by CrewAI and Google Gemini that autonomously analyzes market trends, competitors, and business feasibility. By automating complex market research via SerpAPI, it generates comprehensive validation reports, directly empowering entrepreneurs to make rapid, data-driven decisions and saving weeks of manual analysis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tags: ["AI Agents", "CrewAI", "SerpAPI", "Streamlit", "Google Gemini API"],
    category: "AI",
    featured: true,
    stats: "◈ AI Agents · ⟳ Auto Reports",
    github: "https://github.com/AnshPradhan14/startup-idea-evaluator",
    demo: ""
  },
  {
    id: "p2",
    title: "Chatur AI",
    description: "An advanced RAG-powered AI assistant designed to eliminate hallucinations in document analysis through hierarchical retrieval and agentic workflows. By integrating high-speed Groq LLMs and MongoDB, it processes multi-format data to deliver instant, context-aware answers. This creates immense business value by drastically reducing manual research time and ensuring extreme accuracy.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    tags: ["LLAMA 3.1", "Agentic RAG", "MongoDB", "Tailwind CSS", "FastAPI", "HuggingFace"],
    category: "AI",
    featured: true,
    stats: "◈ RAG Pipeline · ⟳ Groq LLM",
    github: "https://github.com/AnshPradhan14/Chatur_AI",
    demo: ""
  },
  {
    id: "p3",
    title: "Age & Gender Detection",
    description: "A high-performance computer vision system that performs real-time demographic analysis using deep learning, leveraging OpenCV for facial recognition. Features optimized CNN architectures to accurately predict age ranges and gender from live camera feeds or static images with low-latency inference.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    tags: ["CNN", "VGG 16", "TensorFlow", "Computer Vision"],
    category: "AI",
    featured: false,
    stats: "◈ Deep Learning · ⟳ Real-time",
    github: "https://github.com/AnshPradhan14/Age-and-Gender-Prediction",
    demo: ""
  },
  {
    id: "p4",
    title: "Resume Parser Analyzer",
    description: "An intelligent recruiting automation tool utilizing NLP and OCR (Tesseract & PyMuPDF) to seamlessly extract and categorize key candidate intelligence from unstructured resumes. This significantly accelerates the talent acquisition pipeline by eliminating manual applicant screening, allowing HR to focus entirely on high-impact candidate engagement.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    tags: ["NLP", "Python", "Tesseract OCR", "PyMuPDF"],
    category: "AI",
    featured: true,
    stats: "◈ Document Parsing",
    github: "https://github.com/AnshPradhan14/Resume-Parser"
  },
  {
    id: "p5",
    title: "Restaurant Data Analysis & Prediction",
    description: "An end-to-end data science project that performs deep exploratory data analysis and predictive modeling on restaurant datasets. It leverages machine learning to identify key success factors, visualize dining trends, and predict restaurant ratings based on location, cuisine, and cost.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tags: ["Matplotlib", "Pandas", "Numpy", "Seaborn"],
    category: "Data Science",
    featured: false,
    github: "https://github.com/AnshPradhan14/Restaurant-Data-Analysis-and-Prediction"
  },
  {
    id: "p6",
    title: "International Space Station Tracker",
    description: "A comprehensive ISS tracking system with real-time spatiotemporal data pipeline and interactive web dashboard to analyze ISS trajectories and predict visibility windows using geospatial data processing.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
    tags: ["Requests", "Skyfield", "Cartopy", "Streamlit"],
    category: "Data Science",
    featured: false,
    github: "https://github.com/AnshPradhan14/ISA_internship/tree/main/Project%203"
  },
  {
    id: "p7",
    title: "Stock-Price Prediction",
    description: "A financial forecasting tool that utilizes Time Series Analysis and Deep Learning to predict future stock market trends by extracting historical data using the YFinance API. It implements LSTM or GRU architectures to capture temporal dependencies in historical price data, providing automated trend visualization for traders.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    tags: ["Sklearn", "YFinance", "MySQL", "Pandas"],
    category: "Data Science",
    featured: false,
    github: "https://github.com/AnshPradhan14/Stock-Price-prediction"
  },
  {
    id: "p8",
    title: "21 Days - 21 Projects Challenge",
    description: "A comprehensive project series documenting 21 days of continuous innovation, building diverse AI and data-driven applications. This repository showcases rapid prototyping skills, consistent development habits, and a wide-ranging technical versatility across various domains.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    tags: ["Project Series", "Rapid Prototyping", "Full Stack AI"],
    category: "AI",
    featured: false,
    github: "https://github.com/AnshPradhan14/21Days-21Projects"
  }
];

export function Projects() {
  const { ref, isInView } = useScrollReveal();
  const [activeTab, setActiveTab] = useState("Featured");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "AI", "Data Science"];
  
  const displayedProjects = activeTab === "Featured" 
    ? projects.filter(p => p.featured)
    : projects.filter(p => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="container mx-auto px-6">
        <SectionHeader badge="CASES" title="LATEST PROTOCOLS" />

        <div ref={ref}>
          {/* Main Tabs */}
          <motion.div 
            variants={fadeInUp} 
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="flex justify-center mb-12"
          >
            <div className="p-1 rounded-full bg-cyber-dark/80 border border-cyber-pink/20 flex gap-1">
              {["Featured", "All Projects"].map(tab => (
                <button
                  key={tab}
                  className={cn(
                    "px-6 py-2 rounded-full font-orbitron text-sm font-semibold transition-all duration-300",
                    activeTab === tab 
                      ? "bg-gradient-to-r from-cyber-pink to-cyber-purple text-white shadow-[0_0_15px_rgba(232,102,255,0.4)]" 
                      : "text-cyber-light/60 hover:text-white"
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sub Filters for All Projects */}
          <AnimatePresence>
            {activeTab === "All Projects" && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-wrap justify-center gap-2 mb-10 overflow-hidden"
              >
                {categories.map(cat => (
                  <div key={cat} onClick={() => setFilter(cat)}>
                    <GlassPill active={filter === cat} className="text-[10px] sm:text-xs">
                      {cat}
                    </GlassPill>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            key={`${activeTab}-${filter}`}
            className={cn(
              "grid gap-8",
              activeTab === "Featured" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CyberCard className="group h-full p-0 overflow-hidden">
                    <div className={cn(
                      "flex h-full w-full",
                      activeTab === "Featured" ? "flex-col md:flex-row relative" : "flex-col"
                    )}>
                    {/* Featured Decorative Line */}
                    {activeTab === "Featured" && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-pink to-cyber-cyan z-20" />
                    )}

                    {/* Image Area */}
                    <div 
                      className={cn(
                        "relative bg-cyber-dark overflow-hidden",
                        activeTab === "Featured" ? "w-full md:w-[40%] min-h-[250px] md:min-h-full" : "w-full h-[180px]"
                      )}
                    >
                      {/* CSS Gradient Mesh */}
                      <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden pointer-events-none">
                        <div className="absolute w-[300px] h-[300px] bg-cyber-pink/30 rounded-full blur-[80px] -top-20 -left-20 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-[200px] h-[200px] bg-cyber-cyan/30 rounded-full blur-[60px] bottom-10 right-10 animate-[spin_8s_linear_infinite_reverse]" />
                      </div>
                      
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent opacity-80" />
                      
                      {activeTab === "Featured" && (
                        <div className="absolute bottom-4 left-6 z-10 font-orbitron font-bold text-2xl text-white/90 drop-shadow-md">
                          {`0${i + 1}`}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div 
                      className={cn(
                        "flex flex-col flex-1 p-6 z-10 bg-black/20 backdrop-blur-sm",
                        activeTab === "Featured" ? "w-full md:w-[60%]" : "w-full"
                      )}
                    >
                      <h3 className="font-orbitron font-bold text-xl md:text-2xl gradient-text mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="font-rajdhani text-cyber-light/70 text-sm md:text-[15px] leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-orbitron text-cyber-light/80 uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.stats && (
                        <div className="font-orbitron text-[10px] text-cyber-cyan tracking-widest uppercase mb-6 bg-cyber-cyan/5 px-3 py-1.5 rounded inline-block w-fit border border-cyber-cyan/20">
                          {project.stats}
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                        {project.demo && (
                          <CyberButton asChild className="px-5 py-2 text-xs">
                            <a href={project.demo} target="_blank" rel="noreferrer">
                              View Live <ExternalLink size={14} className="ml-1" />
                            </a>
                          </CyberButton>
                        )}
                        {project.github && (
                          <CyberButton variant="ghost" asChild className="px-4 py-2 text-xs flex-1 md:flex-none">
                            <a href={project.github} target="_blank" rel="noreferrer">
                              GitHub <Github size={14} className="ml-1" />
                            </a>
                          </CyberButton>
                        )}
                      </div>
                    </div>
                  </div>
                </CyberCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {displayedProjects.length === 0 && (
            <div className="text-center py-20 font-orbitron text-cyber-light/40 animate-pulse">
              &gt; NO PROTOCOLS FOUND FOR THIS QUERY_
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
