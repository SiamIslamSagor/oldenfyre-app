"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import MagneticButton from "@/components/animations/MagneticButton";
import { useViewportSize } from "@/hooks/useViewPortSize";

/**
 * MagneticCTA - Distortion Effects CTA Section
 *
 * Awwwards-winning approach with:
 * - Magnetic button effects
 * - Distortion on hover
 * - Kinetic typography
 * - Morphing background
 * - Smooth scroll animations
 */
export default function MagneticCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.9, 1, 1, 0.98],
  );

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const { width, height } = useViewportSize();

  const x = useTransform(mouseX, v => (v * width) / 2);
  const y = useTransform(mouseY, v => (v * height) / 2);

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
      // Morphing background
      gsap.to(".cta-morph", {
        borderRadius: "50%",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Floating elements
      gsap.to(".cta-float", {
        y: -60,
        x: 40,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });

      // Text distortion
      gsap.to(".cta-text", {
        skewX: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pulse effect
      gsap.to(".cta-pulse", {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-secondary/20"
    >
      <motion.div style={{ opacity, scale }} className="container px-4">
        {/* Background Morphing Shapes */}
        <div className="cta-morph absolute top-1/4 left-1/4 w-96 h-96 bg-text-primary/5 blur-3xl" />
        <div
          className="cta-morph absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-text-secondary/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="cta-morph absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-text-primary/3 blur-3xl"
          style={{ animationDelay: "4s" }}
        />

        {/* Main Content */}
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Floating Decorative Elements */}
          <div className="cta-float absolute -top-20 -left-20 w-16 h-16 border-2 border-border-color/20 rounded-full" />
          <div
            className="cta-float absolute -bottom-20 -right-20 w-24 h-24 border-2 border-border-color/20 rounded-full"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="cta-float absolute top-1/2 -left-32 w-12 h-12 border border-border-color/20 rounded-full"
            style={{ animationDelay: "2s" }}
          />

          {/* Opening Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 bg-background-primary/90 backdrop-blur-sm border border-border-color/50 text-xs uppercase tracking-[0.3em] text-text-secondary">
              Limited Edition
            </span>
          </motion.div>

          {/* Main Headline with Distortion */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="cta-text text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none">
              Begin Your
              <br />
              <span className="italic">Legacy</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary font-light mb-12 max-w-2xl mx-auto"
          >
            Two masterpieces. One opportunity. Secure your piece of Oldenfyre
            history.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton className="cta-pulse px-14 py-5 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Reserve Now</span>
            </MagneticButton>
            <MagneticButton className="px-14 py-5 border-2 border-border-color/30 text-text-primary uppercase tracking-[0.2em] text-sm hover:border-text-primary hover:bg-background-secondary transition-all duration-300">
              Contact Us
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { icon: "🔒", text: "Secure Payment" },
              { icon: "🌍", text: "Worldwide Shipping" },
              { icon: "✓", text: "Lifetime Warranty" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <p className="text-sm text-text-secondary font-light">
              Only 40 pieces remaining across both editions
            </p>
          </motion.div>
        </div>

        {/* Cursor Follower Effect */}
        <motion.div
          className="pointer-events-none fixed w-12 h-12 border-2 border-text-primary/20 rounded-full z-50"
          style={{
            x,
            y,
            opacity: useTransform(mouseX, v => Math.abs(v) * 0.5 + 0.2),
          }}
        />
      </motion.div>

      {/* Diagonal Lines */}
      <div className="absolute top-0 left-0 w-[200%] h-px bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform -rotate-6" />
      <div className="absolute bottom-0 left-0 w-[200%] h-px bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform rotate-6" />
    </section>
  );
}
