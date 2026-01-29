"use client";

import Lenis from "@studio-freight/react-lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Lenis
      root
      options={{
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </Lenis>
  );
}
