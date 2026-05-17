"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { portfolio } from "@/data/portfolio";
import { fadeUp, defaultTransition } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center py-24 md:py-32">
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-4"
          >
            {portfolio.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.1 }}
            className="mb-6 text-sm text-cyan-400/90"
          >
            B.Tech CSE (AI & ML) · GITAM Hyderabad
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white">
            <AnimatedText text={portfolio.tagline} />
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            {portfolio.headline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <GradientButton href="#projects">View Projects</GradientButton>
            <OutlineButton href="#contact">Contact Me</OutlineButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="flex flex-col items-center gap-2 text-gray-500 transition-colors hover:text-gray-300"
            >
              <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
