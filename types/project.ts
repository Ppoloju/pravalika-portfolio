export type ProjectStatus = "Completed" | "In Progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  context?: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}
