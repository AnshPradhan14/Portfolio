import { cn } from "@/lib/utils";

export function GlowDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-16 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-700", className)}>
      <div className="flex items-center w-full max-w-sm">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyber-pink/50" />
        <div className="mx-4 text-cyber-pink/60 rotate-45 text-xs">◈</div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyber-pink/50" />
      </div>
    </div>
  );
}
