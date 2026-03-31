import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TerminalBoot({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootSequence = [
    "> INITIALIZING Portfolio.exe...",
    "> LOADING ANSH_PRADHAN.profile ██████████ 100%",
    "> SKILLS MATRIX: ONLINE",
    "> PORTFOLIO_OS v2.0 READY"
  ];

  useEffect(() => {
    // Check if we've already booted in this session
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      onComplete();
      return;
    }

    let currentLine = 0;
    let currentChar = 0;
    let timer: any;

    const processNextChar = () => {
      setLines(prevLines => {
        const newLines = [...prevLines];
        if (currentLine >= bootSequence.length) {
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('hasBooted', 'true');
            setTimeout(onComplete, 400);
          }, 400);
          return newLines;
        }

        if (!newLines[currentLine]) {
          newLines[currentLine] = "";
        }

        const fullLine = bootSequence[currentLine];
        newLines[currentLine] = fullLine.substring(0, currentChar + 1);

        currentChar++;
        if (currentChar > fullLine.length) {
          currentLine++;
          currentChar = 0;
        }

        timer = setTimeout(processNextChar, 30);
        return newLines;
      });
    };

    timer = setTimeout(processNextChar, 100);

    return () => clearTimeout(timer);
  }, []);

  if (sessionStorage.getItem('hasBooted') && lines.length === 0) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-darker backdrop-blur-md"
        >
          <div className="w-full max-w-lg p-6 border border-cyber-cyan/30 rounded-md bg-cyber-dark/80 shadow-[0_0_30px_rgba(102,255,255,0.15)] font-orbitron text-sm md:text-base text-cyber-cyan text-left">
            <div className="flex gap-2 mb-4 pb-2 border-b border-cyber-cyan/20">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex flex-col gap-2 min-h-[140px]">
              {lines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              <div className="animate-blink inline-block w-2 bg-cyber-cyan">&nbsp;</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
