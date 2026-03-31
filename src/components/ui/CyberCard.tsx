import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function CyberCard({ children, className, glowOnHover = true }: CyberCardProps) {
  return (
    <div className={cn("cyber-card relative overflow-hidden group", className)}>
      <div 
        className={cn(
          "absolute inset-0 bg-cyber-pink/5 opacity-0 transition-opacity duration-500", 
          glowOnHover && "group-hover:opacity-100"
        )} 
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
