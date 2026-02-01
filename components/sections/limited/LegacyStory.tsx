"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";
import ParallaxImage from "@/components/animations/ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

/**
 * LegacyStory - Product Description Section
 *
 * Purpose: Describe the product in 3 clear steps,
 * highlighting key features and benefits.
 *
 * Design Approach:
 * - Editorial-style layout with mixed media
 * - Cinematic scroll-based storytelling
 * - Parallax images for depth
 * - Typography-focused design for visual impact
 */
const storySections = [
  {
    year: "STEP 01",
    title: "Precision Engineering",
    text: "Every Oldenfyre lighter is crafted with meticulous attention to detail. Our precision engineering ensures a perfect flame every time, combining advanced technology with traditional craftsmanship to create a reliable ignition system that never fails.",
    imagePosition: "left",
  },
  {
    year: "STEP 02",
    title: "Premium Materials",
    text: "We source only the finest materials from around the world. From aerospace-grade metals to hand-finished surfaces, each component is selected for its durability and aesthetic appeal, resulting in a lighter that looks as stunning as it performs.",
    imagePosition: "right",
  },
  {
    year: "STEP 03",
    title: "Incredible Finishing",
    text: "Our design philosophy balances modern innovation with classic elegance. Each piece is created to be both a functional tool and a statement accessory – a companion that elevates your everyday moments and stands the test of time.",
    imagePosition: "left",
  },
];

export default function LegacyStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Year markers animation
      gsap.from(".year-marker", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-primary"
    >
      <div className="noise-overlay" />

      {/* Section Header */}

      <BottomToTopReveal className="container px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            The Oldenfyre Experience
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6">
            Crafted in Three Steps
          </h2>
        </motion.div>
      </BottomToTopReveal>

      {/* Timeline */}
      <div ref={timelineRef} className="container px-4 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-color/30 -translate-x-1/2 hidden lg:block">
          <div className="timeline-line absolute inset-0 w-full bg-text-primary/40" />
        </div>

        {/* Story Sections */}
        <div className="space-y-32 lg:space-y-48">
          {storySections.map((section, index) => (
            <div
              key={section.year}
              className={`relative grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                section.imagePosition === "right" ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Year Marker */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                <div className="year-marker w-20 h-20 bg-background-primary border-2 border-text-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-light tracking-wider">
                    {section.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`lg:col-span-1 ${section.imagePosition === "right" ? "lg:pr-24" : "lg:pl-24 lg:order-2"}`}
              >
                <ScrollReveal direction="up" delay={0.1 + index * 0.1}>
                  <div className="relative">
                    {/* Mobile Year Badge */}
                    <div className="lg:hidden mb-6">
                      <div className="inline-block px-6 py-3 bg-background-secondary/30 border border-border-color/50">
                        <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                          {section.year}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6">
                      {section.title}
                    </h3>
                    <p className="text-lg text-text-secondary leading-relaxed font-light">
                      {section.text}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-8 w-16 h-px bg-text-primary/30" />
                  </div>
                </ScrollReveal>
              </div>

              {/* Image */}
              <div
                className={`lg:col-span-1 ${section.imagePosition === "right" ? "lg:order-2" : ""}`}
              >
                <ScrollReveal direction="up" delay={0.2 + index * 0.1}>
                  <div className="relative aspect-[4/4] overflow-hidden bg-gradient-to-br from-background-secondary/30 to-background-primary">
                    <ScrollReveal direction="left" className="relative">
                      <div className="aspect-4/4 overflow-hidden glow">
                        <ParallaxImage
                          src={
                            index === 0
                              ? "/matte-s1.jpeg"
                              : index === 1
                                ? "/matte-s2.jpeg"
                                : "/matte-s3.jpeg"
                          }
                          alt="Vintage Lighter"
                          speed={0.3}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </ScrollReveal>

                    {/* Decorative Frame */}
                    <div className="absolute inset-4 border border-border-color/20 pointer-events-none" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Statement */}
      <div className="container px-4 mt-32">
        <ScrollReveal direction="up" delay={0.4}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-text-primary">
              Experience the perfect balance of form and function.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-px bg-text-primary/30" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-text-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-text-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
