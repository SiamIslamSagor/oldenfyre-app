"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * LegacyStory - Emotional Narrative Section
 *
 * Purpose: Tell the story behind the limited edition collection,
 * creating emotional connection and emphasizing heritage.
 *
 * Design Approach:
 * - Editorial-style layout with mixed media
 * - Cinematic scroll-based storytelling
 * - Parallax images for depth
 * - Typography-focused design for emotional impact
 */
const storySections = [
  {
    year: "1924",
    title: "The Beginning",
    text: "In a small workshop in Paris, our founder discovered the perfect balance between form and function. Each lighter was not just a tool, but a companion through life's moments.",
    imagePosition: "left",
  },
  {
    year: "1960",
    title: "The Golden Era",
    text: "A time of innovation and artistry. Our craftsmen pushed the boundaries of what was possible, creating pieces that would become heirlooms passed down through generations.",
    imagePosition: "right",
  },
  {
    year: "2024",
    title: "The Legacy Continues",
    text: "A century later, we honor our heritage with two masterpieces that embody everything Oldenfyre stands for: timeless elegance, uncompromising quality, and the eternal flame of craftsmanship.",
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
      <div className="container px-4 mb-24">
        <ScrollReveal direction="up" delay={0.1} className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
            Our Heritage
          </span>
          <TextReveal
            delay={0.2}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter"
          >
            A Century of Fire
          </TextReveal>
        </ScrollReveal>
      </div>

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
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-background-secondary/30 to-background-primary">
                    {/* Placeholder Content */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl mb-4 block">
                          {index === 0 ? "🏛️" : index === 1 ? "🔥" : "✨"}
                        </span>
                        <p className="text-xs uppercase tracking-widest text-text-secondary">
                          {section.title}
                        </p>
                      </div>
                    </div>

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
              Every piece carries a story. Every flame ignites a memory.
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
