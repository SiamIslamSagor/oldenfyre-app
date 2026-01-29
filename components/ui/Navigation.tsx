"use client";

import { useState, useEffect } from "react";
import MagneticButton from "../animations/MagneticButton";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--background-primary)]/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <MagneticButton className="text-2xl font-bold tracking-wider text-[var(--text-primary)]">
          OLDENFYRE
        </MagneticButton>

        <div className="hidden md:flex items-center space-x-12">
          {["Collection", "Story", "Craftsmanship", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors line-animation"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          <button
            className="md:hidden text-[var(--text-primary)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background-primary)]/95 backdrop-blur-md py-8 px-6">
          {["Collection", "Story", "Craftsmanship", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-4 text-lg uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
