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
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background-secondary)]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="text-[var(--text-secondary)] uppercase tracking-[0.3em] text-sm">
              Get in Touch
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4">
              Start Your <span className="text-gradient">Journey</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-[var(--text-secondary)] mt-6 font-light">
              Whether you're seeking a specific piece or wish to learn more
              about our craft, we're here to assist.
            </p>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.3}>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[var(--border-color)] py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm uppercase tracking-widest text-[var(--text-secondary)]">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full bg-transparent border-b border-[var(--border-color)] py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors resize-none"
                placeholder="Tell us about your inquiry..."
                required
              />
            </div>

            <div className="text-center pt-8">
              <button
                type="submit"
                className="magnetic-button px-12 py-4 bg-[var(--text-primary)] text-[var(--background-primary)] uppercase tracking-widest text-sm hover:bg-[var(--text-secondary)] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal
          delay={0.4}
          className="mt-20 pt-20 border-t border-[var(--border-color)]"
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-[var(--text-secondary)] text-sm uppercase tracking-widest">
                Visit Us
              </div>
              <p className="text-[var(--text-secondary)] font-light">
                123 Heritage Lane
                <br />
                London, UK SW1A 1AA
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-[var(--text-secondary)] text-sm uppercase tracking-widest">
                Call Us
              </div>
              <p className="text-[var(--text-secondary)] font-light">
                +44 20 7123 4567
                <br />
                Mon - Fri, 9am - 6pm
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-[var(--text-secondary)] text-sm uppercase tracking-widest">
                Email Us
              </div>
              <p className="text-[var(--text-secondary)] font-light">
                hello@oldenfyre.com
                <br />
                support@oldenfyre.com
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
