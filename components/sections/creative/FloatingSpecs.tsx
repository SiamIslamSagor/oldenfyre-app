"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";

/**
 * FloatingSpecs - 3D-like Floating Specifications
 *
 * Awwwards-winning approach with:
 * - 3D perspective transforms
 * - Floating card animations
 * - Interactive tilt effects
 * - Parallax depth layers
 * - Smooth hover transitions
 */
const specs = [
  {
    id: 1,
    title: "47 Hours",
    subtitle: "Hand Polish",
    description:
      "Each piece undergoes 47 hours of meticulous hand polishing by master craftsmen.",
    icon: "✨",
    color: "from-amber-500/10 to-orange-500/10",
    position: { x: -15, y: -10, z: 1 },
  },
  {
    id: 2,
    title: "Swiss Made",
    subtitle: "Ignition System",
    description:
      "Precision-engineered piezoelectric ignition system, guaranteed for life.",
    icon: "⚙️",
    color: "from-blue-500/10 to-indigo-500/10",
    position: { x: 15, y: -5, z: 2 },
  },
  {
    id: 3,
    title: "3,000+",
    subtitle: "Ignitions",
    description:
      "Advanced fuel delivery system providing over 3,000 ignitions per refill.",
    icon: "🔥",
    color: "from-red-500/10 to-pink-500/10",
    position: { x: -10, y: 10, z: 3 },
  },
  {
    id: 4,
    title: "Lifetime",
    subtitle: "Warranty",
    description:
      "Comprehensive coverage for the lifetime of the original owner.",
    icon: "🛡️",
    color: "from-green-500/10 to-emerald-500/10",
    position: { x: 10, y: 15, z: 4 },
  },
];

export default function FloatingSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredSpec, setHoveredSpec] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(".spec-float", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Scale pulse
      gsap.to(".spec-pulse", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Rotation
      gsap.to(".spec-rotate", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-primary"
    >
      <motion.div
        style={{ opacity, rotateX, rotateY }}
        className="container px-4"
      >
        {/* 3D Perspective Container */}
        <div
          className="relative max-w-6xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
              Specifications
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
              Built to Perfection
            </h2>
          </motion.div>

          {/* Floating Specs Grid */}
          <div className="relative h-[600px]">
            {specs.map(spec => (
              <motion.div
                key={spec.id}
                className="spec-float absolute cursor-pointer"
                style={{
                  left: `calc(50% + ${spec.position.x}%)`,
                  top: `calc(50% + ${spec.position.y}%)`,
                  transform: "translate(-50%, -50%)",
                  zIndex: spec.position.z,
                }}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: spec.id * 0.1 }}
                onMouseEnter={() => setHoveredSpec(spec.id)}
                onMouseLeave={() => setHoveredSpec(null)}
                whileHover={{ scale: 1.1, z: 10 }}
              >
                {/* Card */}
                <div
                  className={`relative w-64 p-6 bg-gradient-to-br ${spec.color} backdrop-blur-sm border border-border-color/30 rounded-2xl spec-pulse`}
                  style={{
                    transform: `rotateY(${mouseX.get() * 10}deg) rotateX(${-mouseY.get() * 10}deg)`,
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="spec-rotate w-12 h-12 mb-4 flex items-center justify-center text-3xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {spec.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-light tracking-tight mb-1">
                    {spec.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-3">
                    {spec.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {spec.description}
                  </p>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 bg-text-primary/5 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredSpec === spec.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Connection Lines */}
                {spec.id < specs.length && (
                  <div className="absolute top-1/2 left-full w-px h-0 bg-text-primary/20" />
                )}
              </motion.div>
            ))}

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-border-color/20 rounded-full flex items-center justify-center spec-float">
              <div className="text-center">
                <span className="text-4xl">🔥</span>
                <p className="text-xs uppercase tracking-widest text-text-secondary mt-2">
                  Oldenfyre
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "100", label: "Years" },
              { value: "50", label: "Pieces" },
              { value: "2", label: "Designs" },
              { value: "∞", label: "Quality" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-border-color/10 rounded-full spec-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 border border-border-color/10 rounded-full spec-float"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-text-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
