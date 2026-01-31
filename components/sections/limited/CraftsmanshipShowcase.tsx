"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

/**
 * CraftsmanshipShowcase - Materials & Mechanism Details
 *
 * Purpose: Showcase the exceptional materials, mechanisms, and
 * attention to detail that make each piece a masterpiece.
 *
 * Design Approach:
 * - Close-up visual focus on materials
 * - Interactive hotspots revealing details
 * - Grid layout for systematic presentation
 * - Emphasis on quality and precision
 */
const craftsmanshipDetails = [
  {
    id: "materials",
    title: "Exceptional Materials",
    items: [
      {
        name: "Volcanic Obsidian",
        description:
          "Hand-selected from ancient volcanic sites, each piece features unique natural patterns.",
        icon: "🌋",
      },
      {
        name: "Copper Infusion",
        description:
          "Pure copper blended with premium alloys, developing a beautiful patina over time.",
        icon: "🔶",
      },
      {
        name: "Sapphire Crystal",
        description:
          "Scratch-resistant sapphire crystal for the ignition mechanism window.",
        icon: "💎",
      },
    ],
  },
  {
    id: "mechanism",
    title: "Precision Mechanism",
    items: [
      {
        name: "Swiss-Made Ignition",
        description:
          "Precision-engineered piezoelectric ignition system, guaranteed for life.",
        icon: "⚙️",
      },
      {
        name: "Adjustable Flame",
        description:
          "Micro-adjustable flame control with 50 precision settings.",
        icon: "🔥",
      },
      {
        name: "Fuel Efficiency",
        description:
          "Advanced fuel delivery system providing 3,000+ ignitions per refill.",
        icon: "⛽",
      },
    ],
  },
  {
    id: "finish",
    title: "Artisan Finish",
    items: [
      {
        name: "Hand-Polished",
        description:
          "Each piece undergoes 47 hours of hand polishing by master craftsmen.",
        icon: "✨",
      },
      {
        name: "Laser Engraved",
        description:
          "Precision laser engraving for serial numbers and edition marks.",
        icon: "🔢",
      },
      {
        name: "Protective Coating",
        description:
          "Proprietary nano-coating for enhanced durability and fingerprint resistance.",
        icon: "🛡️",
      },
    ],
  },
];

export default function CraftsmanshipShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".craft-line", {
        width: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".craft-dot", {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-secondary/10"
    >
      <div className="noise-overlay" />

      <motion.div style={{ opacity }} className="container px-4">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            The Details
          </span>
          <TextReveal
            delay={0.2}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter"
          >
            Crafted to Perfection
          </TextReveal>
        </ScrollReveal>

        {/* Craftsmanship Grid */}
        <div className="space-y-24">
          {craftsmanshipDetails.map((category, categoryIndex) => (
            <div key={category.id} className="relative">
              {/* Category Title */}
              <ScrollReveal direction="up" delay={0.1 + categoryIndex * 0.1}>
                <div className="flex items-center gap-6 mb-12">
                  <div className="craft-line h-px bg-text-primary/30 flex-grow" />
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight whitespace-nowrap">
                    {category.title}
                  </h3>
                  <div className="craft-line h-px bg-text-primary/30 flex-grow" />
                </div>
              </ScrollReveal>

              {/* Items Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <ScrollReveal
                    key={item.name}
                    direction="up"
                    delay={0.2 + categoryIndex * 0.1 + itemIndex * 0.05}
                  >
                    <motion.div
                      className="relative bg-background-primary border border-border-color/30 p-8 hover:border-border-color/60 transition-colors duration-300 group"
                      onMouseEnter={() => setActiveDetail(item.name)}
                      onMouseLeave={() => setActiveDetail(null)}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Icon */}
                      <div className="mb-6">
                        <motion.div
                          className="w-16 h-16 flex items-center justify-center text-4xl"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-light tracking-tight mb-3 group-hover:text-text-secondary transition-colors">
                        {item.name}
                      </h4>

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Decorative Dot */}
                      <div className="absolute top-4 right-4 craft-dot w-2 h-2 bg-text-primary/30 rounded-full group-hover:bg-text-primary transition-colors" />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Specifications Summary */}
        <ScrollReveal direction="up" delay={0.6} className="mt-32">
          <div className="grid md:grid-cols-4 gap-8 border-t border-border-color/30 pt-16">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                47
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Hours of Polish
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                50
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Precision Settings
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                3K+
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Ignitions Per Fill
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                ∞
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                Lifetime Warranty
              </p>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-border-color/10 rounded-full" />
      <div className="absolute bottom-1/4 right-[10%] w-48 h-48 border border-border-color/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-text-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
