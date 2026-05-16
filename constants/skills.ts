import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "nextjs" },
  { name: "TypeScript", category: "Frontend", icon: "typescript" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind" },
  { name: "HTML/CSS", category: "Frontend", icon: "html" },
  { name: "Framer Motion", category: "Frontend", icon: "motion" },

  { name: "Node.js", category: "Backend", icon: "node" },
  { name: "Express", category: "Backend", icon: "express" },
  { name: "REST APIs", category: "Backend", icon: "api" },
  { name: "Python", category: "Backend", icon: "python" },

  { name: "PostgreSQL", category: "Database", icon: "postgres" },
  { name: "MongoDB", category: "Database", icon: "mongo" },
  { name: "Supabase", category: "Database", icon: "supabase" },

  { name: "Git", category: "Tools", icon: "git" },
  { name: "Figma", category: "Tools", icon: "figma" },
  { name: "VS Code", category: "Tools", icon: "vscode" },
  { name: "Postman", category: "Tools", icon: "postman" },

  { name: "Vercel", category: "Deployment", icon: "vercel" },
  { name: "Docker", category: "Deployment", icon: "docker" },
  { name: "CI/CD", category: "Deployment", icon: "cicd" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
] as const;
