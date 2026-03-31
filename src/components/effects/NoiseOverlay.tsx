import { useEffect, useRef } from 'react';

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;
    
    // create a static noise pattern we can just offset rather than regenerating every frame
    const generateNoisePattern = () => {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = window.innerWidth;
      offscreenCanvas.height = window.innerHeight;
      const offCtx = offscreenCanvas.getContext('2d');
      if (!offCtx) return offscreenCanvas;
      
      const imgData = offCtx.createImageData(offscreenCanvas.width, offscreenCanvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 6; // Very low opacity (approx 0.025 * 255)
      }
      
      offCtx.putImageData(imgData, 0, 0);
      return offscreenCanvas;
    };
    
    let noisePattern = generateNoisePattern();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      noisePattern = generateNoisePattern();
    };

    const animate = () => {
      frameCount++;
      // Only update every 3 frames as specified
      if (frameCount % 3 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Random offset for the noise pattern to create movement
        const offsetX = Math.random() * 50 - 25;
        const offsetY = Math.random() * 50 - 25;
        
        ctx.drawImage(noisePattern, offsetX, offsetY);
        ctx.drawImage(noisePattern, offsetX - canvas.width, offsetY);
        ctx.drawImage(noisePattern, offsetX, offsetY - canvas.height);
        ctx.drawImage(noisePattern, offsetX - canvas.width, offsetY - canvas.height);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[2] pointer-events-none opacity-50"
    />
  );
}
