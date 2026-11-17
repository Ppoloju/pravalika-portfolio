import { Container } from "@/components/ui/Container";
import { SocialButton } from "@/components/ui/SocialButton";
import { socialLinks } from "@/constants/socials";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-theme py-8 sm:py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row">
          <p className="text-xs text-muted sm:text-sm">
            © {year} {portfolio.name}. All rights reserved. Built with passion.
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
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
