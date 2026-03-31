import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Background & Effects
import { CyberGrid } from './components/background/CyberGrid';
import { ParticleField } from './components/background/ParticleField';
import { CustomCursor } from './components/effects/CustomCursor';
import { NoiseOverlay } from './components/effects/NoiseOverlay';
import { TerminalBoot } from './components/effects/TerminalBoot';

// Layout & UI
import { GlowDivider } from './components/ui/GlowDivider';

// Sections
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

function App() {
  const [bootComplete, setBootComplete] = useState(() => {
    return !!sessionStorage.getItem('hasBooted');
  });

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <CyberGrid />
      <ParticleField />
      
      {!bootComplete && (
        <TerminalBoot onComplete={() => setBootComplete(true)} />
      )}

      <AnimatePresence>
        {bootComplete && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen relative z-10"
          >
            <Navbar />
            <Hero />
            <GlowDivider />
            <About />
            <GlowDivider />
            <Skills />
            <GlowDivider />
            <Projects />
            <GlowDivider />
            <Experience />
            <GlowDivider />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
