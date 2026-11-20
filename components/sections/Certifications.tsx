"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { certifications } from "@/constants/certifications";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ExternalLink, Clock, Award } from "lucide-react";
import type { CertificationItem } from "@/types/certification";

export function Certifications() {
  const newTabDescriptionId = useId();
  const certificationOrder: Record<string, number> = {
    "HackOps Bootcamp": 0,
    "GSSOC '26": 1,
    "HTML & CSS Certification": 2,
    "AI Skills Fest 2026": 3,
    "Internal Smart India Hackathon 2026": 4,
    "TNX-CODATHON 2K26 Finalist": 5,
    "TNX Codathon Prototype Development Challenge": 6,
    "Internship Certificate": 7,
    "System Administration and IT Infrastructure Services": 8,
    "Operating Systems and You: Becoming a Power User": 9,
    "The Bits and Bytes of Computer Networking": 10,
    "IT Security: Defense against the digital dark arts": 11,
    "Technical Support Fundamentals": 12,
    "React Basics": 13,
    "Python Basics": 14,
    "Foundations of Cybersecurity": 15,
    "Crash Course on Python": 16,
    "Introduction to Computers and Office Productivity Software": 17,
    "Create Informative Presentations with Google Slides": 18,
    "Writing Professional Emails in English": 19,
    "Everyday Excel Part 1": 20,
    "Quantitative Research Job Simulation": 21,
    "Software Engineering Job Simulation": 22,
    "Tata Job Simulation": 23,
    "Networking Basics": 24,
    "Exploring Networking with Cisco Packet Tracer": 25,
  };

  const orderedCertifications = [...certifications].sort(
    (a, b) =>
      (certificationOrder[a.name] ?? 99) - (certificationOrder[b.name] ?? 99)
  );

  return (
    <section id="certifications" className="py-16 sm:py-20 md:py-32 relative">
      <Container>
        <SectionHeading
          label="Certifications"
          title="Professional Certifications"
          description="Industry-recognized certifications and ongoing learning programs that validate my technical skills."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {orderedCertifications.map((cert: CertificationItem) => (
            <motion.div key={cert.id} variants={staggerItem} className="h-full">
              <GlowCard hover={true} className="h-full">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-theme bg-tint sm:h-10 sm:w-10">
                        <Award className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-base font-semibold leading-tight text-foreground sm:text-lg">
                          {cert.name}
                        </h3>
                        <p className="mt-0.5 break-words text-xs text-accent sm:mt-1 sm:text-sm">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    {cert.status === "In Progress" && (
                      <span className="flex items-center gap-1 rounded-full border border-border-theme bg-tint px-1.5 py-0.75 text-[10px] font-medium text-accent sm:gap-1.5 sm:px-2 sm:py-1 sm:text-xs">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        In Progress
                      </span>
                    )}
                  </div>

                  <p className="break-words text-xs leading-relaxed text-muted sm:text-sm">
                    {cert.description}
                  </p>

                  <div className="mt-auto border-t border-border-theme pt-3 sm:pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] text-muted sm:text-xs">
                        {cert.date}
                      </span>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View certificate for ${cert.name}`}
                          aria-describedby={`${newTabDescriptionId}-certificate-${cert.id}`}
                          className="group inline-flex min-h-12 items-center gap-1 text-[10px] font-medium text-accent transition-colors hover:underline sm:gap-1.5 sm:text-xs"
                        >
                          <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          View Certificate
                          <span
                            id={`${newTabDescriptionId}-certificate-${cert.id}`}
                            className="sr-only"
                          >
                            Opens in a new tab
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
