"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/constants/navigation";
import { portfolio } from "@/data/portfolio";
import { GradientButton } from "@/components/ui/GradientButton";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-6 sm:pt-4",
          scrolled
            ? "drop-shadow-lg drop-shadow-black/20"
            : ""
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0b0d14]/80 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-xl sm:px-6 sm:py-3.5"
          aria-label="Main navigation"
        >
          <Link
            href="#"
            className="text-base sm:text-lg font-semibold tracking-tight text-white"
          >
            {portfolio.name}
            <span className="text-purple-400">.</span>
          </Link>

          <ul className="hidden items-center gap-6 sm:gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-xs sm:text-sm font-medium text-gray-400 transition-colors hover:text-cyan-200"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <GradientButton href={portfolio.resumePath} external>Resume</GradientButton>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 sm:p-2.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </nav>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
