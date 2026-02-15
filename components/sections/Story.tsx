"use client";

import ScrollReveal from "../animations/ScrollReveal";
import ParallaxImage from "../animations/ParallaxImage";

export default function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left" className="relative">
            <div className="aspect-4/5 overflow-hidden glow">
              <ParallaxImage
                src="/le-ash.jpeg"
                alt="Vintage Lighter"
                speed={0.3}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-border-color" />
          </ScrollReveal>

          {/* Text Side */}
          <div className="space-y-8 px-4">
            <ScrollReveal delay={0.2}>
              <span className="text-text-secondary uppercase tracking-[0.3em] text-sm">
                Limited Edition
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                Own a Piece of
                <span className="block text-gradient">History</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-lg text-text-secondary leading-relaxed font-light">
                Only 100 pieces of our exclusive limited edition lighter will
                ever be crafted. Each one is individually numbered and comes
                with a certificate of authenticity, making it a true
                collector&apos;s item that appreciates in value over time.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="text-lg text-text-secondary leading-relaxed font-light">
                Hand-finished with premium materials and featuring our signature
                dual-flame technology, this masterpiece combines timeless
                elegance with modern reliability. The perfect gift for
                discerning collectors or a statement piece for your personal
                collection.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex items-center gap-8 pt-8 border-t border-border-color">
                <div className="px-4">
                  <div className="text-4xl font-light text-text-primary">
                    100
                  </div>
                  <div className="text-sm uppercase tracking-widest text-text-secondary">
                    Pieces Only
                  </div>
                </div>
                <div className="px-4">
                  <div className="text-4xl font-light text-text-primary">
                    Lifetime
                  </div>
                  <div className="text-sm uppercase tracking-widest text-text-secondary">
                    Warranty
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
