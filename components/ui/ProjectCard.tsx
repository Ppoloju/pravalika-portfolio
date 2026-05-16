"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { GlowCard } from "./GlowCard";
import { OutlineButton } from "./OutlineButton";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlowCard className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-base text-gray-400 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <OutlineButton
            href={project.githubUrl}
            external
            className="!px-4 !py-2 text-xs"
          >
            <Github className="h-4 w-4" />
            GitHub
          </OutlineButton>
          {project.liveUrl && (
            <OutlineButton
              href={project.liveUrl}
              external
              className="!px-4 !py-2 text-xs"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </OutlineButton>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
