export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Programming"
  | "Database"
  | "Tools"
  | "Other";

export interface Skill {
  name: string;
  category: SkillCategory;
}
