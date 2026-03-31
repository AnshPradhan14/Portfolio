import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import * as THREE from "three";
import { CyberButton } from "../ui/CyberButton";
import { useTypewriter } from "@/hooks/useTypewriter";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import resumePdf from "@/assets/Ansh AIML Resume.pdf";

const TECHS = ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'OpenCV', 'CrewAI', 'REST API', 'GitHub', 'PowerBI', 'N8N', 'HuggingFace', 'LangChain', 'FastAPI', 'Docker'];

// Pre-compute static fibonacci sphere positions (unit sphere)
const SPHERE_POSITIONS = TECHS.map((_, i) => {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const theta = goldenAngle * i;
  const y = 1 - (i / (TECHS.length - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  return { x: r * Math.cos(theta), y, z: r * Math.sin(theta) };
});

function ThreeSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  // Three.js wireframe sphere
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 3);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xE866FF, wireframe: true, transparent: true, opacity: 0.5 });
    const wireframeSphere = new THREE.Mesh(geometry, wireframeMaterial);
    const innerGeometry = new THREE.IcosahedronGeometry(1.9, 3);
    const solidMaterial = new THREE.MeshBasicMaterial({ color: 0x8C34E8, transparent: true, opacity: 0.12 });
    const solidSphere = new THREE.Mesh(innerGeometry, solidMaterial);
    scene.add(wireframeSphere, solidSphere);
    camera.position.z = 4;

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };
    document.addEventListener('mousemove', onMouseMove);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      wireframeSphere.rotation.y += 0.004 + (mouseX * 0.5 - wireframeSphere.rotation.y) * 0.05;
      wireframeSphere.rotation.x += 0.002 + (mouseY * 0.5 - wireframeSphere.rotation.x) * 0.05;
      solidSphere.rotation.y -= 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!containerRef.current) return;
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose(); innerGeometry.dispose();
      wireframeMaterial.dispose(); solidMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // HTML tag cloud — runs once, shares a single global rotation so all tags move together
  useEffect(() => {
    const el = tagContainerRef.current;
    if (!el) return;

    const W = el.clientWidth || 500;
    const H = el.clientHeight || 500;
    const R = Math.min(W, H) * 0.38;

    // Create DOM nodes once
    const tagEls = TECHS.map((tech) => {
      const tag = document.createElement('div');
      tag.textContent = tech;
      tag.style.cssText = `
        position: absolute;
        white-space: nowrap;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 11px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        border: 1px solid rgba(232,102,255,0.55);
        background: rgba(5,2,12,0.75);
        backdrop-filter: blur(6px);
        color: #E866FF;
        box-shadow: 0 0 8px rgba(232,102,255,0.3);
        pointer-events: none;
        user-select: none;
        will-change: transform, opacity;
      `;
      el.appendChild(tag);
      return tag;
    });

    // Shared global rotation – all tags tumble together like one solid sphere
    let rotY = 0;
    let rotX = 0;
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };
    el.parentElement?.addEventListener('mousemove', onMouseMove);

    let rafId: number;
    const animate = () => {
      rotY += 0.004 + mouseX * 0.01;
      rotX += 0.0015 + mouseY * 0.005;

      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const cx = Math.cos(rotX), sx = Math.sin(rotX);

      // Sort by Z for correct painter's ordering
      const projected = SPHERE_POSITIONS.map(({ x, y, z }, i) => {
        // Rotate Y axis then X axis
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        return { i, sx: W / 2 + x1 * R, sy: H / 2 + y2 * R, z: z2 };
      });

      // Sorted back-to-front
      projected.sort((a, b) => a.z - b.z);
      projected.forEach(({ i, sx: px, sy: py, z }, order) => {
        const depth = (z + 1) / 2; // 0=back, 1=front
        const scale = 0.45 + depth * 0.65;
        const opacity = 0.15 + depth * 0.85;
        tagEls[i].style.left = `${px}px`;
        tagEls[i].style.top = `${py}px`;
        tagEls[i].style.transform = `translate(-50%,-50%) scale(${scale})`;
        tagEls[i].style.opacity = `${opacity}`;
        tagEls[i].style.zIndex = `${order}`;
      });

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      el.parentElement?.removeEventListener('mousemove', onMouseMove);
      tagEls.forEach(t => t.remove());
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto hidden lg:block">
      <div ref={containerRef} className="w-full h-full" />
      <div ref={tagContainerRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

export function Hero() {
  const roles = [
    "AI-Powered Apps",
    "Scalable AI Agents",
    "RAG-Based Assistants",
    "Intelligent Systems",
    "ML Models & Pipelines"
  ];
  const { displayedText } = useTypewriter(roles, 50, 2500, true);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Column */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Role Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full border border-cyber-pink bg-cyber-pink/10 font-orbitron text-[10px] uppercase text-cyber-light tracking-[0.2em]"
          >
            [ AI/ML ENGINEER ]
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <h1 className="font-orbitron font-extrabold text-[clamp(2.5rem,8vw,6rem)] leading-tight text-white m-0">
              HI, I'M<br />
              <span className="gradient-text drop-shadow-[0_0_20px_rgba(232,102,255,0.4)]">
                ANSH PRADHAN
              </span>
            </h1>
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={fadeInUp} className="text-2xl md:text-3xl font-rajdhani font-medium text-cyber-light">
            I build <span className="text-cyber-cyan font-bold drop-shadow-[0_0_10px_rgba(102,255,255,0.6)] border-r-2 border-cyber-cyan pr-1 animate-blink inline-block min-w-[200px]">{displayedText}</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeInUp} className="text-cyber-light/70 font-rajdhani text-lg md:text-xl max-w-[480px] leading-relaxed">
            Focused on building practical AI applications from AI Agents, RAG-based assistants and ML models to data-driven systems that turn complex data into useful insights.
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mt-4">
            <CyberButton asChild>
              <a href="#projects" className="px-8 py-3 text-sm">
                View My Work
              </a>
            </CyberButton>

            <CyberButton variant="ghost" className="px-6 py-3 gap-2 flex items-center" asChild>
              <a href={resumePdf} download="Ansh_AIML_Resume.pdf">
                <Download size={18} />
                Download CV
              </a>
            </CyberButton>

            <div className="flex gap-4 ml-2">
              <CyberButton variant="icon" asChild>
                <a href="https://github.com/AnshPradhan14" target="_blank" rel="noreferrer">
                  <span className="sr-only">GitHub</span>
                  <Github size={20} />
                </a>
              </CyberButton>
              <CyberButton variant="icon" asChild>
                <a href="https://linkedin.com/in/anshpradhan14" target="_blank" rel="noreferrer">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={20} />
                </a>
              </CyberButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - 3D Sphere */}
        <div className="lg:col-span-5 relative z-10 w-full flex justify-end">
          <ThreeSphere />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex flex-col items-center animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyber-pink">
            <path d="m6 9 6 6 6-6" />
            <path d="m6 15 6 6 6-6" />
          </svg>
        </div>
        <span className="font-orbitron font-medium text-[9px] tracking-[0.3em] text-cyber-light/30">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
