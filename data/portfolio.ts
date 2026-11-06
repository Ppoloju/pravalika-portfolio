const toPublicAssetUrl = (path: string) => `/${path.replace(/^\//, "")}`;

export const portfolio = {
  name: "Poloju Pravalika",
  role: "Full Stack Developer | Open-Source Enthusiast",
  education: "B.Tech CSE (AI & ML) · GITAM Hyderabad",
  tagline: "Building AI-Powered Solutions",
  headline:
    "Third-year Computer Science Engineering student at GITAM Hyderabad, specializing in AI & ML. I build practical technology solutions through full-stack development, workflow automation, and AI-powered applications. Currently interning at Chidhagni Group, gaining hands-on experience with Java, SpringBoot, PostgreSQL, and automation tools like n8n. Passionate about solving real-world problems, exploring new technologies, and collaborating on open-source projects.",
  email: "ppoloju@student.gitam.edu",
  location: "Hyderabad, India · Open to Internships & Entry-Level Roles",
  resumePath: toPublicAssetUrl(`/resume/${encodeURIComponent("Poloju Pravalika Resume .pdf")}`),
  about: {
    intro:
      "I'm a third-year B.Tech student specializing in Computer Science Engineering (AI & ML) at GITAM Hyderabad, with a strong interest in building practical technology solutions and continuously expanding my skills.",
    journey:
      "My journey began with academic projects in C and Python, expanded through a Computer Science Engineering internship at Chidhagni Group, and continues through research publication, certifications, and hands-on learning with Java, SpringBoot, PostgreSQL, React, Next.js, and workflow automation tools like n8n.",
    focus: [
      {
        title: "Full-Stack Development",
        description:
          "Building end-to-end applications with React JS, Next.js, Java, SpringBoot, and PostgreSQL — focused on creating scalable, user-friendly solutions.",
      },
      {
        title: "Workflow Automation",
        description:
          "Leveraging n8n and automation tools to streamline processes, integrate APIs, and build intelligent workflows that improve efficiency.",
      },
      {
        title: "AI-Powered Solutions",
        description:
          "Exploring AI and machine learning applications, from research publications on Explainable AI to building AI-assisted development tools and automation systems.",
      },
      {
        title: "Open-Source & Collaboration",
        description:
          "Active open-source enthusiast participating in programs like GSSOC, enjoying collaboration with developers worldwide and contributing to meaningful projects.",
      },
    ],
  },
} as const;
