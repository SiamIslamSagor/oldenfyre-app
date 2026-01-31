"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";

/**
 * MorphingGallery - Transition Effects Gallery
 *
 * Awwwards-winning approach with:
 * - Auto-playing morphing gallery
 * - Smooth transition effects
 * - Parallax image movements
 * - Text overlay animations
 * - Interactive navigation
 */
const galleryItems = [
  {
    id: 1,
    title: "The Spark",
    subtitle: "Where it begins",
    description: "Every masterpiece starts with a single spark of inspiration",
    icon: "✨",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    title: "The Craft",
    subtitle: "Hours of dedication",
    description: "47 hours of hand-polishing for perfect finish",
    icon: "🔨",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: 3,
    title: "The Flame",
    subtitle: "Eternal warmth",
    description: "Precision ignition system for reliable performance",
    icon: "🔥",
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    id: 4,
    title: "The Legacy",
    subtitle: "Passed down",
    description: "Built to last generations, not just years",
    icon: "🏛️",
    color: "from-purple-500/20 to-violet-500/20",
  },
];

export default function MorphingGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Morphing background shapes
      gsap.to(".morph-bg", {
        borderRadius: "50%",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".morph-bg", {
        rotate: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      // Floating elements
      gsap.to(".gallery-float", {
        y: -40,
        x: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });

      // Progress bar
      gsap.from(".gallery-progress", {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    // Auto-advance gallery
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex(prev => (prev + 1) % galleryItems.length);
      }
    }, 4000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div style={{ opacity, scale }} className="container px-4">
        {/* Background Morphing Shapes */}
        <div className="morph-bg absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br bg-text-primary/5 blur-3xl" />
        <div
          className="morph-bg absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl bg-text-secondary/5 blur-3xl"
          style={{ animationDelay: "3s" }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            The Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
            From Spark to Legacy
          </h2>
        </motion.div>

        {/* Gallery Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Display */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-background-secondary/10 border border-border-color/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 3 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-50`}
                />

                {/* Icon */}
                <motion.div
                  className="gallery-float relative z-10 text-9xl md:text-[12rem]"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {currentItem.icon}
                </motion.div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-background-primary via-background-primary/80 to-transparent">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-2"
                  >
                    {currentItem.subtitle}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-light tracking-tight mb-4"
                  >
                    {currentItem.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-lg text-text-secondary font-light max-w-2xl"
                  >
                    {currentItem.description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="h-1 bg-background-secondary/30 rounded-full overflow-hidden">
              <motion.div
                className="gallery-progress h-full bg-text-primary"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentIndex + 1) / galleryItems.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-6">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-text-primary scale-125"
                    : "bg-border-color/30 hover:bg-border-color/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="group flex items-center gap-3 px-6 py-3 border border-border-color/30 hover:border-border-color/60 transition-colors"
            >
              <motion.span
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              <span className="text-sm uppercase tracking-wider">Previous</span>
            </button>
            <button
              onClick={nextSlide}
              className="group flex items-center gap-3 px-6 py-3 border border-border-color/30 hover:border-border-color/60 transition-colors"
            >
              <span className="text-sm uppercase tracking-wider">Next</span>
              <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                →
              </motion.span>
            </button>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-[10%] w-2 h-2 bg-text-primary/30 rounded-full gallery-float" />
        <div
          className="absolute top-1/3 right-[15%] w-3 h-3 bg-text-secondary/30 rounded-full gallery-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-text-primary/40 rounded-full gallery-float"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>
    </section>
  );
}
