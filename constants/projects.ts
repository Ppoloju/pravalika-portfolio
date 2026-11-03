import type { Project } from "@/types/project";

const github = (repository: string) =>
  `https://github.com/Ppoloju/${repository}`;

export const projects: Project[] = [
  {
    id: "money-tracker",
    title: "Money Tracker",
    description:
      "Built during a three-hour hackathon, this React app tracks expenses, monthly budgets, and spending patterns. It includes category charts, search and date filters, and saves data in the browser rather than a shared backend.",
    context: "GITAM · 3-hour hackathon",
    techStack: ["React", "Vite", "Tailwind CSS", "Recharts"],
    status: "Completed",
    githubUrl: github("Expense-Tracker"),
    liveUrl: "https://3hr-expense-tracker.netlify.app",
    featured: true,
  },
  {
    id: "online-voting",
    title: "Online Voting",
    description:
      "A C command-line voting system built for a first-semester programming course. It manages candidates, records and ranks votes, reports vote totals and percentages, and supports file-based persistence and result exports.",
    context: "C programming · Team project",
    techStack: ["C"],
    status: "Completed",
    githubUrl: github("online-voting-system"),
    featured: true,
  },
  {
    id: "movie-recommendation",
    title: "Movie Recommendation System",
    description:
      "A Python command-line recommender with Telugu, Hindi, and English titles. Browse by genre, language, or year; get recommendations from ratings, similar titles, or a surprise pick; and track watched movies and a watchlist.",
    context: "Python project",
    techStack: ["Python"],
    status: "Completed",
    githubUrl: github("movie-recommendation-system"),
    featured: true,
  },
  {
    id: "gatherly",
    title: "Gatherly",
    description:
      "A team project with Vaishnavi and Satvika centered on planning and coordinating shared gatherings.",
    context: "Team project · Vaishnavi & Satvika",
    techStack: [],
    status: "In Progress",
    featured: true,
  },
  {
    id: "jarvis",
    title: "Jarvis — Desktop Assistant",
    description:
      "An AI-powered desktop assistant with voice interaction, laptop automation, and productivity features.",
    context: "Desktop assistant · Shaurya",
    techStack: ["Python"],
    status: "In Progress",
    githubUrl: github("jarvis-ai-desktop-assistant"),
    featured: true,
  },
  {
    id: "training-portal",
    title: "Training Management Portal",
    description:
      "A full-stack corporate training platform for employee and trainer records, courses, training sessions, enrollments, and attendance, with JWT-based authentication.",
    context: "Internship project · Chidhagni",
    techStack: ["Java", "React", "Spring Boot", "PostgreSQL"],
    status: "Completed",
    githubUrl: github("Training-Management-Portal"),
    featured: true,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description:
      "A responsive Next.js portfolio presenting my projects, technical skills, experience, and certifications, with animated sections and contact links.",
    context: "Personal project",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "In Progress",
    githubUrl: github("pravalika-portfolio"),
    featured: true,
  },
  {
    id: "currency-exchange",
    title: "Currency Exchange",
    description:
      "An AI project focused on converting values between currencies and presenting exchange-rate information.",
    context: "AI project",
    techStack: [],
    status: "In Progress",
    featured: true,
  },
  {
    id: "linkedin-messaging",
    title: "n8n LinkedIn Messaging",
    description:
      "An internship learning project connecting an n8n workflow to a Playwright worker to process contact data from an Excel workbook and automate LinkedIn messaging.",
    context: "Internship project · Chidhagni",
    techStack: ["JavaScript", "n8n", "Playwright"],
    status: "Completed",
    githubUrl: github("linkedin-message-automation"),
    featured: true,
  },
  {
    id: "linkedin-network-catchup",
    title: "n8n LinkedIn Network Catch-up",
    description:
      "An internship learning project that schedules a network catch-up workflow, calls a Playwright worker, and emails a run summary.",
    context: "Internship project · Chidhagni",
    techStack: ["JavaScript", "n8n", "Playwright"],
    status: "Completed",
    githubUrl: github("linkedin-network-catchup"),
    featured: true,
  },
  {
    id: "n8n-outlook",
    title: "n8n Outlook",
    description:
      "An internship workflow project exploring how n8n can connect with Outlook for email-related automation.",
    context: "Internship project · Chidhagni",
    techStack: ["n8n"],
    status: "In Progress",
    featured: true,
  },
  {
    id: "n8n-whatsapp",
    title: "n8n WhatsApp",
    description:
      "A collaborative project with Vaishnavi and Satvika exploring WhatsApp workflow integrations using n8n.",
    context: "Team project · Vaishnavi & Satvika",
    techStack: ["n8n"],
    status: "In Progress",
    featured: true,
  },
  {
    id: "student-management",
    title: "Student Management Portal",
    description:
      "An internship project focused on organizing student information through a dedicated management portal.",
    context: "Internship project · Chidhagni",
    techStack: [],
    status: "In Progress",
    featured: true,
  },
  {
    id: "ai-study-agent",
    title: "AI Study Agent",
    description:
      "An AI study assistant that analyzes uploaded syllabi, creates personalized study plans around Google Calendar availability, and generates practice quizzes. The Streamlit chat interface also supports voice input and persistent conversation history.",
    context: "Kaggle · TNX Codathon · Team project",
    techStack: ["Python", "Streamlit", "Gemini API", "Google Calendar", "Firebase"],
    status: "Completed",
    githubUrl: github("ai-agent-hackathon"),
    featured: true,
  },
  {
    id: "signal-labs",
    title: "Signal Labs — AI Attention Layer",
    description:
      "A system of attention that turns thousands of raw operational events into the few decisions that need human attention, grouping related events into signals and adding explainable priorities with optional AI-assisted triage.",
    context: "AI Attention Layer for Alert Management",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    status: "Completed",
    githubUrl: github("AI-Attention-Layer-for-Alert-Management"),
    featured: true,
  },
  {
    id: "sif-precursor-detection",
    title: "SIF Precursor Detection",
    description:
      "A Smart India Hackathon prototype that analyzes Oil India safety reports for Serious Injury and Fatality precursors, maps evidence to Life-Saving Rules, and surfaces trends for HSE review. Its demo uses synthetic data and is decision support, not an official risk score.",
    context: "Smart India Hackathon",
    techStack: ["Python", "FastAPI", "React", "PostgreSQL"],
    status: "Completed",
    githubUrl: github("SIH-SIF-Precursor-Detection"),
    featured: true,
  },
  {
    id: "research-project",
    title: "Research Project",
    description:
      "Research on the trade-offs of Explainable AI: when transparency can improve decision quality and when it may contribute to overconfidence.",
    context: "Research",
    techStack: [],
    status: "In Progress",
    featured: true,
  },
  {
    id: "offline-emergency-mode",
    title: "ResQNET — iQOO Hackathon",
    description:
      "An offline-first emergency communication app built for the iQOO Hackathon. ResQNET combines device-to-device SOS relays, trusted-contact and location sharing, local AI alert prioritization, and disaster coordination features when internet or cellular service is unavailable.",
    context: "Offline emergency mode · 05/2026 — 07/26 · Team project with Vaishnavi & Satvika",
    techStack: ["React", "TypeScript", "Express", "SQLite"],
    status: "Completed",
    githubUrl: github("ResQNET"),
    featured: true,
  },
  {
    id: "grassgate",
    title: "Grassgate",
    description:
      "An offline, voice-first outdoor companion that checks you are outside before responding. Ask about plants and wildlife, get a short outdoor activity, keep a private on-device field journal, and compile a printable weekly zine.",
    context: "Hacktoberfest",
    techStack: ["Python", "Ollama", "Gemma 3n"],
    status: "In Progress",
    githubUrl: github("grassgate"),
    featured: true,
  },
  {
    id: "homedoc",
    title: "HomeDoc",
    description:
      "An AI-assisted personal health organizer for medical documents, records, medications, measurements, and doctor-visit summaries. Extracted information is reviewed by the user before it becomes part of a health record; the app is informational and does not diagnose or prescribe.",
    context: "Team project · Vaishnavi & Satvika",
    techStack: ["JavaScript"],
    status: "In Progress",
    githubUrl: "https://github.com/inturi-vaishnavi/HomeDoc",
    featured: true,
  },
  {
    id: "explain-it-sideways",
    title: "Explain It Sideways",
    description:
      "An AI learning tool that teaches technical concepts from different angles, including everyday analogies, humor, visual diagrams, and structured 2-, 5-, or 10-mark exam answers, with adjustable learning depth.",
    context: "Hacktoberfest · WorkWild",
    techStack: ["React", "Vite", "Express", "Mermaid", "Gemma 4"],
    status: "Completed",
    githubUrl: github("explain-it-sideways"),
    featured: true,
  },
];
