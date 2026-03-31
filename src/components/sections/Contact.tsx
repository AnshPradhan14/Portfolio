import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Check, ExternalLink } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { CyberCard } from "../ui/CyberCard";
import { CyberButton } from "../ui/CyberButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const certifications = [
  { name: "SAP Advanced Course", link: "https://www.linkedin.com/posts/anshpradhan14_sap-advance-course-certificate-activity-7322645324949286912-3f6R?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEwVV58BEuOIWLRklLAUNRR4VGjC64-1BHA" },
  { name: "5-Day AI Agents Intensive Course", link: "https://www.kaggle.com/certification/badges/anshpradhan02/105" },
  { name: "Edunet - Artificial Intelligence", link: "https://skills.yourlearning.ibm.com/certificate/share/fc8f526d84ewogICJvYmplY3RJZCIgOiAiUExBTi04QTQ4NjQ1MTk2RkEiLAogICJsZWFybmVyQ05VTSIgOiAiNTAwMjI4NVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp939a94e05c2-10" },
  { name: "Machine Learning with Python", link: "https://coursera.org/verify/H9YYEE2TZ6CS" },
  { name: "Keras & TensorFlow", link: "https://coursera.org/verify/00HJO3U5G4J7" },
  { name: "Deep Learning & Neural Networks", link: "https://www.coursera.org/account/accomplishments/verify/TU031Q7S8QBL" },
  { name: "PyTorch with Neural Networks", link: "https://www.coursera.org/account/accomplishments/verify/MUDT35MGZ4TN" },
  { name: "Python for Data Science, AI & Development", link: "https://coursera.org/verify/THBDIEY5ZJ6C" },
  { name: "Data Visualization", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_Y3c9Wm4qLnPtiXxZn_1748528358811_completion_certificate.pdf" },
];

export function Contact() {
  const { ref, isInView } = useScrollReveal();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const copyEmail = () => {
    navigator.clipboard.writeText("anshpradhan911@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const discordMessage = {
      content: `**New Message from Portfolio**\n**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Message:** ${formData.message}`
    };

    try {
      const response = await fetch('https://discordapp.com/api/webhooks/1479474596859088896/OvJ8zGtBfAEadnZjvXvonkHNp-vPxYDlpFwUO4xU7dGFWPJIWamqJGj1Dbo_j88qgP0w', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <>
      {/* Certifications Section */}
      <section id="certifications" className="relative py-24 z-10">
        <div className="container mx-auto px-6">
          <SectionHeader badge="CREDENTIALS" title="CERTIFICATIONS" />

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                variants={fadeInUp}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <CyberCard className="h-full group hover:border-cyber-pink/40 border-white/5 bg-black/40 text-center cursor-pointer hover:-translate-y-1 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full mx-auto mb-4 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(232,102,255,0.4)] transition-shadow">
                    <ExternalLink className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-orbitron font-semibold text-sm text-white group-hover:text-cyber-pink transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-cyber-light/40 mt-2 font-rajdhani tracking-wider uppercase">
                    Click to view credential
                  </p>
                </CyberCard>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start" ref={ref}>
            
            {/* Left: Info */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="flex flex-col gap-8"
            >
              <SectionHeader badge="COMMUNICATION" title="GET IN TOUCH" />
              
              <motion.h3 variants={fadeInUp} className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold gradient-text leading-snug">
                LET'S BUILD SOMETHING EXTRAORDINARY
              </motion.h3>

              <motion.p variants={fadeInUp} className="font-rajdhani text-cyber-light/70 text-lg leading-relaxed">
                Always up for new opportunities, cool collaborations, or just geeking out over
                the latest in AI and tech. If it involves code, data, or even a good meme about machine learning, I'm in!
              </motion.p>
              
              <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                <motion.div variants={fadeInUp} className="cyber-card flex items-center p-4 gap-4 bg-black/40 border-white/5 hover:border-cyber-pink/30 group cursor-pointer" onClick={copyEmail}>
                  <div className="p-3 rounded bg-white/5 group-hover:bg-cyber-pink/10 group-hover:text-cyber-pink text-cyber-light transition-colors">
                    {copied ? <Check size={20} className="text-green-400" /> : <Mail size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-orbitron text-xs text-cyber-light/50 mb-1">EMAIL PROTOCOL</div>
                    <div className="font-rajdhani text-lg font-medium tracking-wide">anshpradhan911@gmail.com</div>
                  </div>
                  {copied && <span className="font-orbitron tracking-widest text-[10px] text-green-400 border border-green-400/30 px-2 py-1 rounded bg-green-400/10">COPIED</span>}
                </motion.div>

                <motion.a variants={fadeInUp} href="https://www.linkedin.com/in/anshpradhan14/" target="_blank" rel="noreferrer" className="cyber-card flex items-center p-4 gap-4 bg-black/40 border-white/5 hover:border-blue-400/40 group cursor-pointer transition-colors block">
                  <div className="p-3 rounded bg-white/5 group-hover:bg-blue-400/10 group-hover:text-blue-400 text-cyber-light transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="font-orbitron text-xs text-cyber-light/50 mb-1">PROFESSIONAL NET</div>
                    <div className="font-rajdhani text-lg font-medium tracking-wide">linkedin.com/in/anshpradhan14</div>
                  </div>
                </motion.a>

                <motion.a variants={fadeInUp} href="https://github.com/AnshPradhan14" target="_blank" rel="noreferrer" className="cyber-card flex items-center p-4 gap-4 bg-black/40 border-white/5 hover:border-cyber-light/40 group cursor-pointer transition-colors block">
                  <div className="p-3 rounded bg-white/5 group-hover:bg-white/10 group-hover:text-white text-cyber-light transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="font-orbitron text-xs text-cyber-light/50 mb-1">VERSION CONTROL</div>
                    <div className="font-rajdhani text-lg font-medium tracking-wide">github.com/AnshPradhan14</div>
                  </div>
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="cyber-card p-4 bg-black/20 border-white/5 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_2s_infinite] shadow-[0_0_10px_#22c55e]" />
                <span className="font-rajdhani text-cyber-light/80 text-sm">Open to opportunities · On-Site Hybrid Remote</span>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="w-full"
            >
              <CyberCard className="bg-[rgba(3,3,5,0.8)] border-cyber-pink/20 p-8 shadow-[0_0_40px_rgba(232,102,255,0.05)]">
                <h4 className="font-orbitron font-bold text-xl mb-6 flex bg-gradient-to-r from-white to-cyber-light/60 bg-clip-text text-transparent">
                  TRANSMIT MESSAGE
                </h4>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1 group">
                    <span className="font-orbitron text-[10px] tracking-widest text-cyber-light/40 group-focus-within:text-cyber-pink transition-colors">IDENTIFIER [NAME]</span>
                    <input name="name" value={formData.name} onChange={handleChange} required type="text" className="bg-black/50 border border-white/10 rounded-md px-4 py-3 font-rajdhani text-white outline-none focus:border-cyber-pink/80 focus:shadow-[0_0_15px_rgba(232,102,255,0.2)] transition-all" />
                  </div>
                  
                  <div className="flex flex-col gap-1 group">
                    <span className="font-orbitron text-[10px] tracking-widest text-cyber-light/40 group-focus-within:text-cyber-cyan transition-colors">ADDRESS [EMAIL]</span>
                    <input name="email" value={formData.email} onChange={handleChange} required type="email" className="bg-black/50 border border-white/10 rounded-md px-4 py-3 font-rajdhani text-white outline-none focus:border-cyber-cyan/80 focus:shadow-[0_0_15px_rgba(102,255,255,0.2)] transition-all" />
                  </div>

                  <div className="flex flex-col gap-1 group">
                    <span className="font-orbitron text-[10px] tracking-widest text-cyber-light/40 group-focus-within:text-cyber-pink transition-colors">PAYLOAD [MESSAGE]</span>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="bg-black/50 border border-white/10 rounded-md px-4 py-3 font-rajdhani text-white outline-none focus:border-cyber-pink/80 focus:shadow-[0_0_15px_rgba(232,102,255,0.2)] transition-all resize-none" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState !== 'idle'}
                    className="mt-4 w-full relative overflow-hidden h-12 rounded-md font-orbitron font-bold text-sm tracking-widest flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-cyber-pink to-cyber-purple text-white hover:shadow-[0_0_20px_rgba(232,102,255,0.5)] border border-transparent disabled:opacity-80"
                  >
                    <AnimatePresence mode="wait">
                      {formState === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                          SEND MESSAGE →
                        </motion.span>
                      )}
                      {formState === 'submitting' && (
                        <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </motion.div>
                      )}
                      {formState === 'success' && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <Check size={18} /> TRANSMISSION SUCCESS
                        </motion.div>
                      )}
                      {formState === 'error' && (
                        <motion.div key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-400">
                          TRANSMISSION FAILED — TRY AGAIN
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </CyberCard>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
