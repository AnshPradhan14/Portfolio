import React from "react";
import { cn } from "@/lib/utils";

interface GlassPillProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function GlassPill({ children, active = false, className }: GlassPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-orbitron font-medium tracking-wide transition-all duration-300",
        "border backdrop-blur-sm cursor-pointer",
        active 
          ? "bg-gradient-to-r from-cyber-pink/20 to-cyber-purple/20 border-cyber-pink text-cyber-light shadow-[0_0_15px_rgba(232,102,255,0.3)]" 
          : "bg-black/20 border-white/10 text-cyber-light/60 hover:border-cyber-pink/50 hover:text-cyber-light",
        className
      )}
    >
      {children}
    </div>
  );
}
