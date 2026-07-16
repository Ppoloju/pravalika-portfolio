"use client";

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

  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium",
        "transition-all duration-300",
        sources.length > 0 ? "cursor-pointer" : "cursor-default",
        isActive
          ? "border-purple-500/50 bg-purple-500/20 text-white shadow-[0_0_20px_-8px_rgba(168,85,247,0.5)] scale-105"
          : "border-white/10 bg-white/[0.04] text-gray-300 hover:scale-105 hover:border-purple-500/30 hover:text-white hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.4)]",
        className
      )}
    >
      <Icon className={cn("h-4 w-4", isActive ? "text-purple-300" : "text-purple-400")} aria-hidden />
      {name}
    </span>
  );
}
