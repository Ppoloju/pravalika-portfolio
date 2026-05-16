"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { portfolio } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="Building real-world skills through projects, internships, and continuous growth."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl flex flex-col gap-6 md:gap-8"
        >
          {portfolio.experience.map((exp) => (
            <motion.div key={exp.role} variants={staggerItem}>
              <GlowCard hover={false}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-gray-500 shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-4 text-base text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
