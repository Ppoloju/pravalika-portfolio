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
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "p-6 md:p-8 transition-all duration-300",
        hover &&
          "hover:border-purple-500/30 hover:shadow-[0_0_40px_-12px_rgba(168,85,247,0.35)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.06), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
