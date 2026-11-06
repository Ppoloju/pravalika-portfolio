export type SocialIconName = "github" | "linkedin" | "mail" | "file-text" | "users";

const resumeUrl = `/resume/${encodeURIComponent("Poloju Pravalika Resume .pdf")}`;

export const socialLinks: {
  label: string;
  href: string;
  icon: SocialIconName;
}[] = [
  {
    label: "GitHub",
    href: "https://github.com/Ppoloju",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/poloju-pravalika",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:ppoloju@student.gitam.edu",
    icon: "mail",
  },
  {
    label: "Resume",
    href: resumeUrl,
    icon: "file-text",
  },
  {
    label: "GSSOC",
    href: "https://gssoc.girlscript.org/",
    icon: "users",
  },
];
