"use client";

import { useId } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { experiences } from "@/constants/experience";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Experience() {
  const newTabDescriptionId = useId();

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-32">
      <Container>
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="Internships, volunteering, club membership, and leadership roles that shape my growth as an aspiring developer."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative mx-auto max-w-3xl"
        >
          <motion.div
            className="absolute bottom-2 left-[7px] top-2 w-px bg-border-theme md:left-[11px]"
            aria-hidden
          />

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className="relative pl-8 sm:pl-10 md:pl-14"
              >
                <motion.div
                  className="absolute left-0 top-5 sm:top-6 flex h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] md:h-[22px] md:w-[22px] items-center justify-center"
                  aria-hidden
                >
                  <span className="relative h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
                </motion.div>

                <GlowCard hover={index === 0}>
                  <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-semibold text-foreground sm:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="mt-0.5 break-words text-sm text-accent sm:mt-1 sm:text-base">{exp.company}</p>
                      {exp.location && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted sm:mt-2 sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden />
                          {exp.location}
                        </p>
                      )}
                    </div>
                    {exp.duration && (
                      <span className="shrink-0 text-xs text-muted sm:text-sm">
                        {exp.duration}
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                    {exp.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 break-words text-sm leading-relaxed text-muted sm:gap-3 sm:text-base"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent sm:mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border-theme bg-tint px-2 py-0.75 text-[10px] font-medium text-muted transition-colors hover:bg-surface sm:px-2.5 sm:py-1 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {exp.certificateLink && exp.certificateLink !== "#" && (
                    <div className="mt-4 border-t border-border-theme pt-4 sm:mt-5 sm:pt-5">
                      <a
                        href={exp.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View certificate for ${exp.company} ${exp.role}`}
                        aria-describedby={`${newTabDescriptionId}-experience-${exp.id}`}
                        className="group inline-flex min-h-12 items-center gap-1.5 font-medium text-accent transition-colors hover:underline sm:gap-2 sm:text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        View Certificate
                        <span
                          id={`${newTabDescriptionId}-experience-${exp.id}`}
                          className="sr-only"
                        >
                          Opens in a new tab
                        </span>
                      </a>
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
