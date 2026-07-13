export type SocialIconName = "github" | "linkedin" | "mail" | "file-text";

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
    href: "/resume/Pravalika Resume.pdf",
    icon: "file-text",
  },
];
