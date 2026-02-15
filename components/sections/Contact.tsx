"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <span className="text-text-secondary uppercase tracking-[0.3em] text-sm">
              Get in Touch
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4">
              Start Your <span className="text-gradient">Journey</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-text-secondary mt-6 font-light">
              Whether you&apos;re seeking a specific piece or wish to learn more
              about our craft, we&apos;re here to assist.
            </p>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.3}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 max-w-2xl mx-auto px-4"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm uppercase tracking-widest text-text-secondary">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-border-color py-4 text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm uppercase tracking-widest text-text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-border-color py-4 text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm uppercase tracking-widest text-text-secondary">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full bg-transparent border-b border-border-color py-4 text-text-primary focus:outline-none focus:border-text-primary transition-colors resize-none"
                placeholder="Tell us about your inquiry..."
                required
              />
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                className="magnetic-button px-12 py-4 bg-text-primary text-background-primary uppercase tracking-widest text-sm hover:bg-text-secondary transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </ScrollReveal>

       
      </div>
    </section>
  );
}
