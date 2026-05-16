"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, defaultTransition } from "./animations";

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;

export const fadeUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: fadeUp,
  transition: defaultTransition,
};

export type MotionDivProps = HTMLMotionProps<"div">;
