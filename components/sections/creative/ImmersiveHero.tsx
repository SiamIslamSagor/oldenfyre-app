"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import TextReveal from "@/components/animations/TextReveal";

/**
 * ImmersiveHero - Experimental Typography Hero
 *
 * Awwwards-winning approach with:
 * - Kinetic typography that responds to cursor
 * - Diagonal text arrangements
 * - Morphing shapes in background
 * - Scroll-triggered text distortions
 * - Immersive depth effects
 */
const heroWords = ["LIMITED", "EDITION", "TWO", "ONLY"];

export default function ImmersiveHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeWord, setActiveWord] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic text animation
      gsap.from(".kinetic-text", {
        y: 200,
        rotation: 15,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3,
      });

      // Morphing shapes
      gsap.to(".morph-shape", {
        borderRadius: "50%",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 2,
      });

      gsap.to(".morph-shape", {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 2,
      });

      // Floating particles
      gsap.to(".float-particle", {
        y: -100,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    }, sectionRef);

    // Auto-rotate words
    const interval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % heroWords.length);
    }, 3000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background-primary">
        {/* Morphing Shapes */}
        <div className="morph-shape absolute top-1/4 left-1/4 w-96 h-96 bg-text-primary/5 blur-3xl" />
        <div
          className="morph-shape absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-text-secondary/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="morph-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-text-primary/3 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const left = (i * 5) % 100;
        const top = (i * 7) % 100;
        const delay = (i * 0.15) % 3;
        return (
          <div
            key={i}
            className="float-particle absolute w-1 h-1 bg-text-primary/30 rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* Main Content */}
      <motion.div
        style={{ rotateX, rotateY, scale }}
        className="relative z-10 text-center px-4"
      >
        {/* Kinetic Typography */}
        <div className="relative h-[60vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWord}
              initial={{ opacity: 0, y: 100, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -100, rotate: 10 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute"
            >
              <h1 className="kinetic-text text-[15vw] md:text-[12vw] lg:text-[10vw] font-light tracking-tighter leading-none">
                {heroWords[activeWord]}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle with Distortion Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8"
        >
          <p className="text-lg md:text-xl text-text-secondary font-light tracking-widest uppercase">
            Oldenfyre × 2024
          </p>
        </motion.div>

        {/* Scroll Indicator with Morphing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 20, 0], scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-text-primary/30"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Cursor Follower */}
      <motion.div
        className="pointer-events-none fixed w-8 h-8 border border-text-primary/30 rounded-full z-50"
        style={{
          x: useTransform(mouseX, v => v * window.innerWidth),
          y: useTransform(mouseY, v => v * window.innerHeight),
        }}
      />

      {/* Diagonal Decorative Lines */}
      <div className="absolute top-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform -rotate-12" />
      <div className="absolute bottom-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform rotate-12" />
    </section>
  );
}
