import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeaderProps {
  badge: string;
  title: string;
  className?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ badge, title, className }, ref) => {
    return (
      <motion.div 
        ref={ref}
        variants={fadeInUp}
        className={cn("flex flex-col gap-2 mb-10 relative z-10", className)}
      >
        <div className="font-orbitron text-[10px] text-cyber-pink tracking-[0.3em] font-medium uppercase cyber-glow inline-block w-fit">
          [ {badge} ]
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl md:text-5xl gradient-text neon-text">
          {title}
        </h2>
        <div className="h-[2px] w-[60px] bg-gradient-to-r from-cyber-pink to-cyber-cyan mt-2" />
      </motion.div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";
