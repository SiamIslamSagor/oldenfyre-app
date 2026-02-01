"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";

/**
 * FloatingSpecs - 3D-like Floating User Reviews
 *
 * Awwwards-winning approach with:
 * - Advanced 3D perspective transforms
 * - Interactive tilt effects with mouse tracking
 * - Parallax depth layers
 * - Glassmorphism design
 * - Smooth hover transitions
 * - Animated counters
 * - Connection lines with animated flow
 * - Responsive asymmetric layout
 */

const specs = [
  {
    id: 1,
    title: "Michael R.",
    subtitle: "Verified Buyer",
    description:
      "The craftsmanship is absolutely stunning. Every detail speaks to the quality and dedication that went into creating this masterpiece. Worth every penny!",
    icon: "⭐",
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    glow: "shadow-amber-500/20",
    position: { x: -20, y: -15, z: 1 },
  },
  {
    id: 2,
    title: "Sarah L.",
    subtitle: "Verified Buyer",
    description:
      "I've owned many lighters over the years, but nothing compares to this. The ignition is flawless every single time, and it's become a conversation starter.",
    icon: "💫",
    color: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    glow: "shadow-blue-500/20",
    position: { x: 20, y: -8, z: 2 },
  },
  {
    id: 3,
    title: "James T.",
    subtitle: "Verified Buyer",
    description:
      "After 6 months of daily use, it still works perfectly. The fuel efficiency is incredible, and I haven't had to refill nearly as often as expected.",
    icon: "🔥",
    color: "from-red-500/20 via-pink-500/20 to-rose-500/20",
    glow: "shadow-red-500/20",
    position: { x: -15, y: 12, z: 3 },
  },
  {
    id: 4,
    title: "Emily K.",
    subtitle: "Verified Buyer",
    description:
      "The customer service was exceptional when I had a question. The lifetime warranty gives me complete confidence in my purchase. Truly premium quality.",
    icon: "💎",
    color: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    glow: "shadow-green-500/20",
    position: { x: 15, y: 18, z: 4 },
  },
];

const stats = [
  { value: 4.9, label: "Rating", suffix: "★" },
  { value: 2500, label: "Reviews", suffix: "+" },
  { value: 98, label: "Satisfied", suffix: "%" },
  { value: 100, label: "Authentic", suffix: "%" },
];

const decorativeOrbs = [
  {
    size: "w-32 h-32",
    top: "10%",
    left: "5%",
    color: "from-amber-500/5 to-orange-500/5",
    delay: 0,
  },
  {
    size: "w-48 h-48",
    top: "60%",
    left: "85%",
    color: "from-blue-500/5 to-indigo-500/5",
    delay: 1,
  },
  {
    size: "w-24 h-24",
    top: "80%",
    left: "15%",
    color: "from-purple-500/5 to-pink-500/5",
    delay: 2,
  },
];

export default function FloatingSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

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
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -3]);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);

      // Calculate tilt values for 3D effect
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = ((e.clientY - centerY) / centerY) * 10;
      const tiltY = ((e.clientX - centerX) / centerX) * 10;
      setTiltValues({ x: tiltX, y: tiltY });
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
      // Floating animation for specs
      gsap.to(".spec-float", {
        y: i => -25 - (i % 3) * 8,
        x: i => (i % 2 === 0 ? 12 : -12),
        duration: i => 5 + (i % 3) * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Scale pulse for cards
      gsap.to(".spec-pulse", {
        scale: 1.03,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Rotation for icons
      gsap.to(".spec-rotate", {
        rotate: i => (i % 2 === 0 ? 360 : -360),
        duration: 15,
        repeat: -1,
        ease: "none",
        stagger: 1,
      });

      // Connection line animation
      gsap.to(".connection-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Stats counter animation
      gsap.from(".stat-value", {
        innerText: 0,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background-primary via-background-secondary/5 to-background-primary"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] overflow-hidden">
        <motion.div
          className="w-[200%] h-[200%]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Decorative Gradient Orbs */}
      {decorativeOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl pointer-events-none ${orb.size} bg-gradient-to-br ${orb.color}`}
          style={{
            top: orb.top,
            left: orb.left,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      <motion.div
        style={{ opacity, scale }}
        className="container px-4 md:px-6 relative z-10"
      >
        {/* 3D Perspective Container */}
        <div
          className="relative max-w-6xl mx-auto"
          style={{ perspective: "1500px" }}
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
                Testimonials
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight"
              >
                Loved by{" "}
                <span className="bg-gradient-to-r from-text-primary via-text-secondary to-text-primary bg-clip-text text-transparent">
                  Thousands
                </span>
              </motion.h2>
            </motion.div>
          </BottomToTopReveal>

          {/* Floating Specs Grid */}
          <div className="relative h-[500px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
            {/* Connection Lines SVG */}
            <svg
              className="absolute inset-0 w-20 h-20 pointer-events-none z-0"
              style={{ overflow: "visible" }}
            >
              {specs.map((spec, i) => {
                if (i === specs.length - 1) return null;
                const nextSpec = specs[i + 1];
                const x1 = 50 + spec.position.x;
                const y1 = 50 + spec.position.y;
                const x2 = 50 + nextSpec.position.x;
                const y2 = 50 + nextSpec.position.y;
                return (
                  <motion.path
                    key={i}
                    d={`M ${x1}% ${y1}% Q ${(x1 + x2) / 2}% ${(y1 + y2) / 2 - 10}% ${x2}% ${y2}%`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border-color/20 connection-line"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    initial={{ strokeDashoffset: 1000 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Spec Cards */}
            {specs.map((spec, index) => (
              <motion.div
                key={spec.id}
                className="spec-float absolute cursor-pointer z-10 -mt-32"
                style={{
                  left: `calc(32% + ${spec.position.x}%)`,
                  top: `calc(32% + ${spec.position.y}%)`,
                  transform: "translate(-50%, -50%)",
                  zIndex: spec.position.z + (hoveredSpec === spec.id ? 10 : 0),
                }}
                initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onMouseEnter={() => setHoveredSpec(spec.id)}
                onMouseLeave={() => setHoveredSpec(null)}
                whileHover={{ scale: 1.05, z: 20 }}
              >
                {/* Card */}
                <motion.div
                  className={`
                    spec-pulse relative w-64 md:w-72 lg:w-80 p-6 md:p-8 
                    bg-gradient-to-br from-background-primary/90 to-background-secondary/90 
                    backdrop-blur-xl border border-border-color/20 
                    rounded-3xl shadow-2xl ${spec.glow}
                  `}
                  style={{
                    transform: `rotateY(${tiltValues.y * 3}deg) rotateX(${-tiltValues.x * 3}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    boxShadow:
                      hoveredSpec === spec.id
                        ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(var(--text-primary), 0.1)`
                        : `0 10px 40px -10px rgba(0, 0, 0, 0.1)`,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${spec.color} opacity-0 transition-opacity duration-500`}
                    style={{ opacity: hoveredSpec === spec.id ? 0.3 : 0 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="spec-relative w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center text-3xl md:text-4xl bg-gradient-to-br from-background-secondary/50 to-background-primary/50 rounded-2xl border border-border-color/10"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {spec.icon}
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl md:text-3xl font-light tracking-tight mb-1 md:mb-2"
                    animate={{
                      y: hoveredSpec === spec.id ? -2 : 0,
                    }}
                  >
                    {spec.title}
                  </motion.h3>
                  <motion.p
                    className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-text-secondary/70 mb-3 md:mb-4"
                    animate={{
                      y: hoveredSpec === spec.id ? -2 : 0,
                    }}
                  >
                    {spec.subtitle}
                  </motion.p>
                  <motion.p
                    className="text-sm md:text-base text-text-secondary/80 leading-relaxed font-light"
                    animate={{
                      y: hoveredSpec === spec.id ? -2 : 0,
                    }}
                  >
                    {spec.description}
                  </motion.p>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredSpec === spec.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Center Hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 border-2 border-border-color/20 rounded-full flex items-center justify-center spec-float backdrop-blur-sm bg-background-primary/30"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                className="text-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-4xl md:text-5xl">🔥</span>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-text-secondary/70 mt-2">
                  Oldenfyre
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.p
                  className="stat-value text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-2 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  {typeof stat.value === "number" ? stat.value : stat.value}
                  {stat.suffix}
                </motion.p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-secondary/70 group-hover:text-text-secondary/100 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-secondary/20 to-transparent pointer-events-none" />
    </section>
  );
}
