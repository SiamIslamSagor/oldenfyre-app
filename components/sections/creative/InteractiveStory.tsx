"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";

/**
 * InteractiveStory - Cursor Tracking Story Section
 *
 * Awwwards-winning approach with:
 * - Magnetic cursor effects
 * - Parallax text layers with depth
 * - Interactive hotspots with magnetic pull
 * - Smooth reveal animations with stagger
 * - Glassmorphism design
 * - Responsive asymmetric layout
 * - Advanced scroll-triggered animations
 */

const storyPoints = [
  {
    id: 1,
    year: "1924",
    title: "The First Flame",
    description:
      "In a small Parisian workshop, our founder discovered the perfect balance between artistry and function. Every lighter became a story waiting to be told.",
    position: { x: 15, y: 25 },
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    year: "1960",
    title: "Golden Era",
    description:
      "Innovation met tradition. Our craftsmen pushed boundaries, creating pieces that would become treasured heirlooms passed through generations.",
    position: { x: 85, y: 45 },
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: 3,
    year: "2024",
    title: "Modern Legacy",
    description:
      "A century of fire, now reimagined. Two masterpieces that honor our heritage while embracing contemporary design.",
    position: { x: 50, y: 85 },
    color: "from-purple-500/20 to-pink-500/20",
  },
];

const floatingElements = [
  { size: "w-2 h-2", top: "15%", left: "10%", delay: 0, duration: 8 },
  { size: "w-3 h-3", top: "25%", left: "85%", delay: 1, duration: 10 },
  { size: "w-1 h-1", top: "45%", left: "5%", delay: 2, duration: 6 },
  { size: "w-2 h-2", top: "65%", left: "90%", delay: 0.5, duration: 9 },
  { size: "w-4 h-4", top: "80%", left: "15%", delay: 1.5, duration: 12 },
  { size: "w-2 h-2", top: "35%", left: "75%", delay: 2.5, duration: 7 },
];

export default function InteractiveStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [magneticPoint, setMagneticPoint] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95],
  );
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPosition({ x, y });
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      }
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Timeline line animation with glow
      gsap.from(".story-timeline", {
        scaleY: 0,
        duration: 2.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      // Timeline glow effect
      gsap.from(".story-timeline-glow", {
        opacity: 0,
        scaleY: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Point markers with elastic bounce
      gsap.from(".story-point-marker", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Floating elements
      gsap.to(".story-float-element", {
        y: i => -20 - (i % 3) * 10,
        x: i => (i % 2 === 0 ? 15 : -15),
        duration: i => 6 + (i % 3) * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Cursor follower with smooth trail
      gsap.to(".cursor-follower", {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Pulse rings around points
      gsap.to(".point-pulse", {
        scale: 1.5,
        opacity: 0,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background-secondary/5 via-background-secondary/10 to-background-secondary/5"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] overflow-hidden">
        <motion.div
          className="w-[200%] h-[200%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity, scale }}
        className="container px-4 md:px-6 relative z-10"
      >
        {/* Header */}
        <BottomToTopReveal className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-text-secondary/70 block mb-4 md:mb-6"
            >
              Our Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight"
            >
              A Century of{" "}
              <span className="bg-gradient-to-r from-text-primary via-text-secondary to-text-primary bg-clip-text text-transparent">
                Fire
              </span>
            </motion.h2>
          </motion.div>
        </BottomToTopReveal>

        {/* Interactive Map */}
        <motion.div
          style={{ y: parallaxY }}
          className="relative max-w-6xl mx-auto h-[500px] md:h-[700px]"
        >
          {/* Timeline with Glow */}
          <div className="story-timeline absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-text-primary/20 to-transparent -translate-x-1/2 origin-top" />
          <div className="story-timeline-glow absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent -translate-x-1/2 blur-sm origin-top" />

          {/* Story Points */}
          {storyPoints.map((point, index) => (
            <motion.div
              key={point.id}
              className="story-point-marker absolute cursor-pointer group z-20"
              style={{
                left: `${point.position.x}%`,
                top: `${point.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => {
                setActivePoint(point.id);
                setMagneticPoint(point.id);
              }}
              onMouseLeave={() => {
                setActivePoint(null);
                setMagneticPoint(null);
              }}
            >
              {/* Pulse Ring */}
              <motion.div
                className="point-pulse absolute inset-0 border border-text-primary/30 rounded-full"
                animate={{
                  scale: activePoint === point.id ? 2 : 1,
                  opacity: activePoint === point.id ? 0 : 0.6,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Outer Ring with Gradient */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${point.color}`}
                animate={{
                  scale: activePoint === point.id ? 1.8 : 1.2,
                  opacity: activePoint === point.id ? 0.3 : 0.1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {/* Inner Dot */}
              <motion.div
                className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-text-primary to-text-secondary rounded-full relative z-10 shadow-lg"
                animate={{
                  scale: activePoint === point.id ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Year Label */}
              <motion.div
                className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activePoint === point.id ? 1 : 0.6,
                  y: activePoint === point.id ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm md:text-base font-light tracking-[0.2em] text-text-secondary">
                  {point.year}
                </span>
              </motion.div>

              {/* Content Card */}
              <AnimatePresence mode="wait">
                {activePoint === point.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 30, rotateX: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 30, rotateX: -10 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`
                      absolute left-full ml-6 md:ml-10 top-1/2 -translate-y-1/2 
                      w-[280px] md:w-96 p-6 md:p-8 
                      bg-gradient-to-br from-background-primary/95 to-background-secondary/95 
                      backdrop-blur-xl border border-border-color/20 
                      shadow-2xl rounded-2xl
                      ${index % 2 === 0 ? "md:left-full md:ml-10" : "md:right-full md:mr-10 md:left-auto"}
                    `}
                    style={{
                      transformOrigin: "left center",
                    }}
                  >
                    {/* Gradient Border */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${point.color} opacity-30 blur-md -z-10`}
                    />

                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-xl md:text-2xl font-light tracking-tight mb-3 md:mb-4"
                    >
                      {point.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-sm md:text-base text-text-secondary/80 leading-relaxed font-light"
                    >
                      {point.description}
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-text-primary/30 to-transparent"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Magnetic Cursor Follower */}
          <motion.div
            className="cursor-follower pointer-events-none absolute z-30"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              x: useTransform(springX, v => v * 30),
              y: useTransform(springY, v => v * 30),
            }}
            animate={{
              scale: magneticPoint ? 2 : 1,
              opacity: magneticPoint ? 0.8 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-text-primary/30 rounded-full" />
            <div className="absolute inset-0 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-text-primary/10 to-transparent rounded-full blur-sm" />
          </motion.div>

          {/* Floating Decorative Elements */}
          {floatingElements.map((el, i) => (
            <motion.div
              key={i}
              className="story-float-element absolute bg-text-primary/10 rounded-full"
              style={{
                ...el,
                top: el.top,
                left: el.left,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16 md:mt-24"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <p className="text-xs md:text-sm text-text-secondary/60 font-light tracking-wider uppercase">
              Hover over the points to explore our history
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-secondary/20 to-transparent pointer-events-none" />
    </section>
  );
}
