"use client";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-6 sm:p-8 shadow-2xl"
          >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-xl p-2.5 text-gray-400 transition-all duration-200 hover:text-white hover:bg-white/10 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {skillName}
                  </h3>
                </div>
                <p className="text-gray-400 pl-4">
                  {sources.length === 0
                    ? "No sources found for this skill."
                    : `Applied in ${sources.length} project${sources.length > 1 ? "s" : ""} and experience${sources.length > 1 ? "s" : ""}:`}
                </p>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {sources.map((source, index) => (
                  <motion.div
                    key={`${source.type}-${source.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(168,85,247,0.3)]"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "mt-1 rounded-xl p-3 shrink-0 transition-all duration-300 group-hover:scale-110",
                          source.type === "experience"
                            ? "bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 text-cyan-400"
                            : "bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-400"
                        )}
                      >
                        {source.type === "experience" ? (
                          <Briefcase className="h-5 w-5" />
                        ) : (
                          <FolderOpen className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors">
                            {source.title}
                          </h4>
                          <span
                            className={cn(
                              "text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0",
                              source.type === "experience"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-purple-500/20 text-purple-400"
                            )}
                          >
                            {source.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {source.subtitle}
                        </p>
                        {source.description && (
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {source.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {sources.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <ExternalLink className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500">
                    This skill was developed through self-learning and practice.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Press ESC or click outside to close
                </button>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
