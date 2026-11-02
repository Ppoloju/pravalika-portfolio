"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlowCard({
  children,
  className,
  hover = true,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative rounded-3xl border border-white/10 bg-slate-950/60 shadow-xl shadow-black/10 backdrop-blur-xl",
        "p-6 md:p-8 transition-all duration-300",
        hover && "hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-950/30",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.08), transparent 45%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
