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
        "inline-flex min-h-12 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium",
        "transition-all duration-300",
        hasSources ? "cursor-pointer" : "cursor-default opacity-70",
        isActive
          ? "border-accent bg-accent text-button-foreground"
          : "border-border-theme bg-tint text-foreground hover:bg-surface",
        className
      )}
    >
      <motion.div
        animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className={cn(
          "rounded-lg p-1.5 transition-colors",
          isActive ? "bg-button-foreground/15" : "bg-surface"
        )}
      >
        <Icon className={cn("h-3.5 w-3.5", isActive ? "text-button-foreground" : "text-accent")} aria-hidden />
      </motion.div>
      {name}
      {hasSources && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-1 h-1.5 w-1.5 rounded-full bg-accent"
        />
      )}
    </motion.button>
  );
}
