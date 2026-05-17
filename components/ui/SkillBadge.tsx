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
}

export function SkillBadge({ name, category, className }: SkillBadgeProps) {
  const Icon = category ? categoryIcons[category] : Code2;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/10",
        "bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300",
        "transition-all duration-300 hover:scale-105 hover:border-purple-500/30 hover:text-white",
        "hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.4)]",
        className
      )}
    >
      <Icon className="h-4 w-4 text-purple-400" aria-hidden />
      {name}
    </span>
  );
}
