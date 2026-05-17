import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Online Voting System",
    description:
      "Developed a basic online voting system during first semester using C programming language as a team project.",
    techStack: ["C Language"],
    status: "Academic Project",
    featured: true,
  },
  {
    id: "2",
    title: "Online Movie Review System",
    description:
      "Built a movie review system using Python with AI-assisted development concepts to improve functionality and workflow.",
    techStack: ["Python", "AI-Assisted Development"],
    status: "Academic Project",
    featured: true,
  },
  {
    id: "3",
    title: "Speed Control Barrier Gate System",
    description:
      "Developed a hardware-integrated speed control barrier gate system using Arduino IDE and embedded programming concepts.",
    techStack: ["Arduino IDE", "Embedded Systems"],
    status: "Hardware Project",
    featured: true,
  },
];
