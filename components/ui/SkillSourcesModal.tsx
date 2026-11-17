"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, FolderOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillSource } from "@/lib/skillSources";

interface SkillSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  sources: SkillSource[];
}

export function SkillSourcesModal({
  isOpen,
  onClose,
  skillName,
  sources,
}: SkillSourcesModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label="Close skill sources dialog"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
            className="theme-overlay absolute inset-0 cursor-default"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-sources-title"
            aria-describedby="skill-sources-description"
            tabIndex={-1}
            className="theme-surface relative z-10 w-full max-w-2xl rounded-2xl border p-5 shadow-xl outline-none sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${skillName} sources`}
              className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-theme bg-tint text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-accent" />
                <h3
                  id="skill-sources-title"
                  className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {skillName}
                </h3>
              </div>
              <p id="skill-sources-description" className="pl-4 text-muted">
                {sources.length === 0
                  ? "No sources found for this skill."
                  : `Applied in ${sources.length} project${sources.length > 1 ? "s" : ""} and experience${sources.length > 1 ? "s" : ""}:`}
              </p>
            </div>

            <div className="custom-scrollbar max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              {sources.map((source, index) => (
                <motion.div
                  key={`${source.type}-${source.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="theme-surface group rounded-xl border p-4 transition-colors duration-200 hover:bg-tint sm:p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-1 shrink-0 rounded-xl p-3 transition-all duration-300 group-hover:scale-110",
                        source.type === "experience"
                          ? "bg-tint text-accent"
                          : "bg-tint text-accent"
                      )}
                    >
                      {source.type === "experience" ? (
                        <Briefcase className="h-5 w-5" aria-hidden />
                      ) : (
                        <FolderOpen className="h-5 w-5" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="text-lg font-semibold text-foreground">
                          {source.title}
                        </h4>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider",
                            source.type === "experience"
                              ? "bg-tint text-accent"
                              : "bg-tint text-accent"
                          )}
                        >
                          {source.type}
                        </span>
                      </div>
                      <p className="mb-2 line-clamp-2 text-sm text-muted">
                        {source.subtitle}
                      </p>
                      {source.description && (
                        <p className="text-sm leading-relaxed text-muted">
                          {source.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {sources.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tint">
                  <ExternalLink className="h-6 w-6 text-muted" aria-hidden />
                </div>
                <p className="text-muted">
                  This skill was developed through self-learning and practice.
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-border-theme pt-4 text-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border-theme bg-tint px-4 text-sm text-foreground transition-colors hover:bg-surface"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
