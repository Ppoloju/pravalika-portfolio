import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "DevFlow Platform",
    description:
      "A full-stack developer productivity platform with real-time collaboration, project dashboards, and AI-assisted code insights.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Aura Commerce",
    description:
      "Modern e-commerce experience with glassmorphic UI, cart management, and secure checkout powered by REST APIs.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "3",
    title: "Insight Analytics",
    description:
      "Data visualization dashboard for tracking KPIs with interactive charts, filters, and export capabilities.",
    techStack: ["Next.js", "D3.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "TaskSync API",
    description:
      "Scalable task management REST API with authentication, role-based access, and comprehensive documentation.",
    techStack: ["Node.js", "Express", "JWT", "MongoDB"],
    githubUrl: "https://github.com",
    featured: true,
  },
];
