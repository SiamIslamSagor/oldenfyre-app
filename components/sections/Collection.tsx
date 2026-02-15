"use client";

import SplitReveal from "./creative/SplitReveal";

export default function Collection() {
  return (
    <section
      id="collection"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background-primary" />

      <div className="container relative z-10 px-4 md:px-6">
        <SplitReveal />
      </div>
    </section>
  );
}
