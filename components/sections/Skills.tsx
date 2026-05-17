"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
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
          description="Skills developed through coursework, internships, certifications, and hands-on projects."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-8 sm:grid-cols-2"
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            return (
              <motion.div key={category} variants={staggerItem}>
                <GlowCard hover={false} className="h-full">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-400 mb-5">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        category={skill.category as SkillCategory}
                      />
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
