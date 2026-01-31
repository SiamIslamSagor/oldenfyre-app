"use client";

import { useState, useEffect } from "react";
import MagneticButton from "../animations/MagneticButton";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import Link from "next/link";

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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background-primary/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
      animate={{
        paddingBlock: scrolled ? 12 : 24,
      }}
    >
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <MagneticButton className="text-2xl font-bold tracking-wider text-text-primary px-4 py-2">
            OLDENFYRE
          </MagneticButton>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {["Collection", "Story", "Limited-edition", "Contact"].map(item => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors line-animation px-4 py-2"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="px-2">
            <ThemeToggle />
          </div>

          <button
            className="md:hidden text-text-primary p-2"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-background-primary/95 backdrop-blur-md py-12 px-6">
          {["Collection", "Story", "Craftsmanship", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-4 text-lg uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors px-4"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
