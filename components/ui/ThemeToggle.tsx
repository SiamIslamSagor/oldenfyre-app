"use client";

import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after client-side mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted || !theme) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-border-color transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full bg-text-primary shadow-md"
        animate={{ left: theme === "light" ? "4px" : "calc(100% - 24px)" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <span className="sr-only">
        Toggle {theme === "light" ? "dark" : "light"} mode
      </span>
    </motion.button>
  );
}
