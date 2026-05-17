"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { education } from "@/constants/education";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Education"
          title="Academic Foundation"
          description="A strong academic record in computer science and related disciplines."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-3xl"
        >
          <motion.div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/40 to-transparent md:left-[11px]"
            aria-hidden
          />

          <div className="flex flex-col gap-6 md:gap-8">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="relative pl-10 md:pl-14"
              >
                <div
                  className="absolute left-0 top-8 flex h-[18px] w-[18px] items-center justify-center md:h-[22px] md:w-[22px]"
                  aria-hidden
                >
                  <span className="absolute h-full w-full animate-pulse rounded-full bg-cyan-500/30 blur-sm" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#030303] shadow-[0_0_12px_rgba(6,182,212,0.5)] md:h-3.5 md:w-3.5" />
                </div>

                <GlowCard hover={index === 0}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
                        <GraduationCap
                          className="h-6 w-6 text-purple-400"
                          aria-hidden
                        />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white">
                          {item.degree}
                        </h3>
                        <p className="mt-1 text-purple-400">
                          {item.institution}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center sm:text-right">
                      <p className="text-2xl font-semibold text-white">
                        {item.highlight}
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        {item.highlightLabel}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
