"use client";

import ScrollReveal from "../animations/ScrollReveal";
import ParallaxImage from "../animations/ParallaxImage";

export default function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-secondary)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left" className="relative">
            <div className="aspect-[4/5] overflow-hidden glow">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80"
                alt="Vintage Lighter"
                speed={0.3}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-[var(--border-color)]" />
          </ScrollReveal>

          {/* Text Side */}
          <div className="space-y-8 px-4">
            <ScrollReveal delay={0.2}>
              <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
                Our Heritage
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                A Legacy of
                <span className="block text-gradient">Excellence</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                Since 1924, Oldenfyre has been crafting lighters that transcend
                time. Each piece is a testament to artistry and dedication of
                our master craftsmen, who have passed down their secrets through
                generations.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                Our vintage collection represents the pinnacle of mid-century
                design, where form meets function in perfect harmony. Every
                lighter tells a story, carries memories, and ignites moments
                that last forever.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex items-center gap-8 pt-8 border-t border-[var(--border-color)]">
                <div className="px-4">
                  <div className="text-4xl font-light text-[var(--text-primary)]">
                    100
                  </div>
                  <div className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">
                    Years of Craft
                  </div>
                </div>
                <div className="px-4">
                  <div className="text-4xl font-light text-[var(--text-primary)]">
                    50K+
                  </div>
                  <div className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">
                    Pieces Crafted
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
