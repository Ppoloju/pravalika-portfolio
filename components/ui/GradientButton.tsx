"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useId } from "react";
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
  const newTabDescriptionId = useId();
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3",
    "bg-button text-button-foreground text-sm font-semibold",
    "shadow-sm shadow-black/10 transition-colors duration-200",
    "hover:brightness-90",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          aria-describedby={external ? newTabDescriptionId : undefined}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
          {external && (
            <span id={newTabDescriptionId} className="sr-only">
              Opens in a new tab
            </span>
          )}
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
