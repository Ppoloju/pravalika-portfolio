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
    "Internship Certificate": 4,
    "System Administration and IT Infrastructure Services": 5,
    "Operating Systems and You: Becoming a Power User": 6,
    "The Bits and Bytes of Computer Networking": 7,
    "IT Security: Defense against the digital dark arts": 8,
    "Technical Support Fundamentals": 9,
    "React Basics": 10,
    "Python Basics": 11,
    "Foundations of Cybersecurity": 12,
    "Crash Course on Python": 13,
    "Introduction to Computers and Office Productivity Software": 14,
    "Create Informative Presentations with Google Slides": 15,
    "Writing Professional Emails in English": 16,
    "Everyday Excel Part 1": 17,
    "Quantitative Research Job Simulation": 18,
    "Software Engineering Job Simulation": 19,
    "Tata Job Simulation": 20,
    "Networking Basics": 21,
    "Exploring Networking with Cisco Packet Tracer": 22,
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
            <motion.div key={cert.id} variants={staggerItem}>
              <GlowCard hover={true} className="h-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                          {cert.name}
                        </h3>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-purple-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    {cert.status === "In Progress" && (
                      <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-cyan-400 bg-cyan-400/10 px-1.5 sm:px-2 py-0.75 sm:py-1 rounded-full border border-cyan-400/20">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        In Progress
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {cert.date}
                      </span>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View certificate for ${cert.name}`}
                          aria-describedby={`${newTabDescriptionId}-certificate-${cert.id}`}
                          className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors group"
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
