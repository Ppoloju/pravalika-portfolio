"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Wrench,
  Braces,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types/skill";
import { getSkillSources } from "@/lib/skillSources";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Programming: Braces,
  Database: Database,
  Tools: Wrench,
  Other: Sparkles,
};

interface SkillBadgeProps {
  name: string;
  category?: SkillCategory;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function SkillBadge({ name, category, className, onClick, isActive }: SkillBadgeProps) {
  const Icon = category ? categoryIcons[category] : Code2;
  const sources = getSkillSources(name);
  const hasSources = sources.length > 0;

  return (
    <motion.button
      type="button"
      onClick={hasSources ? onClick : undefined}
      disabled={!hasSources}
      aria-haspopup={hasSources ? "dialog" : undefined}
      aria-expanded={hasSources ? isActive : undefined}
      whileHover={hasSources ? { scale: 1.05, y: -2 } : {}}
      whileTap={hasSources ? { scale: 0.98 } : {}}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium",
        "transition-all duration-300",
        hasSources ? "cursor-pointer" : "cursor-default opacity-70",
        isActive
          ? "border-purple-500/60 bg-gradient-to-br from-purple-500/25 to-purple-600/15 text-white shadow-[0_0_25px_-8px_rgba(168,85,247,0.6)] scale-105"
          : "border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] text-gray-300 hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_25px_-8px_rgba(168,85,247,0.3)] hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-cyan-500/5",
        className
      )}
    >
      <motion.div
        animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className={cn(
          "rounded-lg p-1.5 transition-colors",
          isActive ? "bg-purple-500/30" : "bg-purple-500/10"
        )}
      >
        <Icon className={cn("h-3.5 w-3.5", isActive ? "text-purple-200" : "text-purple-400")} aria-hidden />
      </motion.div>
      {name}
      {hasSources && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400 ml-1"
        />
      )}
    </motion.button>
  );
}
