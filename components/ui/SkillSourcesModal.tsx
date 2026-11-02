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
            className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md"
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
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 shadow-2xl outline-none sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={`Close ${skillName} sources`}
              className="absolute right-4 top-4 rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-purple-500" />
                <h3
                  id="skill-sources-title"
                  className="text-3xl font-bold tracking-tight text-white"
                >
                  {skillName}
                </h3>
              </div>
              <p id="skill-sources-description" className="pl-4 text-gray-400">
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
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.3)]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "mt-1 shrink-0 rounded-xl p-3 transition-all duration-300 group-hover:scale-110",
                        source.type === "experience"
                          ? "bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 text-cyan-400"
                          : "bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-400"
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
                        <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                          {source.title}
                        </h4>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider",
                            source.type === "experience"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-purple-500/20 text-purple-400"
                          )}
                        >
                          {source.type}
                        </span>
                      </div>
                      <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                        {source.subtitle}
                      </p>
                      {source.description && (
                        <p className="text-sm leading-relaxed text-gray-500">
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
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <ExternalLink className="h-6 w-6 text-gray-500" aria-hidden />
                </div>
                <p className="text-gray-500">
                  This skill was developed through self-learning and practice.
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-4 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-400 transition-colors hover:text-white"
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
