"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  ariaLabel?: string;
}

export function GradientButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  external = false,
  ariaLabel,
}: GradientButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
    "text-sm font-semibold text-white",
    "bg-gradient-to-r from-purple-600 to-cyan-500",
    "shadow-lg shadow-purple-500/20",
    "transition-all duration-300",
    "hover:shadow-purple-500/40 hover:brightness-110",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
