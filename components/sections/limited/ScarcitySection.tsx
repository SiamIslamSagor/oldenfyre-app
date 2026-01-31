"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";

/**
 * ScarcitySection - Limited Quantity & Ownership Section
 *
 * Purpose: Create urgency through scarcity messaging, highlight
 * limited quantities, serial numbers, and exclusive ownership.
 *
 * Design Approach:
 * - Countdown or progress indicators
 * - Serial number display
 * - Ownership messaging
 * - Elegant urgency without being pushy
 */
interface ProductAvailability {
  id: string;
  name: string;
  total: number;
  remaining: number;
  reserved: number;
  price: string;
}

const products: ProductAvailability[] = [
  {
    id: "obsidian",
    name: "Obsidian Noir",
    total: 50,
    remaining: 23,
    reserved: 27,
    price: "$2,400",
  },
  {
    id: "ember",
    name: "Ember Glow",
    total: 50,
    remaining: 17,
    reserved: 33,
    price: "$2,800",
  },
];

export default function ScarcitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("obsidian");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const activeProduct =
    products.find(p => p.id === selectedProduct) || products[0];
  const percentageRemaining = Math.round(
    (activeProduct.remaining / activeProduct.total) * 100,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".scarcity-bar", {
        width: 0,
        duration: 2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".scarcity-number", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
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
      className="relative min-h-screen py-32 overflow-hidden bg-background-secondary/20"
    >
      <div className="noise-overlay" />

      <motion.div style={{ opacity }} className="container px-4">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1} className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            Limited Availability
          </span>
          <TextReveal
            delay={0.2}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter"
          >
            Own a Piece of History
          </TextReveal>
        </ScrollReveal>

        {/* Product Selector */}
        <ScrollReveal
          direction="up"
          delay={0.3}
          className="flex justify-center gap-4 mb-16"
        >
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`px-8 py-4 border transition-all duration-300 ${
                selectedProduct === product.id
                  ? "border-text-primary bg-background-primary"
                  : "border-border-color/30 bg-background-primary/50 hover:border-border-color/60"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.15em]">
                {product.name}
              </p>
            </button>
          ))}
        </ScrollReveal>

        {/* Availability Display */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-primary border border-border-color/30 p-8 md:p-12">
              {/* Product Name & Price */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-2">
                    Limited Edition
                  </p>
                  <h3 className="text-3xl md:text-4xl font-light tracking-tight">
                    {activeProduct.name}
                  </h3>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-2xl font-light">{activeProduct.price}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-1">
                      Remaining
                    </p>
                    <p className="text-4xl md:text-5xl font-light tracking-tighter">
                      {activeProduct.remaining}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-1">
                      Total
                    </p>
                    <p className="text-2xl font-light text-text-secondary">
                      {activeProduct.total}
                    </p>
                  </div>
                </div>

                {/* Bar */}
                <div className="h-2 bg-background-secondary/30 rounded-full overflow-hidden">
                  <motion.div
                    className="scarcity-bar h-full bg-text-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentageRemaining}%` }}
                    transition={{
                      duration: 1.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>

                {/* Percentage */}
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-text-secondary">
                    {percentageRemaining}% still available
                  </p>
                  <p className="text-xs text-text-secondary">
                    {activeProduct.reserved} reserved
                  </p>
                </div>
              </div>

              {/* Serial Number Preview */}
              <div className="border-t border-border-color/20 pt-8">
                <div className="flex items-start gap-4">
                  <div className="scarcity-number w-12 h-12 bg-background-secondary/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">#</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                      Serial Number
                    </p>
                    <p className="text-lg font-light tracking-widest">
                      OF-2024-{activeProduct.id.toUpperCase()}-XXXX
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      Each piece is individually numbered and documented
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Ownership Benefits */}
        <ScrollReveal direction="up" delay={0.6} className="mt-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-border-color/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">📜</span>
              </div>
              <h4 className="text-lg font-light tracking-tight mb-2">
                Certificate of Authenticity
              </h4>
              <p className="text-sm text-text-secondary font-light">
                Each piece comes with a signed certificate documenting its
                provenance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-border-color/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-lg font-light tracking-tight mb-2">
                Lifetime Warranty
              </h4>
              <p className="text-sm text-text-secondary font-light">
                Comprehensive coverage for the lifetime of the original owner
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-border-color/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <h4 className="text-lg font-light tracking-tight mb-2">
                Collector&apos;s Package
              </h4>
              <p className="text-sm text-text-secondary font-light">
                Includes custom presentation box and care instructions
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.8} className="mt-24 text-center">
          <MagneticButton className="px-12 py-5 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors">
            Reserve Your Edition
          </MagneticButton>
          <p className="text-xs text-text-secondary mt-4 font-light">
            No payment required until confirmation
          </p>
        </ScrollReveal>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-text-primary/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-text-primary/20 rounded-full blur-3xl pointer-events-none z-0" />
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border-2 border-border-color/30 rounded-full pointer-events-none z-0" /> */}
    </section>
  );
}
