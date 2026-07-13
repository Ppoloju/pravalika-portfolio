export type SocialIconName = "github" | "linkedin" | "mail" | "file-text" | "users";

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
  {
    label: "GSSOC",
    href: "https://gssoc.girlscript.org/profile/3002bf55-3feb-2641-412f-acd1-a55f62a8f81d",
    icon: "users",
  },
];
