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
        "theme-surface group relative rounded-2xl border shadow-sm shadow-black/5",
        "p-4 transition-shadow duration-200 sm:p-6 md:p-8",
        hover && "hover:shadow-md",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
