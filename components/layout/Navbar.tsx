"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/constants/navigation";
import { portfolio } from "@/data/portfolio";
import { GradientButton } from "@/components/ui/GradientButton";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = "mobile-navigation-menu";
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

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
          className="theme-surface mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-6 sm:py-3.5"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="inline-flex min-h-12 items-center text-base font-semibold tracking-tight text-foreground sm:text-lg"
          >
            {portfolio.name}
            <span className="text-accent">.</span>
          </Link>

          <ul className="hidden items-center gap-6 sm:gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-xs font-medium text-muted transition-colors hover:text-accent sm:text-sm"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <GradientButton href={portfolio.resumePath} external>Resume</GradientButton>
            </div>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border-theme bg-tint text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        id={mobileMenuId}
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
        triggerRef={menuButtonRef}
      />
    </>
  );
}
