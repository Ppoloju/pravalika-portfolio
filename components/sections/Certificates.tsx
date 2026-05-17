"use client";

import { Award, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { OutlineButton } from "@/components/ui/OutlineButton";
import {
  inProgressCertificates,
  completedCertificates,
} from "@/constants/certificates";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types/certificate";

function CertificateCard({ cert }: { cert: Certificate }) {
  const isInProgress = cert.status === "in-progress";
  const viewUrl = cert.file ?? cert.credentialUrl;

  return (
    <GlowCard className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border",
            isInProgress
              ? "border-amber-500/30 bg-amber-500/10"
              : "border-purple-500/30 bg-purple-500/10"
          )}
        >
          {isInProgress ? (
            <Clock className="h-6 w-6 text-amber-400" aria-hidden />
          ) : (
            <Award className="h-6 w-6 text-purple-400" aria-hidden />
          )}
        </div>
        {isInProgress && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            In Progress
          </span>
        )}
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-white">
        {cert.title}
      </h3>
      <p className="mt-2 text-purple-400">{cert.issuer}</p>
      <p className="mt-1 text-sm text-gray-500">{cert.year}</p>

      <p className="mt-4 flex-1 text-base text-gray-400 leading-relaxed">
        {cert.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-gray-400"
          >
            {skill}
          </span>
        ))}
      </div>

      {viewUrl && !isInProgress && (
        <div className="mt-6">
          <OutlineButton href={viewUrl} external className="!px-4 !py-2 text-xs">
            <ExternalLink className="h-4 w-4" />
            View Certificate
          </OutlineButton>
        </div>
      )}

      {isInProgress && (
        <p className="mt-6 text-sm text-amber-400/80">
          Actively completing — certificate will be added upon completion.
        </p>
      )}
    </GlowCard>
  );
}

function CertificateGrid({
  items,
  idPrefix,
}: {
  items: Certificate[];
  idPrefix: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="grid gap-6 md:gap-8 sm:grid-cols-2"
    >
      {items.map((cert) => (
        <motion.div key={`${idPrefix}-${cert.id}`} variants={staggerItem}>
          <CertificateCard cert={cert} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Certificates() {
  return (
    <section id="certificates" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Credentials"
          title="Certifications & Learning"
          description="Industry-recognized certifications and ongoing programs that strengthen my technical foundation."
        />

        {inProgressCertificates.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerItem}
            className="mb-10 md:mb-12"
          >
            <h3 className="mb-6 text-sm uppercase tracking-[0.2em] text-amber-400">
              In Progress
            </h3>
            <CertificateGrid items={inProgressCertificates} idPrefix="progress" />
          </motion.div>
        )}

        <h3 className="mb-6 text-sm uppercase tracking-[0.2em] text-cyan-400">
          Completed ({completedCertificates.length})
        </h3>
        <CertificateGrid items={completedCertificates} idPrefix="done" />
      </Container>
    </section>
  );
}
