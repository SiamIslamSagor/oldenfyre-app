"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Hand-Assembled",
    description:
      "Each lighter is meticulously assembled by our master craftsmen, ensuring precision in every detail.",
    icon: "✦",
  },
  {
    title: "Premium Materials",
    description:
      "We source only the finest brass, silver, and gold to create lighters that stand the test of time.",
    icon: "◆",
  },
  {
    title: "Lifetime Warranty",
    description:
      "Our commitment to quality means your Oldenfyre lighter is backed by our lifetime guarantee.",
    icon: "●",
  },
];

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-primary)]" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
              The Art of Craft
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4">
              Uncompromising <span className="text-gradient">Quality</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item text-center space-y-6 px-4"
            >
              <div className="text-5xl text-[var(--text-secondary)]/30">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light tracking-wide text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
                The Process
              </span>
              <h3 className="text-3xl md:text-4xl font-light tracking-tight mt-4">
                From Concept to <span className="text-gradient">Creation</span>
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {["Design", "Prototype", "Craft", "Polish"].map((step, index) => (
              <ScrollReveal key={step} delay={index * 0.1}>
                <div className="text-center space-y-4 px-4">
                  <div className="text-6xl font-light text-[var(--text-secondary)]/20">
                    0{index + 1}
                  </div>
                  <h4 className="text-xl font-light tracking-wide text-[var(--text-primary)]">
                    {step}
                  </h4>
                  <div className="w-px h-16 bg-gradient-to-b from-[var(--text-primary)] to-transparent mx-auto" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
