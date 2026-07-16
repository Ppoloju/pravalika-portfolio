"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { SkillSourcesModal } from "@/components/ui/SkillSourcesModal";
import { skills, skillCategories } from "@/constants/skills";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { getSkillSources } from "@/lib/skillSources";
import type { SkillCategory } from "@/types/skill";

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const sources = selectedSkill ? getSkillSources(selectedSkill) : [];

  const handleSkillClick = (skillName: string) => {
    if (sources.length > 0 && selectedSkill === skillName) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skillName);
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="Skills developed through coursework, internships, certifications, and hands-on projects. Click on any skill to see where it was applied."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-5 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            return (
              <motion.div key={category} variants={staggerItem}>
                <GlowCard hover={true} className="h-full p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.2)]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500/60 to-transparent rounded-full" />
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400 whitespace-nowrap">
                      {category}
                    </h3>
                    <div className="h-0.5 flex-1 bg-gradient-to-l from-cyan-500/60 to-transparent rounded-full" />
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {categorySkills.map((skill) => (
                      <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        category={skill.category as SkillCategory}
                        onClick={() => handleSkillClick(skill.name)}
                        isActive={selectedSkill === skill.name}
                      />
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      <SkillSourcesModal
        isOpen={selectedSkill !== null}
        onClose={() => setSelectedSkill(null)}
        skillName={selectedSkill || ""}
        sources={sources}
      />
    </section>
  );
}
