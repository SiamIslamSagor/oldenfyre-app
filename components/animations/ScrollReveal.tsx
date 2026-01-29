"use client";

import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getVariants = (): Variants => {
    const hiddenState: Record<string, number> = { opacity: 0 };

    switch (direction) {
      case "up":
        hiddenState.y = 60;
        break;
      case "down":
        hiddenState.y = -60;
        break;
      case "left":
        hiddenState.x = 60;
        break;
      case "right":
        hiddenState.x = -60;
        break;
    }

    const variants: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      hidden: hiddenState,
    };

    return variants;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
