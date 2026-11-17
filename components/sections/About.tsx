"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { portfolio } from "@/data/portfolio";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-32">
      <Container>
        <SectionHeading
          label="About Me"
          title="Who I Am"
          description={portfolio.about.intro}
        />

        <p className="mx-auto mb-8 max-w-3xl text-center text-sm leading-relaxed text-muted sm:mb-12 sm:text-base md:text-lg">
          {portfolio.about.journey}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2"
        >
          {portfolio.about.focus.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <GlowCard>
                <h3 className="text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
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
