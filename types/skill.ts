export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools"
  | "Deployment";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
}
