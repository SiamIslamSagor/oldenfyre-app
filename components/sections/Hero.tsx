"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import TextReveal from "../animations/TextReveal";
import MagneticButton from "../animations/MagneticButton";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-primary)]" />
      <div className="noise-overlay" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--border-color)] rounded-full hero-line" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[var(--border-color)] rounded-full hero-line" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[var(--text-primary)] rounded-full hero-line" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[var(--text-secondary)] rounded-full hero-line" />

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
            Est. 1924
          </span>
        </motion.div>

        <TextReveal
          delay={0.8}
          className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-8"
        >
          OLDENFYRE
        </TextReveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="max-w-2xl mx-auto mb-12 px-4"
        >
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            Crafted with passion, ignited with nostalgia. Discover our
            collection of premium vintage lighters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton className="px-12 py-4 bg-[var(--text-primary)] text-[var(--background-primary)] uppercase tracking-widest text-sm hover:bg-[var(--text-secondary)] transition-colors">
            Explore Collection
          </MagneticButton>
          <MagneticButton className="px-12 py-4 border border-[var(--border-color)] text-[var(--text-primary)] uppercase tracking-widest text-sm hover:bg-[var(--background-secondary)] transition-colors">
            Our Story
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
            Scroll
          </span>
          <motion.svg
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            width="24"
            height="60"
            viewBox="0 0 24 60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="mt-2 animate-bounce"
          >
            <line
              x1="12"
              y1="4"
              x2="12"
              y2="44"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />

            <polyline
              points="6,38 12,44 18,38"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}
