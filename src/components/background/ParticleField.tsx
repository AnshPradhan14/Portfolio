import { useEffect, useRef } from 'react';

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      age: number;
      baseOpacity: number;
      
      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 1;
        
        const r = Math.random();
        // #E866FF (pink 40%), #66FFFF (cyan 40%), #8C34E8 (purple 20%)
        if (r < 0.4) this.color = '232, 102, 255';
        else if (r < 0.8) this.color = '102, 255, 255';
        else this.color = '140, 52, 232';
        
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = -Math.random() * 0.2 - 0.1;
        this.age = Math.random() * 100;
        this.baseOpacity = Math.random() * 0.5 + 0.2;
      }
      
      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.age += 0.05;
        
        // Wrap around
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        
        // Mouse repel
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let opacity = this.baseOpacity + Math.sin(this.age) * 0.2;
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
          opacity = 0.9;
        }
        
        return `rgba(${this.color}, ${Math.max(0.1, Math.min(1, opacity))})`;
      }
      
      draw(ctx: CanvasRenderingContext2D, opacity: string) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = opacity;
        ctx.fill();
      }
    }
    
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      const count = Math.min(120, (canvas.width * canvas.height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const p of particles) {
        const color = p.update(canvas.width, canvas.height);
        p.draw(ctx, color);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
