"use client";

import { useTheme } from "../ThemeContext";
import { motion, useIsPresent } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !theme) {
    return null; // Prevent SSR issues
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-[var(--border-color)] transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full bg-[var(--text-primary)] shadow-md"
        animate={{ left: theme === "light" ? "4px" : "calc(100% - 24px)" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <span className="sr-only">
        Toggle {theme === "light" ? "dark" : "light"} mode
      </span>
    </motion.button>
  );
}
