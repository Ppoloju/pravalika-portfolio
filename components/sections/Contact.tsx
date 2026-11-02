"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { SocialButton } from "@/components/ui/SocialButton";
import { socialLinks } from "@/constants/socials";
import { portfolio } from "@/data/portfolio";
import { fadeUp, defaultTransition } from "@/lib/animations";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      subject: `Portfolio Contact from ${formState.name}`,
      body: `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    });
    window.location.href = `mailto:${portfolio.email}?${params.toString()}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32">
      <Container>
        <SectionHeading
          label="Get In Touch"
          title="Let's Build Something Great"
          description="Open to full-time roles, internships, and collaboration. Reach out — I'd love to connect."
        />

        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={defaultTransition}
          >
            <GlowCard hover={false} className="h-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                Connect With Me
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
                {portfolio.location}
              </p>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-400">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  {portfolio.email}
                </a>
              </p>

              <div className="mt-6 sm:mt-8 flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <SocialButton
                    key={social.label}
                    href={social.href}
                    label={social.label}
                    icon={social.icon}
                  />
                ))}
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.15 }}
          >
            <GlowCard hover={false}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 sm:mb-2 block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 sm:mb-2 block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 sm:mb-2 block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Tell me about your opportunity..."
                  />
                </div>
                <GradientButton type="submit" className="w-full sm:w-auto">
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Send Message
                </GradientButton>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
