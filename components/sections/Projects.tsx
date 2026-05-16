"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/constants/projects";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          description="Selected work showcasing full-stack development, modern UI/UX, and scalable architecture."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-8 md:grid-cols-2"
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
