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
    <section id="skills" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-500/8 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] bg-cyan-500/8 rounded-full blur-[70px] sm:blur-[85px] md:blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/3 w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] bg-pink-500/5 rounded-full blur-[60px] sm:blur-[70px] md:blur-[80px]"
        />
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
          className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            );
            const Icon = categoryIcons[category];
            return (
              <motion.div key={category} variants={staggerItem}>
                <GlowCard hover={true} className="h-full p-4 sm:p-5 md:p-7 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.25)] backdrop-blur-sm bg-white/[0.02]">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="rounded-lg sm:rounded-xl p-2 sm:p-2.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20"
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-400">
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
