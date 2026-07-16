"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, FolderOpen } from "lucide-react";
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">
                {skillName}
              </h3>
              <p className="text-gray-400 mb-6">
                {sources.length === 0
                  ? "No sources found for this skill."
                  : `Learned through ${sources.length} source${
                      sources.length > 1 ? "s" : ""
                    }:`}
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {sources.map((source) => (
                  <motion.div
                    key={`${source.type}-${source.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-1 rounded-lg p-2",
                          source.type === "experience"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-purple-500/20 text-purple-400"
                        )}
                      >
                        {source.type === "experience" ? (
                          <Briefcase className="h-4 w-4" />
                        ) : (
                          <FolderOpen className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {source.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {source.subtitle}
                        </p>
                        {source.description && (
                          <p className="text-sm text-gray-500 mt-2">
                            {source.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {sources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  This skill was developed through self-learning and practice.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
