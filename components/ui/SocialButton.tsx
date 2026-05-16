"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialIconName } from "@/constants/socials";

const iconMap: Record<SocialIconName, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
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

  return (
    <motion.a
      href={href}
      target={icon === "mail" ? undefined : "_blank"}
      rel={icon === "mail" ? undefined : "noopener noreferrer"}
      aria-label={label}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl",
        "border border-white/10 bg-white/[0.04] text-gray-400",
        "transition-colors duration-300",
        "hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]",
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}
