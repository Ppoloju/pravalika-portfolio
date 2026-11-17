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
import { Code2, Database, Server, Wrench, Braces, Sparkles, type LucideIcon } from "lucide-react";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Programming: Braces,
  Database: Database,
  Tools: Wrench,
  Other: Sparkles,
};

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
    <section id="skills" className="relative overflow-hidden py-16 sm:py-20 md:py-32 lg:py-40">
      <Container className="relative z-10">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="Skills developed through coursework, internships, certifications, and hands-on projects. Select a skill with an indicator to see where it was applied."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            const Icon = categoryIcons[category];
            return (
              <motion.div key={category} variants={staggerItem}>
                <GlowCard hover={true} className="h-full p-4 sm:p-5 md:p-7">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="rounded-lg border border-border-theme bg-tint p-2 sm:rounded-xl sm:p-2.5">
                      <Icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm sm:tracking-[0.25em]">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
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
