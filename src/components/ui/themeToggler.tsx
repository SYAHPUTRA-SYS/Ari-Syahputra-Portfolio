"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type Theme = "light" | "dark";

export default function ThemeToggler() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggleDarkTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("globalTheme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleDarkTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {mounted && theme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}
