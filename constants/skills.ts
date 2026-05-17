import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React JS", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },

  { name: "Python", category: "Programming" },
  { name: "C Language", category: "Programming" },

  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Database" },

  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Cursor AI", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Google Slides", category: "Tools" },

  { name: "Technical Support Fundamentals", category: "Other" },
  { name: "Cybersecurity Foundations", category: "Other" },
  { name: "Communication Skills", category: "Other" },
  { name: "Team Collaboration", category: "Other" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Programming",
  "Database",
  "Tools",
  "Other",
] as const;
