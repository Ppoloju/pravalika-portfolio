"use client";

import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { certificates } from "@/constants/certificates";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Certificates() {
  return (
    <section id="certificates" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Credentials"
          title="Certifications"
          description="Continuous learning through industry-recognized programs and hands-on certifications."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-8 sm:grid-cols-2"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={staggerItem}>
              <GlowCard className="flex h-full flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
                  <Award className="h-6 w-6 text-purple-400" aria-hidden />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{cert.issuer}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-cyan-400/80">
                  {cert.year}
                </p>
                {cert.credentialUrl && (
                  <div className="mt-6">
                    <OutlineButton
                      href={cert.credentialUrl}
                      external
                      className="!px-4 !py-2 text-xs"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </OutlineButton>
                  </div>
                )}
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
