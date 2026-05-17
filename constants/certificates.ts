import type { Certificate } from "@/types/certificate";
import { certPath } from "@/lib/utils";

export const certificates: Certificate[] = [
  {
    id: "in-progress-1",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2026",
    description:
      "Currently working through responsive web design fundamentals, modern layouts, and frontend best practices.",
    skills: ["HTML", "CSS", "Responsive Design", "Flexbox", "CSS Grid"],
    status: "in-progress",
  },
  {
    id: "in-progress-2",
    title: "HackOps Bootcamp",
    issuer: "HackOps",
    year: "2026",
    description:
      "Actively participating in an intensive bootcamp focused on practical development, problem solving, and modern tech workflows.",
    skills: [
      "Web Development",
      "Problem Solving",
      "Team Projects",
      "Industry Practices",
    ],
    status: "in-progress",
  },
  {
    id: "1",
    title: "CCPL Internship Certificate",
    issuer: "Chidhagini Group",
    year: "2025",
    description:
      "Recognized for successful completion of a Computer Science Engineering internship with hands-on frontend and SDLC exposure.",
    skills: ["React JS", "UI Design", "SDLC", "Frontend Development"],
    file: certPath("2501 CCPL Internship Certificate Pravalika Poloju.pdf"),
    status: "completed",
  },
  {
    id: "2",
    title: "React Basics",
    issuer: "Meta / Coursera",
    year: "2025",
    description:
      "Learned React fundamentals including components, props, state, and building interactive user interfaces.",
    skills: ["React", "Components", "JSX", "Frontend Development"],
    file: certPath("React Basics.pdf"),
    status: "completed",
  },
  {
    id: "3",
    title: "Technical Support Fundamentals",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Covered IT support fundamentals, troubleshooting methodologies, and customer service best practices.",
    skills: ["IT Support", "Troubleshooting", "Customer Service", "Systems"],
    file: certPath("Technical Support Fundamentals.pdf"),
    status: "completed",
  },
  {
    id: "4",
    title: "Foundations of Cybersecurity",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Built foundational knowledge in cybersecurity concepts, threat awareness, and security best practices.",
    skills: ["Cybersecurity", "Threat Analysis", "Security Basics"],
    file: certPath("Foundations of Cybersecurity.pdf"),
    status: "completed",
  },
  {
    id: "5",
    title: "IT Security: Defense Against the Digital Dark Arts",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Explored encryption, authentication, network security, and practical defense strategies.",
    skills: ["IT Security", "Encryption", "Network Security"],
    file: certPath("IT Security Defense against the digital dark arts.pdf"),
    status: "completed",
  },
  {
    id: "6",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Learned networking fundamentals including protocols, IP addressing, and network troubleshooting.",
    skills: ["Networking", "TCP/IP", "DNS", "Troubleshooting"],
    file: certPath("The Bits and Bytes of Computer Networking.pdf"),
    status: "completed",
  },
  {
    id: "7",
    title: "Operating Systems and You: Becoming a Power User",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Gained practical skills in operating system navigation, process management, and system administration basics.",
    skills: ["Operating Systems", "CLI", "System Administration"],
    file: certPath("Operating Systems and You Becoming a Power User.pdf"),
    status: "completed",
  },
  {
    id: "8",
    title: "System Administration and IT Infrastructure Services",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Studied IT infrastructure, directory services, cloud resources, and organizational IT management.",
    skills: ["System Administration", "IT Infrastructure", "Cloud Basics"],
    file: certPath("System Administration and IT Infrastructure.pdf"),
    status: "completed",
  },
  {
    id: "9",
    title: "Crash Course on Python",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Learned Python syntax, data structures, automation scripts, and problem-solving with Python.",
    skills: ["Python", "Automation", "Scripting", "Problem Solving"],
    file: certPath("Crash Course on Python.pdf"),
    status: "completed",
  },
  {
    id: "10",
    title: "Python Basics",
    issuer: "IBM / Coursera",
    year: "2025",
    description:
      "Built core Python programming skills including variables, loops, functions, and data handling.",
    skills: ["Python", "Programming Logic", "Data Types"],
    file: certPath("Python Basics.pdf"),
    status: "completed",
  },
  {
    id: "11",
    title: "Introduction to Computers and Office Productivity Software",
    issuer: "HKUST / Coursera",
    year: "2025",
    description:
      "Learned computer fundamentals and productivity tools for academic and professional workflows.",
    skills: ["Computer Basics", "Productivity", "Office Software"],
    file: certPath(
      "Introduction to Computers and Office Productivity Software.pdf"
    ),
    status: "completed",
  },
  {
    id: "12",
    title: "Create Informative Presentations with Google Slides",
    issuer: "Google / Coursera",
    year: "2025",
    description:
      "Developed skills in creating clear, professional presentations for technical and academic communication.",
    skills: ["Google Slides", "Presentation Design", "Communication"],
    file: certPath("Create Informative Presentations with Google Slides.pdf"),
    status: "completed",
  },
  {
    id: "13",
    title: "Write Professional Emails in English",
    issuer: "Georgia Tech / Coursera",
    year: "2025",
    description:
      "Improved professional written communication for workplace and academic correspondence.",
    skills: ["Professional Writing", "Communication", "Email Etiquette"],
    file: certPath("Write Professional Emails in English.pdf"),
    status: "completed",
  },
  {
    id: "14",
    title: "Everyday Excel, Part 1",
    issuer: "University of Colorado / Coursera",
    year: "2025",
    description:
      "Learned spreadsheet fundamentals, data organization, and analytical workflows using Excel.",
    skills: ["Excel", "Data Analysis", "Spreadsheets"],
    file: certPath("Everyday Excel, Part 1.pdf"),
    status: "completed",
  },
];

export const inProgressCertificates = certificates.filter(
  (c) => c.status === "in-progress"
);

export const completedCertificates = certificates.filter(
  (c) => c.status === "completed"
);
