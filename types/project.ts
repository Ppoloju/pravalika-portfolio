export type ProjectStatus =
  | "Academic Project"
  | "Hardware Project"
  | "In Progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}
