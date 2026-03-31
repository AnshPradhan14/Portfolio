import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Database, BrainCircuit, Code, Cpu } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { CyberCard } from "../ui/CyberCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function SkillsRadar() {
  const axes = [
    { label: "ML/DL", value: 90 },
    { label: "LLM/RAG", value: 85 },
    { label: "Data Sci", value: 88 },
    { label: "CV/NLP", value: 80 },
    { label: "Dev Tools", value: 75 },
    { label: "Languages", value: 85 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = center - 40;

  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
    };
  };

  const points = axes.map((axis, i) => getPoint(axis.value, i, axes.length));
  const pointsString = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full max-w-[300px] aspect-square mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
        {/* Web/Grid */}
        {[20, 40, 60, 80, 100].map(level => {
          const levelPoints = axes.map((_, i) => getPoint(level, i, axes.length));
          const str = levelPoints.map(p => `${p.x},${p.y}`).join(" ") + ` ${levelPoints[0].x},${levelPoints[0].y}`;
          return (
            <polygon 
              key={level} 
              points={str} 
              fill="none" 
              stroke="rgba(232,102,255,0.15)" 
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Axes Lines */}
        {axes.map((_, i) => {
          const end = getPoint(100, i, axes.length);
          return (
            <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="rgba(232,102,255,0.3)" strokeWidth="1" />
          );
        })}

        {/* Data Polygon */}
        <motion.polygon
          points={pointsString}
          fill="rgba(232,102,255,0.08)"
          stroke="#E866FF"
          strokeWidth="2"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          whileInView={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(232,102,255,0.4))' }}
        />

        {/* Labels */}
        {axes.map((axis, i) => {
          const pt = getPoint(115, i, axes.length);
          return (
            <text 
              key={axis.label}
              x={pt.x} 
              y={pt.y} 
              fill="rgba(242,242,245,0.8)" 
              fontSize="10" 
              fontFamily="Orbitron"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function OrbitSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anglesRef = useRef<number[][]>([
    // [orbitIdx, bodyIdx, initial angle offset in radians]
    [0, 0, 0],          [0, 1, Math.PI * 0.6],     [0, 2, Math.PI * 1.3],
    [1, 0, 0.3],        [1, 1, Math.PI * 0.7],     [1, 2, Math.PI * 1.2],  [1, 3, Math.PI * 1.8],
    [2, 0, 0.5],        [2, 1, Math.PI * 0.8],     [2, 2, Math.PI * 1.3],  [2, 3, Math.PI * 1.75],
  ]);

  // Kepler's 3rd law: angular speed ∝ r^(-3/2)
  // Normalize so innermost = 1.0 rad/s and outer is proportionally slower
  const SIZE = 400;
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  const orbits: { radius: number; color: string; bodies: { label: string; logo: string }[] }[] = [
    {
      radius: 75,
      color: "rgba(232,102,255,0.40)",
      bodies: [
        { label: "Python",     logo: "https://cdn.simpleicons.org/python" },
        { label: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow" },
        { label: "Pandas",     logo: "https://cdn.simpleicons.org/pandas" },
      ]
    },
    {
      radius: 135,
      color: "rgba(102,255,255,0.28)",
      bodies: [
        { label: "PyTorch",     logo: "https://cdn.simpleicons.org/pytorch" },
        { label: "Scikit-learn",logo: "https://cdn.simpleicons.org/scikitlearn" },
        { label: "HuggingFace", logo: "https://cdn.simpleicons.org/huggingface" },
        { label: "FastAPI",     logo: "https://cdn.simpleicons.org/fastapi" },
      ]
    },
    {
      radius: 190,
      color: "rgba(140,52,232,0.22)",
      bodies: [
        { label: "Docker",   logo: "https://cdn.simpleicons.org/docker" },
        { label: "Git",      logo: "https://cdn.simpleicons.org/git" },
        { label: "AWS",      logo: "" },
        { label: "RAG",      logo: "" },
        { label: "Power BI", logo: "https://cdn.simpleicons.org/powerbi" },
      ]
    },
  ];

  // Base angular speed for innermost orbit (rad/s)
  const BASE_SPEED = 0.6;
  // Speed for each orbit: inner = BASE, outer slower by Kepler factor
  const speeds = orbits.map(o => BASE_SPEED * Math.pow(orbits[0].radius / o.radius, 1.5));

  // Store per-body current angles
  const bodyAnglesRef = useRef<number[][]>(
    orbits.map((o, oi) =>
      o.bodies.map((_, bi) => (Math.PI * 2 * bi) / o.bodies.length + (oi * 0.7))
    )
  );

  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create body elements once
    const bodyEls: HTMLDivElement[][] = orbits.map((orbit) =>
      orbit.bodies.map(({ label, logo }) => {
        const el = document.createElement("div");
        el.title = label;
        el.style.cssText = `
          position: absolute;
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid ${orbit.color};
          background: rgba(8,5,16,0.95);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 10px ${orbit.color}, inset 0 0 6px ${orbit.color};
          pointer-events: none;
          transform-origin: center center;
          will-change: transform;
          overflow: hidden;
        `;
        if (logo) {
          const img = document.createElement("img");
          img.src = logo;
          img.alt = label;
          img.style.cssText = "width: 22px; height: 22px; object-fit: contain;";
          el.appendChild(img);
        } else {
          el.style.fontFamily = "Rajdhani, sans-serif";
          el.style.fontWeight = "700";
          el.style.fontSize = "9px";
          el.style.color = "#ffffff";
          el.style.textAlign = "center";
          el.textContent = label;
        }
        container.appendChild(el);
        return el;
      })
    );

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05); // cap dt
      lastTimeRef.current = timestamp;

      orbits.forEach((orbit, oi) => {
        orbit.bodies.forEach((_, bi) => {
          bodyAnglesRef.current[oi][bi] += speeds[oi] * dt;
          const angle = bodyAnglesRef.current[oi][bi];
          const x = CX + orbit.radius * Math.cos(angle) - 20;
          const y = CY + orbit.radius * Math.sin(angle) - 20;
          bodyEls[oi][bi].style.left = `${x}px`;
          bodyEls[oi][bi].style.top = `${y}px`;
          // counter-rotate so logo stays upright
          bodyEls[oi][bi].style.transform = `rotate(${-bodyAnglesRef.current[oi][bi]}rad)`;
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      bodyEls.flat().forEach(el => el.remove());
      lastTimeRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative mx-auto hidden md:block"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* SVG orbit rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible" }}
      >
        {orbits.map((orbit, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={orbit.radius}
            fill="none"
            stroke={orbit.color}
            strokeWidth="1"
            strokeDasharray="4 5"
          />
        ))}
        {/* Soft glow on center */}
        <circle cx={CX} cy={CY} r="28" fill="rgba(232,102,255,0.06)" />
        <circle cx={CX} cy={CY} r="20" fill="rgba(232,102,255,0.10)" />
      </svg>

      {/* Body container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Center AP core */}
      <div
        className="absolute z-20 font-orbitron font-black text-2xl gradient-text bg-cyber-darker rounded-full border border-cyber-pink flex items-center justify-center"
        style={{
          width: 56, height: 56,
          left: CX - 28, top: CY - 28,
          boxShadow: "0 0 24px rgba(232,102,255,0.5), 0 0 60px rgba(232,102,255,0.15)"
        }}
      >
        AP
      </div>
    </div>
  );
}

export function Skills() {
  const { ref, isInView } = useScrollReveal();

  const skillCategories = [
    {
      title: "ML/AI",
      icon: <BrainCircuit className="text-cyber-pink" />,
      skills: [
        { name: "Machine Learning",  logo: "" },
        { name: "Deep Learning",      logo: "" },
        { name: "NLP",               logo: "https://cdn.simpleicons.org/spacy" },
        { name: "Computer Vision",   logo: "https://cdn.simpleicons.org/opencv" },
        { name: "LLM",              logo: "https://cdn.simpleicons.org/openai" },
        { name: "RAG",              logo: "" },
        { name: "AI Agents",        logo: "" },
        { name: "Prompt Engineering",logo: "" },
        { name: "Model Optimization",logo: "" },
      ]
    },
    {
      title: "Frameworks",
      icon: <Cpu className="text-cyber-purple" />,
      skills: [
        { name: "TensorFlow",   logo: "https://cdn.simpleicons.org/tensorflow" },
        { name: "PyTorch",      logo: "https://cdn.simpleicons.org/pytorch" },
        { name: "Scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn" },
        { name: "LangChain",    logo: "https://cdn.simpleicons.org/langchain" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface" },
        { name: "FastAPI",      logo: "https://cdn.simpleicons.org/fastapi" },
        { name: "Streamlit",    logo: "https://cdn.simpleicons.org/streamlit" },
        { name: "FAISS",        logo: "" },
        { name: "OpenCV",       logo: "https://cdn.simpleicons.org/opencv" },
        { name: "PyMuPDF",      logo: "" },
      ]
    },
    {
      title: "Languages",
      icon: <Code className="text-cyber-cyan" />,
      skills: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python" },
        { name: "SQL",    logo: "https://cdn.simpleicons.org/mysql" },
        { name: "C",      logo: "https://cdn.simpleicons.org/c" },
        { name: "C++",    logo: "https://cdn.simpleicons.org/cplusplus" },
      ]
    },
    {
      title: "Tools & Environment",
      icon: <Database className="text-blue-400" />,
      skills: [
        { name: "MongoDB Atlas", logo: "https://cdn.simpleicons.org/mongodb" },
        { name: "Docker",        logo: "https://cdn.simpleicons.org/docker" },
        { name: "GitHub",        logo: "https://cdn.simpleicons.org/github" },
        { name: "Power BI",      logo: "https://cdn.simpleicons.org/powerbi" },
        { name: "n8n",           logo: "https://cdn.simpleicons.org/n8n" },
        { name: "Tesseract OCR", logo: "" },
        { name: "System Design", logo: "" },
        { name: "AWS/GCP",       logo: "https://cdn.simpleicons.org/amazonwebservices" },
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-24 z-10">
      <div className="container mx-auto px-6">
        <SectionHeader badge="EXPERTISE" title="SKILLS MATRIX" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Interactive Visualizations */}
          <motion.div 
            className="flex flex-col gap-4 justify-center"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <motion.div variants={fadeInUp}>
              <SkillsRadar />
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:block">
              <OrbitSystem />
            </motion.div>
          </motion.div>

          {/* Right: Single Column */}
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {skillCategories.map((cat, i) => (
              <motion.div key={cat.title} variants={fadeInUp}>
                <CyberCard className="h-full group hover:border-cyber-pink/40 border-white/5 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyber-pink/40 group-hover:shadow-[0_0_10px_rgba(232,102,255,0.2)] transition-all">
                      {cat.icon}
                    </div>
                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyber-pink transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span key={skill.name} className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-xs font-rajdhani text-cyber-light/80 hover:border-cyber-pink/30 hover:bg-cyber-pink/5 transition-colors">
                        {skill.logo && (
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-3.5 h-3.5 object-contain flex-shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </CyberCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
