"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * InteractiveFocus - Interactive Experience Section
 *
 * Purpose: Create an engaging, interactive section that showcases
 * the products through hover, scroll, and magnetic interactions.
 *
 * Design Approach:
 * - Magnetic button effects
 * - Scroll-triggered animations
 * - Interactive hotspots
 * - Immersive visual experience
 */
interface InteractiveCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  angle: number;
}

const interactiveCards: InteractiveCard[] = [
  {
    id: "touch",
    title: "Feel the Difference",
    subtitle: "Tactile Excellence",
    description:
      "Every curve, every edge, every surface is designed for the perfect touch experience.",
    angle: -3,
  },
  {
    id: "ignite",
    title: "Ignite with Purpose",
    subtitle: "Perfect Flame",
    description:
      "A flame that responds to your intention, steady and reliable in any condition.",
    angle: 2,
  },
  {
    id: "carry",
    title: "Carry with Pride",
    subtitle: "Everyday Luxury",
    description:
      "Designed to be carried, used, and admired. A companion for life's moments.",
    angle: -2,
  },
];

export default function InteractiveFocus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const router = useRouter();

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.98],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".focus-ring", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".focus-line", {
        width: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleReserveNow = (productId: string) => {
    router.push(`/order?product=${productId}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-primary"
    >
      <div className="noise-overlay" />

      <motion.div style={{ opacity, scale }} className="container px-4">
        {/* Section Header */}

        <BottomToTopReveal className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
              Experience
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6">
              Feel the Craft
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
              Interact with the collection. Discover the details that make each
              piece extraordinary.
            </p>
          </motion.div>
        </BottomToTopReveal>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {interactiveCards.map((card, index) => (
            <ScrollReveal
              key={card.id}
              direction="up"
              delay={0.2 + index * 0.1}
            >
              <motion.div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Card */}
                <div
                  className="relative bg-background-secondary/10 border border-border-color/30 p-8 overflow-hidden"
                  onMouseMove={handleMouseMove}
                >
                  {/* Animated Background */}
                  {/* <motion.div
                    className="absolute inset-0 bg-text-primary/5"
                    style={{
                      x: springX,
                      y: springY,
                    }}
                  /> */}

                  {/* Decorative Ring */}
                  <div
                    className={`focus-ring absolute top-4 right-4 w-12 h-12 border-2 border-border-color/30 rounded-full transition-all duration-300 ${
                      hoveredCard === card.id
                        ? "border-text-primary scale-110"
                        : ""
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-4">
                      {card.subtitle}
                    </p>
                    <h3 className="text-2xl font-light tracking-tight mb-4">
                      {card.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className="focus-line absolute bottom-0 left-0 h-px bg-text-primary/30" />
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-text-primary/0 group-hover:border-text-primary/30 transition-colors duration-300 pointer-events-none"
                  initial={false}
                  animate={{ rotate: hoveredCard === card.id ? card.angle : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Product Showcase */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="relative max-w-4xl mx-auto">
            {/* Main Visual */}
            <div className="relative aspect-[16/9] bg-background-secondary/10 border border-border-color/30 overflow-hidden">
              {/* Placeholder for Interactive Product */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 border-4 border-border-color/50 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-6xl">🔥</span>
                  </motion.div>
                  <p className="text-xs uppercase tracking-widest text-text-secondary">
                    Interactive Product View
                  </p>
                  <p className="text-sm text-text-secondary mt-2 font-light">
                    Hover to explore
                  </p>
                </div>
              </div>

              {/* Hotspots */}
              <div className="absolute top-1/4 left-1/4 group">
                <div className="w-4 h-4 bg-text-primary rounded-full cursor-pointer hover:scale-125 transition-transform" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-background-primary border border-border-color/50 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-xs text-text-secondary">
                    Swiss ignition system
                  </p>
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 group">
                <div className="w-4 h-4 bg-text-primary rounded-full cursor-pointer hover:scale-125 transition-transform" />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-background-primary border border-border-color/50 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-xs text-text-secondary">
                    Hand-polished finish
                  </p>
                </div>
              </div>

              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 group">
                <div className="w-4 h-4 bg-text-primary rounded-full cursor-pointer hover:scale-125 transition-transform" />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-background-primary border border-border-color/50 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-xs text-text-secondary">
                    Premium materials
                  </p>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-8 text-center">
              <p className="text-sm text-text-secondary font-light">
                Explore the details that make each piece unique
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Magnetic CTA */}
        <ScrollReveal direction="up" delay={0.7} className="mt-24 text-center">
          <MagneticButton
            onClick={() => handleReserveNow("ED-I")}
            className="px-12 py-5 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors"
          >
            Start Your Journey
          </MagneticButton>
        </ScrollReveal>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-text-primary/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-text-primary/15 rounded-full blur-3xl pointer-events-none z-0" />
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-border-color/30 rounded-full pointer-events-none z-0" /> */}
    </section>
  );
}
