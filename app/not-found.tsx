"use client";

import { useViewportSize } from "@/hooks/useViewPortSize";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * NotFoundPage - Modern 404 Page
 *
 * Awwwards-winning approach with:
 * - Kinetic typography that responds to cursor
 * - Morphing shapes in background
 * - Floating particles
 * - Grid overlay
 * - Immersive depth effects
 * - Buttons to navigate home or back
 */
const errorCode = "404";
const errorMessage = "Page Under Development";

export default function NotFoundPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.97]);

  const springConfig = { damping: 30, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const { width, height } = useViewportSize();

  const x = useTransform(mouseX, v => v * width);
  const y = useTransform(mouseY, v => v * height);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

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
      // Kinetic text animation
      gsap.from(".kinetic-text", {
        y: 200,
        rotation: 15,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3,
      });

      // Morphing shapes
      gsap.to(".morph-shape", {
        borderRadius: "50%",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 2,
      });

      gsap.to(".morph-shape", {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 2,
      });

      // Floating particles
      gsap.to(".float-particle", {
        y: -100,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background-primary text-text-primary overflow-hidden">
      <section
        ref={sectionRef}
        className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-background-primary">
          {/* Morphing Shapes */}
          <div className="morph-shape absolute top-1/4 left-1/4 w-96 h-96 bg-text-primary/5 blur-3xl" />
          <div
            className="morph-shape absolute bottom-1/4 right-1/4 w-125 h-125 bg-text-secondary/5 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="morph-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-text-primary/3 blur-3xl"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const left = (i * 5) % 100;
          const top = (i * 7) % 100;
          const delay = (i * 0.15) % 3;
          return (
            <div
              key={i}
              className="float-particle absolute w-1 h-1 bg-text-primary/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Main Content */}
        <motion.div
          style={{ rotateX, rotateY, scale }}
          className="relative z-10 text-center px-4"
        >
          {/* Error Code - Kinetic Typography */}
          <div className="relative h-[40vh] flex items-center justify-center">
            <div className="overflow-hidden">
              <h1 className="kinetic-text text-[25vw] md:text-[20vw] lg:text-[18vw] max-md:text-[20vw] font-light tracking-tighter leading-none text-gradient">
                {errorCode.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 100, rotate: 15, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-text-primary font-light tracking-wide">
              {errorMessage}
            </p>
            <p className="mt-4 text-sm md:text-base text-text-secondary font-light tracking-widest uppercase">
              The page you&apos;re looking for is currently being crafted
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <motion.button
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-text-primary text-background-primary font-light tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10">Go Home</span>
              <motion.div
                className="absolute inset-0 bg-text-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 border border-text-primary text-text-primary font-light tracking-widest uppercase text-sm overflow-hidden transition-all duration-300 hover:bg-text-primary hover:text-background-primary"
            >
              <span className="relative z-10">Go Back</span>
            </motion.button>
          </motion.div>

          {/* Decorative Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-16"
          >
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-text-primary/30 to-transparent mx-auto" />
          </motion.div>
        </motion.div>

        {/* Cursor Follower */}
        <motion.div
          className="pointer-events-none fixed w-8 h-8 border border-text-primary/30 rounded-full z-50"
          style={{
            x,
            y,
          }}
        />

        {/* Diagonal Decorative Lines */}
        <div className="absolute top-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform -rotate-12" />
        <div className="absolute bottom-0 left-0 w-[200%] h-20 blur-md bg-linear-to-r from-transparent via-text-primary/10 to-transparent transform rotate-12" />
      </section>
    </main>
  );
}
