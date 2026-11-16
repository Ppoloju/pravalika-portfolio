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
        "theme-surface group relative rounded-3xl border shadow-lg shadow-black/5 backdrop-blur-xl",
        "p-4 sm:p-6 md:p-8 transition-all duration-300",
        hover && "hover:shadow-xl",
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
