"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Github, Linkedin, Mail, FileText, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialIconName } from "@/constants/socials";

const iconMap: Record<SocialIconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "file-text": FileText,
  users: Users,
};

interface SocialButtonProps {
  href: string;
  label: string;
  icon: SocialIconName;
  className?: string;
}

export function SocialButton({
  href,
  label,
  icon,
  className,
}: SocialButtonProps) {
  const Icon = iconMap[icon];
  const isExternal = icon !== "mail" && icon !== "file-text";
  const newTabDescriptionId = useId();

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      aria-describedby={isExternal ? newTabDescriptionId : undefined}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
        "border border-border-theme bg-tint text-muted",
        "transition-colors duration-200 hover:bg-surface hover:text-foreground",
        className
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {isExternal && (
        <span id={newTabDescriptionId} className="sr-only">
          Opens in a new tab
        </span>
      )}
    </motion.a>
  );
}
