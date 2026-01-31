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
import MagneticButton from "@/components/animations/MagneticButton";

/**
 * SplitReveal - Modern Product Reveal Section
 *
 * Awwwards-winning approach with:
 * - Staggered product reveals
 * - Magnetic hover effects
 * - 3D card transforms
 * - Smooth scroll animations
 * - Interactive state management
 */
const products = [
  {
    id: "obsidian",
    name: "Obsidian Noir",
    edition: "001/050",
    price: "$2,400",
    description: "Volcanic glass meets timeless design",
    color: "#1a1a1a",
    icon: "⚫",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "ember",
    name: "Ember Glow",
    edition: "001/050",
    price: "$2,800",
    description: "Copper-infused with eternal warmth",
    color: "#b87333",
    icon: "🔥",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=500&auto=format&fit=crop&q=80",
  },
];

export default function SplitReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "stack">("split");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.9, 1, 1, 0.95],
  );

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card reveal
      gsap.from(".product-card", {
        y: 150,
        opacity: 0,
        rotationX: -15,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Magnetic line animation
      gsap.from(".magnetic-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Floating elements
      gsap.to(".float-element", {
        y: -50,
        x: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8,
      });

      // Glow pulse
      gsap.to(".glow-pulse", {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      // 3D rotation
      gsap.to(".rotate-3d", {
        rotateY: 360,
        rotateX: 10,
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
      <motion.div style={{ opacity, scale }} className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            The Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
            Two Masterpieces
          </h2>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setViewMode("split")}
            className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-300 ${
              viewMode === "split"
                ? "bg-text-primary text-background-primary"
                : "bg-background-secondary/30 text-text-secondary hover:bg-background-secondary/50"
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode("stack")}
            className={`px-6 py-3 text-xs uppercase tracking-wider transition-all duration-300 ${
              viewMode === "stack"
                ? "bg-text-primary text-background-primary"
                : "bg-background-secondary/30 text-text-secondary hover:bg-background-secondary/50"
            }`}
          >
            Stack View
          </button>
        </motion.div>

        {/* Products Grid */}
        <div
          className={`relative ${
            viewMode === "split"
              ? "grid md:grid-cols-2 gap-8"
              : "flex flex-col gap-12 max-w-4xl mx-auto"
          }`}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card relative"
              initial={{ opacity: 0, y: 100, rotate: -15 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.15 }}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {/* Card */}
              <motion.div
                animate={{
                  scale: activeProduct === product.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.9 }}
                className="relative overflow-hidden transition-all"
                style={{
                  transform: `rotateY(${mouseX.get() * 8}deg) rotateX(${-mouseY.get() * 8}deg)`,
                }}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeProduct === product.id ? "scale-110" : "scale-100"
                  }`}
                  style={{ backgroundColor: `${product.color}15` }}
                />

                {/* Content */}
                <div className="relative z-10 p-5 md:p-8">
                  {/* Edition Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="inline-block mb-6"
                  >
                    <div className="px-4 py-2 bg-background-primary/90 backdrop-blur-sm border border-border-color/50">
                      <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                        Edition I
                      </span>
                    </div>
                  </motion.div>

                  {/* Product Icon */}
                  {/* <motion.div
                    className="rotate-3d w-24 h-24 mb-6 flex items-center justify-center"
                    animate={{ rotateY: [0, 10, -10, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-5xl">{product.icon}</span>
                  </motion.div> */}

                  {/* Product Image */}
                  <div className="product-image-reveal w-full mb-6 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl md:text-4xl font-light tracking-tight mb-3"
                  >
                    {product.name}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-base text-text-secondary font-light mb-6"
                  >
                    {product.description}
                  </motion.p>

                  {/* Price & Edition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-2xl md:text-3xl font-light">
                      {product.price}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {product.edition}
                    </span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <MagneticButton className="w-full px-8 py-4 bg-text-primary text-background-primary uppercase tracking-[0.15em] text-sm hover:bg-text-secondary transition-colors">
                      {activeProduct === product.id
                        ? "View Details"
                        : "Explore"}
                    </MagneticButton>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <div
                  className={`glow-pulse absolute inset-0 rounded-full transition-all duration-700 ${
                    activeProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundColor: `${product.color}30` }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Magnetic Divider Line */}
        <motion.div
          className="magnetic-line absolute left-1/2 -translate-x-1/2 w-px h-full bg-text-primary/20"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating Decorative Elements */}
        <div className="float-element absolute top-[20%] left-[10%] w-4 h-4 bg-text-primary/10 rounded-full" />
        <div
          className="float-element absolute top-[60%] right-[15%] w-6 h-6 bg-text-secondary/10 rounded-full"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="float-element absolute bottom-[30%] left-[20%] w-3 h-3 border-2 border-border-color/20 rounded-full"
          style={{ animationDelay: "2s" }}
        />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-20"
        >
          <MagneticButton className="px-12 py-5 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors">
            View Full Collection
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-background-secondary/60 to-background-primary pointer-events-none -z-10" />
    </section>
  );
}
