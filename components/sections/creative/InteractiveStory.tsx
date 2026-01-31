"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";

/**
 * InteractiveStory - Cursor Tracking Story Section
 *
 * Awwwards-winning approach with:
 * - Cursor-following elements
 * - Parallax text layers
 * - Interactive hotspots
 * - Magnetic content areas
 * - Smooth reveal animations
 */
const storyPoints = [
  {
    id: 1,
    year: "1924",
    title: "The First Flame",
    description:
      "In a small Parisian workshop, our founder discovered the perfect balance between artistry and function. Every lighter became a story waiting to be told.",
    position: { x: 20, y: 30 },
  },
  {
    id: 2,
    year: "1960",
    title: "Golden Era",
    description:
      "Innovation met tradition. Our craftsmen pushed boundaries, creating pieces that would become treasured heirlooms passed through generations.",
    position: { x: 80, y: 50 },
  },
  {
    id: 3,
    year: "2024",
    title: "Modern Legacy",
    description:
      "A century of fire, now reimagined. Two masterpieces that honor our heritage while embracing contemporary design.",
    position: { x: 50, y: 80 },
  },
];

export default function InteractiveStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPosition({ x, y });
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.from(".story-timeline", {
        height: 0,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Point markers
      gsap.from(".story-point", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Floating elements
      gsap.to(".story-float", {
        y: -50,
        x: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });

      // Cursor follower
      gsap.to(".cursor-follower", {
        x: "+=50",
        y: "+=30",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-secondary/10"
    >
      <motion.div style={{ opacity }} className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
            A Century of Fire
          </h2>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
                linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
              `,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* Timeline */}
          <div className="story-timeline absolute left-1/2 top-0 bottom-0 w-px bg-text-primary/20 -translate-x-1/2" />

          {/* Story Points */}
          {storyPoints.map((point, index) => (
            <div
              key={point.id}
              className="story-point absolute cursor-pointer group"
              style={{
                left: `${point.position.x}%`,
                top: `${point.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActivePoint(point.id)}
              onMouseLeave={() => setActivePoint(null)}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-text-primary/30 rounded-full"
                animate={{
                  scale: activePoint === point.id ? 1.5 : 1,
                  borderColor:
                    activePoint === point.id
                      ? "var(--text-primary)"
                      : "rgba(var(--text-primary), 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner Dot */}
              <div className="w-4 h-4 bg-text-primary rounded-full relative z-10" />

              {/* Year Label */}
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activePoint === point.id ? 1 : 0.5,
                  y: activePoint === point.id ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-light tracking-wider text-text-secondary">
                  {point.year}
                </span>
              </motion.div>

              {/* Content Card */}
              <AnimatePresence>
                {activePoint === point.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-full ml-8 top-1/2 -translate-y-1/2 w-80 p-6 bg-background-primary border border-border-color/30 shadow-xl"
                    style={{
                      transformOrigin: "left center",
                    }}
                  >
                    <h3 className="text-2xl font-light tracking-tight mb-3">
                      {point.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-light">
                      {point.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Cursor Follower */}
          <motion.div
            className="cursor-follower pointer-events-none absolute w-8 h-8 border border-text-primary/30 rounded-full"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              x: useTransform(springX, v => v * 20),
              y: useTransform(springY, v => v * 20),
            }}
          />

          {/* Floating Decorative Elements */}
          <div className="story-float absolute top-[20%] left-[15%] w-3 h-3 bg-text-primary/20 rounded-full" />
          <div
            className="story-float absolute top-[60%] right-[20%] w-2 h-2 bg-text-secondary/30 rounded-full"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="story-float absolute bottom-[30%] left-[30%] w-4 h-4 bg-text-primary/10 rounded-full"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-24"
        >
          <p className="text-sm text-text-secondary font-light">
            Hover over the points to explore our history
          </p>
        </motion.div>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-text-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
