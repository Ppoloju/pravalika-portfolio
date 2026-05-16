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
    const mailto = `mailto:${portfolio.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Get In Touch"
          title="Let's Build Something Great"
          description="Open to full-time roles, internships, and collaboration. Reach out — I'd love to connect."
        />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={defaultTransition}
          >
            <GlowCard hover={false} className="h-full">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Connect With Me
              </h3>
              <p className="mt-3 text-base text-gray-400 leading-relaxed">
                {portfolio.location}
              </p>
              <p className="mt-2 text-base text-gray-400">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  {portfolio.email}
                </a>
              </p>

              <div className="mt-8 flex gap-3">
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-500"
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
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-500"
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
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm uppercase tracking-[0.2em] text-gray-500"
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
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Tell me about your opportunity..."
                  />
                </div>
                <GradientButton type="submit" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" />
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
