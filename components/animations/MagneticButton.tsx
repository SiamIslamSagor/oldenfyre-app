"use client";

import { useRef, useEffect, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
  springStiffness?: number;
  springDamping?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  magneticStrength = 0.25,
  springStiffness = 0.1,
  springDamping = 0.55,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Physics animation loop
    const animate = () => {
      // Calculate spring force
      const forceX =
        (targetRef.current.x - positionRef.current.x) * springStiffness;
      const forceY =
        (targetRef.current.y - positionRef.current.y) * springStiffness;

      // Apply velocity with damping
      velocityRef.current.x = (velocityRef.current.x + forceX) * springDamping;
      velocityRef.current.y = (velocityRef.current.y + forceY) * springDamping;

      // Update position
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      // Apply transform
      button.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

      // Continue animation if there's movement or if hovering
      const isMoving =
        Math.abs(velocityRef.current.x) > 0.01 ||
        Math.abs(velocityRef.current.y) > 0.01;
      const isNotAtTarget =
        Math.abs(targetRef.current.x - positionRef.current.x) > 0.01 ||
        Math.abs(targetRef.current.y - positionRef.current.y) > 0.01;

      if (isMoving || isNotAtTarget || isHoveringRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate distance from center
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      // Set target position with magnetic strength
      targetRef.current = {
        x: mouseX * magneticStrength,
        y: mouseY * magneticStrength,
      };

      // Start animation if not already running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      // Reset target to center
      targetRef.current = { x: 0, y: 0 };

      // Start animation if not already running
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [magneticStrength, springStiffness, springDamping]);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
