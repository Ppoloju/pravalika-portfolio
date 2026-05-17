"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { portfolio } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="About Me"
          title="Who I Am"
          description={portfolio.about.intro}
        />

        <p className="mx-auto mb-12 max-w-3xl text-center text-base md:text-lg text-gray-400 leading-relaxed">
          {portfolio.about.journey}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-8 sm:grid-cols-2"
        >
          {portfolio.about.focus.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <GlowCard>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
