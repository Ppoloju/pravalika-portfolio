"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { skills, skillCategories } from "@/constants/skills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { SkillCategory } from "@/types/skill";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="A curated stack spanning frontend, backend, databases, and deployment — built for production-ready applications."
        />

        <div className="flex flex-col gap-10 md:gap-12">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            return (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
              >
                <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {categorySkills.map((skill) => (
                    <motion.div key={skill.name} variants={staggerItem}>
                      <SkillBadge
                        name={skill.name}
                        category={skill.category as SkillCategory}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
