"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import ParallaxImage from "@/components/animations/ParallaxImage";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BottomToTopReveal from "@/components/utils/BottomToTopReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
/**
 * ProductReveal - Limited Edition Product Showcase
 *
 * Purpose: Introduce both exclusive lighters with an interactive comparison
 * and staggered reveal that emphasizes rarity and craftsmanship.
 *
 * Design Approach:
 * - Split-screen or side-by-side comparison layout
 * - Interactive hover states revealing product details
 * - Staggered animations for dramatic effect
 * - Focus on individual product stories
 */
interface Product {
  id: string;
  name: string;
  edition: string;
  description: string;
  price: string;
  offer_price: string;
  color: string;
  year: string;
}

const products: Product[] = [
  {
    id: "ED-I",
    name: "Tribal Cross Matte",
    edition: "I",
    description:
      "Handcrafted from volcanic glass, each piece tells a story of fire and earth. The deep black finish captures light like no other material.",
    offer_price: "2,199 BDT",
    price: "2,499 BDT",
    color: "#1a1a1a",
    year: "2026",
  },
  {
    id: "ED-II",
    name: "Tribal Cross Glossy",
    edition: "II",
    description:
      "Inspired by the eternal flame, this piece features a unique copper-infused finish that develops a patina unique to each owner.",
    offer_price: "2,199 BDT",
    price: "2,499 BDT",
    color: "#b87333",
    year: "2026",
  },
];

export default function ProductReveal() {
  const router = useRouter();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-reveal-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReserveNow = (productId: string) => {
    router.push(`/order?product=${productId}`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background-secondary/20"
    >
      <div className="noise-overlay" />

      <motion.div style={{ opacity, scale }} className="container px-4">
        {/* Section Header */}
        <BottomToTopReveal className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-text-secondary block mb-4">
              The Collection
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6">
              Two Masterpieces
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light">
              Each piece is numbered, signed, and accompanied by a certificate
              of authenticity.
            </p>
          </motion.div>
        </BottomToTopReveal>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {products.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={0.2 + index * 0.2}
            >
              <motion.div
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeProduct === product.id
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                }`}
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                {/* Product Card */}
                <div className="relative bg-background-primary border border-border-color/30 overflow-hidden">
                  {/* Product Visual */}
                  <div className="aspect-[4/4] relative overflow-hidden bg-gradient-to-b from-background-secondary/20 to-background-primary">
                    {/* Placeholder for Product Image */}
                    {/* <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-48 h-48 rounded-full border-4 border-border-color/50 flex items-center justify-center"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-6xl">
                          {index === 0 ? "⚫" : "🔥"}
                        </span>
                      </motion.div>
                    </div> */}
                    {/* Image Side */}
                    <ScrollReveal direction="left" className="relative">
                      <div className="aspect-4/4 overflow-hidden glow">
                        <ParallaxImage
                          src={index === 0 ? "/le-ash.jpeg" : "/le-black.jpeg"}
                          alt="Vintage Lighter"
                          speed={0.3}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </ScrollReveal>

                    {/* Edition Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-2 bg-background-primary/90 backdrop-blur-sm border border-border-color/50">
                        <p className="text-xs uppercase tracking-widest text-text-secondary">
                          Edition {product.edition}
                        </p>
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-2 bg-background-primary/90 backdrop-blur-sm border border-border-color/50">
                        <p className="text-xs uppercase tracking-widest text-text-secondary">
                          {product.year}
                        </p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-text-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{
                        opacity: activeProduct === product.id ? 1 : 0,
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                          {product.name}
                        </h3>
                        <p className="text-text-secondary text-sm uppercase tracking-widest">
                          Limited Edition
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-light">
                          {product.offer_price}
                        </p>
                        <span className="line-through text-red-600">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-text-secondary leading-relaxed font-light mb-6"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeProduct === product.id ? "auto" : 0,
                        opacity: activeProduct === product.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {product.description}
                    </motion.p>

                    {/* CTA Button */}
                    <MagneticButton
                      onClick={() => handleReserveNow(product.id)}
                      className="w-full px-6 py-4 bg-text-primary text-background-primary uppercase tracking-[0.15em] text-sm hover:bg-text-secondary transition-colors"
                    >
                      {activeProduct === product.id
                        ? "Reserve Now"
                        : "View Details"}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Comparison Note */}
        <ScrollReveal direction="up" delay={0.8} className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-background-primary border border-border-color/30">
            <div className="w-2 h-2 bg-text-primary rounded-full" />
            <p className="text-sm text-text-secondary font-light">
              Only 46 pieces were imported to Bangladesh for the first time.
            </p>
            <div className="w-2 h-2 bg-text-primary rounded-full" />
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
