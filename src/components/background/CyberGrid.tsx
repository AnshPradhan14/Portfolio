export function CyberGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-cyber-darker overflow-hidden">
      {/* Layer 2 - Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Layer 3 - Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, var(--scanline), var(--scanline) 2px, transparent 2px, transparent 4px)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* Layer 4 - Radial vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, var(--cyber-darker) 100%)'
        }}
      />

      {/* Layer 5 - Floating neon orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-cyber-pink/10 blur-[120px] animate-float" style={{ animationDuration: '14s' }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-cyber-cyan/10 blur-[120px] animate-float" style={{ animationDuration: '10s', animationDelay: '-5s' }} />
      <div className="absolute top-[30%] right-[-50px] w-[400px] h-[400px] rounded-full bg-cyber-purple/10 blur-[120px] animate-float" style={{ animationDuration: '12s', animationDelay: '-2s' }} />
    </div>
  );
}
