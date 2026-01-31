"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";

/**
 * LimitedHero - Cinematic Hero Section
 *
 * Purpose: Establish the exclusive, limited edition nature of the collection
 * with bold, cinematic typography and subtle motion effects.
 *
 * Design Approach:
 * - Asymmetrical layout with oversized typography
 * - Slow, cinematic entrance animations
 * - Minimalist composition with strategic negative space
 * - Fire/ember-inspired subtle animations
 */
export default function LimitedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic line reveal
      gsap.from(".limited-hero-line", {
        scaleX: 0,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.15,
      });

      // Subtle floating animation for decorative elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Ember pulse effect
      gsap.to(".ember-glow", {
        opacity: 0.6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-background-primary" />
      <div className="noise-overlay" />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-primary/50" />

      {/* Decorative Ambient Elements */}
      <div className="absolute top-32 right-[15%] w-64 h-64 rounded-full bg-text-primary/5 blur-3xl ember-glow" />
      <div
        className="absolute bottom-40 left-[10%] w-48 h-48 rounded-full bg-text-primary/5 blur-3xl ember-glow"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Decorative Lines */}
      <div className="absolute top-40 left-8 w-px h-40 bg-border-color limited-hero-line" />
      <div className="absolute bottom-32 right-12 w-40 h-px bg-border-color limited-hero-line" />

      {/* Floating Particles */}
      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-text-primary/40 rounded-full floating-element" />
      <div
        className="absolute top-1/3 left-1/3 w-2 h-2 bg-text-secondary/30 rounded-full floating-element"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-text-primary/50 rounded-full floating-element"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content - Asymmetrical Layout */}
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - Primary Typography */}
          <div className="lg:col-span-8">
            {/* Limited Edition Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-border-color/50">
                <div className="w-2 h-2 bg-text-primary rounded-full ember-glow" />
                <span className="text-xs uppercase tracking-[0.35em] text-text-secondary">
                  Limited Edition
                </span>
                <div className="w-2 h-2 bg-text-primary rounded-full ember-glow" />
              </div>
            </motion.div>

            {/* Main Headline - Oversized Typography */}
            <div className="mb-8">
              <TextReveal
                delay={0.5}
                className="block text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9] text-text-primary"
              >
                TWO
              </TextReveal>
              <TextReveal
                delay={0.7}
                className="block text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter leading-[0.9] text-text-secondary"
              >
                ONLY
              </TextReveal>
            </div>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="max-w-xl mb-12"
            >
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
                Two masterpieces. One collection. Forever exclusive.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton className="px-10 py-4 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors">
                Discover the Collection
              </MagneticButton>
              <MagneticButton className="px-10 py-4 border border-border-color text-text-primary uppercase tracking-[0.2em] text-sm hover:bg-background-secondary transition-colors">
                View Specifications
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="relative"
            >
              {/* Placeholder for Product Image */}
              <div className="aspect-[3/4] bg-background-secondary/30 rounded-sm overflow-hidden border border-border-color/30">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 border-2 border-border-color rounded-full flex items-center justify-center">
                      <span className="text-4xl">🔥</span>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-text-secondary">
                      Product Visual
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="absolute -bottom-4 -left-4 bg-background-primary border border-border-color px-6 py-3"
              >
                <p className="text-xs uppercase tracking-widest text-text-secondary">
                  2024 Collection
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-border-color"
          />
        </div>
      </motion.div>

      {/* Side Navigation Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-24 bg-border-color/50" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary -rotate-90 origin-center whitespace-nowrap">
          Scroll
        </span>
        <div className="w-px h-24 bg-border-color/50" />
      </motion.div>
    </section>
  );
}
