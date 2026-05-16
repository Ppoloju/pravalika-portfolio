"use client";

import { motion } from "framer-motion";
import { fadeUp, defaultTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={defaultTransition}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
