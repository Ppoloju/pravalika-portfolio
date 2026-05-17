"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GlowCard } from "@/components/ui/GlowCard";
import { projects } from "@/constants/projects";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Projects"
          title="Academic & Hands-On Work"
          description="Honest snapshots of projects I've built through coursework, team collaboration, and practical experimentation."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-8 md:mt-10"
        >
          <GlowCard hover={false} className="border-dashed border-purple-500/20">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
                <Sparkles className="h-6 w-6 text-purple-400" aria-hidden />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  Currently Learning & Building More Projects
                </h3>
                <p className="mt-2 text-base text-gray-400 leading-relaxed">
                  I&apos;m actively expanding my portfolio with React, Next.js,
                  and full-stack projects — combining coursework, certifications,
                  and AI-assisted development to grow as a modern web developer.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </Container>
    </section>
  );
}
