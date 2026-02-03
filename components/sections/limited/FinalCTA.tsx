"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * FinalCTA - Final Call to Action Section
 *
 * Purpose: Provide an elegant, confident, minimal call to action
 * that encourages visitors to take the final step.
 *
 * Design Approach:
 * - Minimalist composition
 * - Strong, confident typography
 * - Elegant CTA button
 * - Sense of completion and anticipation
 */
export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleReserveNow = () => {
    router.push("/order");
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.95, 1, 1, 0.98],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-glow", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".cta-line", {
        width: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
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
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-background-primary"
    >
      <div className="noise-overlay" />

      {/* Background Glow */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-text-primary/5 rounded-full blur-3xl -z-10 bg-text-secondary" />

      <motion.div
        style={{ opacity, scale }}
        className="container px-4 text-center"
      >
        {/* Main Content */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto">
            <BottomToTopReveal className="">
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center"
              >
                <span className="text-sm md:text-base uppercase tracking-[0.3em] text-text-secondary mb-8">
                  The Collection Awaits
                </span>
                <TextReveal
                  delay={0.2}
                  className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 block"
                >
                  Begin Your Legacy
                </TextReveal>
              </motion.div>
            </BottomToTopReveal>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed font-light mb-12 max-w-2xl mx-auto"
            >
              Two masterpieces. One opportunity. Secure your piece of Oldenfyre
              history before the flame fades.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <MagneticButton
                onClick={handleReserveNow}
                className="px-14 py-5 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors cursor-pointer"
              >
                Reserve Now
              </MagneticButton>
              <MagneticButton className="px-14 py-5 border border-border-color text-text-primary uppercase tracking-[0.2em] text-sm hover:bg-background-secondary transition-colors">
                Contact Us
              </MagneticButton>
            </motion.div>

            {/* Decorative Lines */}
            <div className="flex items-center justify-center gap-4 mt-16">
              <div className="cta-line w-24 h-px bg-text-primary/30" />
              <div className="w-2 h-2 bg-text-primary/30 rounded-full" />
              <div className="cta-line w-24 h-px bg-text-primary/30" />
            </div>

            {/* Assurance Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xs text-text-secondary mt-8 font-light"
            >
              No payment required until confirmation. Free worldwide shipping
              included.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Social Proof / Trust Indicators */}
        <ScrollReveal direction="up" delay={0.9} className="mt-24">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-xs uppercase tracking-[0.15em]">
                Secure Payment
              </span>
            </div>
            <div className="w-px h-4 bg-border-color/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="text-xs uppercase tracking-[0.15em]">
                Worldwide Shipping
              </span>
            </div>
            <div className="w-px h-4 bg-border-color/30 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-xs uppercase tracking-[0.15em]">
                Lifetime Warranty
              </span>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container px-4">
          <div className="flex items-center justify-between py-8 border-t border-border-color/20">
            <p className="text-xs text-text-secondary font-light">
              &copy; 2024 Oldenfyre. All rights reserved.
            </p>
            <p className="text-xs text-text-secondary font-light">
              Crafted with passion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
