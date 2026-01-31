import React, { ReactNode } from "react";
interface BottomToTopRevealProps {
  children: ReactNode;
  className?: string;
}
const BottomToTopReveal = ({ children, className }: BottomToTopRevealProps) => {
  if (!children) return null;
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
};

export default BottomToTopReveal;
