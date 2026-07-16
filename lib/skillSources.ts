import { experiences } from "@/constants/experience";
import { projects } from "@/constants/projects";

export interface SkillSource {
  type: "experience" | "project";
  id: string;
  title: string;
  subtitle: string;
  description?: string;
}

export function getSkillSources(skillName: string): SkillSource[] {
  const sources: SkillSource[] = [];

  // Find experiences that use this skill
  experiences.forEach((exp) => {
    if (exp.technologies.some((tech) => 
      tech.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(tech.toLowerCase())
    )) {
      sources.push({
        type: "experience",
        id: exp.id,
        title: exp.role,
        subtitle: `${exp.company} · ${exp.duration}`,
        description: exp.responsibilities[0],
      });
    }
  });

  // Find projects that use this skill
  projects.forEach((proj) => {
    if (proj.techStack.some((tech) => 
      tech.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(tech.toLowerCase())
    )) {
      sources.push({
        type: "project",
        id: proj.id,
        title: proj.title,
        subtitle: proj.techStack.join(" · "),
        description: proj.description,
      });
    }
  });

  return sources;
}
