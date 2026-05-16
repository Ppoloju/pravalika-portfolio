"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OutlineButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
}

export function OutlineButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  external,
}: OutlineButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
    "text-sm font-semibold text-white",
    "border border-white/20 bg-white/[0.03] backdrop-blur-sm",
    "transition-all duration-300",
    "hover:border-white/40 hover:bg-white/10",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
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
    >
      {children}
    </motion.button>
  );
}
