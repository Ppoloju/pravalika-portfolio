"use client";

import { motion } from "framer-motion";
import { ArrowDown, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/GradientButton";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { portfolio } from "@/data/portfolio";
import { fadeUp, defaultTransition } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pb-14 pt-28 sm:pt-32 md:min-h-screen md:py-32">
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
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
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            transition={defaultTransition}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/[0.07] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-purple-200 sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            {portfolio.role}
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.1 }}
            className="mb-4 text-sm text-gray-400 sm:mb-5 sm:text-base"
          >
            {portfolio.education}
          </motion.p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl xl:text-7xl">
            <AnimatedText
              text={portfolio.tagline}
              className="gap-x-[0.25em]"
            />
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8"
          >
            {portfolio.headline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
          >
            <GradientButton href="#projects">View Projects</GradientButton>
            <OutlineButton href="#contact">Contact Me</OutlineButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.6 }}
            className="mt-10"
          >
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300"
            >
              <span className="uppercase tracking-[0.15em]">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...defaultTransition, delay: 0.45 }}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto"
          aria-label="Areas of focus"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-purple-500/15 via-transparent to-cyan-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0d14]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-300/20 bg-purple-400/10 text-purple-200">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                    A little about my work
                  </p>
                  <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                    Curious by nature. Builder by practice.
                  </p>
                </div>
              </div>
              <span className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {portfolio.about.focus.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 sm:p-4"
                >
                  <span className="mb-3 block font-mono text-[10px] tracking-[0.18em] text-cyan-300/70">
                    0{index + 1}
                  </span>
                  <p className="text-sm font-medium leading-snug text-gray-200 sm:text-base">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-4 w-4 shrink-0 text-purple-300" aria-hidden />
                {portfolio.education}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                {portfolio.location.split(" · ")[0]}
              </span>
            </div>
          </div>
        </motion.aside>
      </Container>
    </section>
  );
}
