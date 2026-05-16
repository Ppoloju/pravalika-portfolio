import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { socialLinks } from "@/constants/socials";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-gray-500">
            © {year} {portfolio.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <SocialButton
                key={social.label}
                href={social.href}
                label={social.label}
                icon={social.icon}
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
