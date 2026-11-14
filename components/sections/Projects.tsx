"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { GlowCard } from "@/components/ui/GlowCard";
import { projects } from "@/constants/projects";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

export function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const featuredProjects = projects.filter((project) => project.featured);
  const visibleProjects = showAllProjects ? projects : featuredProjects;
  const completedCount = projects.filter(
    (project) => project.status === "Completed"
  ).length;
  const inProgressCount = projects.length - completedCount;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-32">
      <Container>
        <SectionHeading
          label="Projects"
          title="A little of what I’ve built"
          description="Selected coursework, hackathon builds, internship work, research, and collaborations."
        />

        <div className="mb-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-2 py-4 sm:mb-10 sm:px-6 sm:py-5">
          {[
            { label: "Projects", value: projects.length },
            { label: "Completed", value: completedCount },
            { label: "In Progress", value: inProgressCount },
          ].map((stat) => (
            <div key={stat.label} className="px-2 text-center sm:px-4">
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {stat.value.toString().padStart(2, "0")}
              </p>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          id="project-list"
          className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {featuredProjects.length < projects.length && (
          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              type="button"
              aria-controls="project-list"
              aria-expanded={showAllProjects}
              onClick={() => setShowAllProjects((showAll) => !showAll)}
              className="min-h-12 rounded-xl border border-white/15 px-5 text-sm font-medium text-gray-200 transition-colors hover:border-purple-400/50 hover:bg-white/[0.04]"
            >
              {showAllProjects
                ? "Show featured projects"
                : `Browse all ${projects.length} projects`}
            </button>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-6 sm:mt-8 md:mt-10"
        >
          <GlowCard hover={false} className="border-dashed border-purple-500/20">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-purple-500/30 bg-purple-500/10">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  What’s next
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {inProgressCount} projects are in progress across coursework,
                  internship work, research, and team collaborations. I&apos;m
                  looking forward to sharing updates as they take shape.
                </p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </Container>
    </section>
  );
}
