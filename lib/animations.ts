export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const defaultTransition = {
  duration: 0.25,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const hoverScale = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { type: "spring", stiffness: 360, damping: 24 },
};
