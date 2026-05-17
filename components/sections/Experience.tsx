"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { experiences } from "@/constants/experience";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="Internships, volunteering, and leadership roles that shaped my growth as an aspiring developer."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-3xl"
        >
          <motion.div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/60 via-cyan-500/40 to-transparent md:left-[11px]"
            aria-hidden
          />

          <div className="flex flex-col gap-8 md:gap-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className="relative pl-10 md:pl-14"
              >
                <motion.div
                  className="absolute left-0 top-6 flex h-[18px] w-[18px] items-center justify-center md:h-[22px] md:w-[22px]"
                  aria-hidden
                >
                  <span className="absolute h-full w-full animate-pulse rounded-full bg-purple-500/30 blur-sm" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-purple-400 bg-[#030303] shadow-[0_0_12px_rgba(168,85,247,0.6)] md:h-3.5 md:w-3.5" />
                </motion.div>

                <GlowCard hover={index === 0}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-purple-400">{exp.company}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {exp.location}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm text-gray-500">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {exp.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base text-gray-400 leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400 transition-colors hover:border-purple-500/30 hover:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
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
