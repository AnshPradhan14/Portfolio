import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { motion, MotionProps } from "framer-motion";

interface CyberButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>, MotionProps {
  variant?: 'primary' | 'ghost' | 'icon';
  asChild?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = 'primary', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;
    
    return (
      <Comp
        ref={ref}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative inline-flex items-center justify-center font-orbitron text-sm font-semibold tracking-wider uppercase transition-all duration-300",
          "disabled:opacity-50 disabled:pointer-events-none",
          "group overflow-hidden rounded-full",
          variant === 'primary' && [
            "bg-gradient-to-r from-cyber-pink to-cyber-purple text-white shadow-lg",
            "hover:shadow-[0_0_20px_rgba(232,102,255,0.5)] border border-transparent"
          ],
          variant === 'ghost' && [
            "bg-transparent text-cyber-cyan border border-cyber-cyan",
            "hover:bg-cyber-cyan hover:text-cyber-darker"
          ],
          variant === 'icon' && [
            "bg-white/5 border border-white/10 text-white p-3 rounded-lg backdrop-blur-md",
            "hover:border-cyber-pink/50 hover:bg-cyber-pink/10 hover:shadow-[0_0_15px_rgba(232,102,255,0.3)]"
          ],
          className
        )}
        {...(props as any)}
      />
    );
  }
);
CyberButton.displayName = "CyberButton";
