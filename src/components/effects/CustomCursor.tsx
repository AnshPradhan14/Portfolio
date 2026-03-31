import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use springs for smooth following of the outer ring
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Check if device supports hover (not a touch device)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsVisible(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16); // Center the 32px ring
      cursorY.set(e.clientY - 16);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Also handle when leaving viewport
    document.documentElement.addEventListener('mouseleave', () => setIsVisible(false));
    document.documentElement.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, [role="button"] { cursor: none; }
      `}</style>
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyber-pink rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isClicking ? 0 : (isHovering ? 0 : 1),
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyber-pink pointer-events-none z-[99] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
          backgroundColor: isHovering ? 'rgba(232,102,255,0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(232,102,255,0.5)' : 'rgba(232,102,255,1)'
        }}
      />
    </>
  );
}
