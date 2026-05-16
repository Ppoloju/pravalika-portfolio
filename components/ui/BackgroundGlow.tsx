"use client";

import { motion } from "framer-motion";

export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 top-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[100px]"
      />
    </div>
  );
}
