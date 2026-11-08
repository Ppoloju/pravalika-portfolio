"use client";

import { Check, Clock3, Code2, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { GlowCard } from "./GlowCard";
import { OutlineButton } from "./OutlineButton";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const statusStyles: Record<Project["status"], string> = {
  Completed: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  "In Progress": "border-amber-400/20 bg-amber-400/10 text-amber-200",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const StatusIcon = project.status === "Completed" ? Check : Clock3;

  return (
    <GlowCard className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[1.7] w-full overflow-hidden bg-gradient-to-br from-[#171429] via-[#0c111b] to-[#0b2025]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden">
            <div className="absolute -left-10 -top-20 h-48 w-48 rounded-full bg-purple-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] text-white/40">
              SELECTED WORK
            </span>
            <Code2
              className="relative h-9 w-9 text-white/30"
              strokeWidth={1.25}
              aria-hidden
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm sm:right-4 sm:top-4 sm:text-xs",
            statusStyles[project.status]
          )}
        >
          <StatusIcon className="h-3 w-3" aria-hidden />
          {project.status}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 md:p-6 lg:p-8">
        {project.context && (
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
            {project.context}
          </p>
        )}
        <h3 className="break-words text-lg font-semibold leading-snug text-white sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-gray-400 sm:mt-3 sm:text-base">
          {project.description}
        </p>

        {project.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.75 text-[10px] font-medium text-gray-400 sm:px-2.5 sm:py-1 sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
          {project.githubUrl ? (
            <OutlineButton
              href={project.githubUrl}
              external
              ariaLabel={`Open GitHub repository for ${project.title}`}
              className="!px-4 !py-2 text-xs"
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              GitHub
            </OutlineButton>
          ) : (
            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-dashed border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs text-gray-500">
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              GitHub — Coming Soon
            </span>
          )}
          {project.liveUrl && (
            <OutlineButton
              href={project.liveUrl}
              external
              ariaLabel={`Open live demo for ${project.title}`}
              className="!px-3 !py-1.5 sm:!px-4 sm:!py-2 text-[10px] sm:text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              Live Demo
            </OutlineButton>
          )}
          {project.documentUrl && (
            <OutlineButton
              href={project.documentUrl}
              external
              ariaLabel={`Open MLH participation document for ${project.title}`}
              className="!px-3 !py-1.5 sm:!px-4 sm:!py-2 text-[10px] sm:text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              MLH Participation
            </OutlineButton>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
