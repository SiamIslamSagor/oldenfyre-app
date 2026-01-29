"use client";

import ScrollReveal from "../animations/ScrollReveal";
import MagneticButton from "../animations/MagneticButton";
import { useState } from "react";

const lighters = [
  {
    id: 1,
    name: "The Aristocrat",
    year: "1952",
    price: "$850",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&auto=format&fit=crop&q=80",
    description: "A masterpiece of mid-century elegance",
  },
  {
    id: 2,
    name: "The Diplomat",
    year: "1948",
    price: "$1,200",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&auto=format&fit=crop&q=80",
    description: "Refined sophistication for the discerning",
  },
  {
    id: 3,
    name: "The Sovereign",
    year: "1960",
    price: "$950",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&auto=format&fit=crop&q=80",
    description: "Timeless design meets modern precision",
  },
];

export default function Collection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="collection" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-primary)]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
              Featured Collection
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4">
              Vintage <span className="text-gradient">Masterpieces</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {lighters.map((lighter, index) => (
            <ScrollReveal key={lighter.id} delay={index * 0.1}>
              <div
                className="group relative cursor-pointer bg-[var(--surface-color)] p-6"
                onMouseEnter={() => setHoveredId(lighter.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="aspect-[3/4] overflow-hidden mb-6 glow">
                  <img
                    src={lighter.image}
                    alt={lighter.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === lighter.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-light tracking-wide text-[var(--text-primary)]">
                        {lighter.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm">
                        {lighter.year}
                      </p>
                    </div>
                    <span className="text-[var(--text-primary)] font-light">
                      {lighter.price}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm font-light">
                    {lighter.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 border border-[var(--border-color)] transition-opacity duration-500 ${
                    hoveredId === lighter.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <MagneticButton className="px-12 py-4 bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] uppercase tracking-widest text-sm hover:bg-[var(--background-secondary)] transition-colors">
            View Full Collection
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
