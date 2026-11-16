"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const themeChangeEvent = "portfolio-theme-change";

function subscribeToThemeChanges(callback: () => void) {
  window.addEventListener(themeChangeEvent, callback);
  return () => window.removeEventListener(themeChangeEvent, callback);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    () => "light"
  );

  const toggleTheme = () => {
    const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event(themeChangeEvent));

    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.warn("Could not save the color theme preference.", error);
    }
  };

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:text-white"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
