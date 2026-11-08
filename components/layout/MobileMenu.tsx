"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "@/constants/navigation";
import { portfolio } from "@/data/portfolio";
import { GradientButton } from "@/components/ui/GradientButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(100%,280px)] sm:w-[min(100%,320px)] flex-col border-l border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-5 sm:p-6 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold text-white">
                {portfolio.name}
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-8 sm:mt-10 flex flex-col gap-5 sm:gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex min-h-12 items-center text-base font-medium text-gray-300 transition-colors hover:text-white sm:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 sm:pt-8">
              <GradientButton href={portfolio.resumePath} external className="w-full">
                Resume
              </GradientButton>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
