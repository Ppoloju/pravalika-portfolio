import { experiences } from "@/constants/experience";
import { projects } from "@/constants/projects";

export interface SkillSource {
  type: "experience" | "project";
  id: string;
  title: string;
  subtitle: string;
  description?: string;
}

const normalizeSkill = (skill: string) =>
  skill.toLowerCase().replace(/[^a-z0-9]/g, "");

const skillAliases: Record<string, string[]> = {
  clanguage: ["c"],
  reactjs: ["react"],
};

const matchesSkill = (skillName: string, technology: string) => {
  const skill = normalizeSkill(skillName);
  const tech = normalizeSkill(technology);

  return (
    skill === tech ||
    skillAliases[skill]?.includes(tech) === true ||
    skillAliases[tech]?.includes(skill) === true
  );
};

export function getSkillSources(skillName: string): SkillSource[] {
  const sources: SkillSource[] = [];

  experiences.forEach((exp) => {
    if (exp.technologies.some((tech) => matchesSkill(skillName, tech))) {
      sources.push({
        type: "experience",
        id: exp.id,
        title: exp.role,
        subtitle: exp.duration
          ? `${exp.company} · ${exp.duration}`
          : exp.company,
        description: exp.responsibilities[0],
      });
    }
  });

  projects.forEach((proj) => {
    if (proj.techStack.some((tech) => matchesSkill(skillName, tech))) {
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
