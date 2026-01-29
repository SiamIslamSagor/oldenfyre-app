"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  delay?: number;
  className?: string;
}

export default function TextReveal({
  children,
  delay = 0,
  className = "",
}: TextRevealProps) {
  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
