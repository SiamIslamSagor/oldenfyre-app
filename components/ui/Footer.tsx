"use client";

import MagneticButton from "../animations/MagneticButton";

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-20 border-t border-border-color">
      {/* Background */}
      <div className="absolute inset-0 bg-background-primary" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold tracking-wider text-text-primary">
              OLDENFYRE
            </h3>
            <p className="text-text-secondary font-light leading-relaxed">
              Crafted with passion, ignited with nostalgia since 1924.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest text-text-secondary">
              Explore
            </h4>
            <ul className="space-y-3">
              {["Collection", "Story", "Craftsmanship", "Contact"].map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest text-text-secondary">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Shipping Policy",
                "Returns",
              ].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-widest text-text-secondary">
              Newsletter
            </h4>
            <p className="text-text-secondary text-sm font-light">
              Subscribe for exclusive updates and new arrivals.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-b border-border-color py-3 text-text-primary focus:outline-none focus:border-text-primary transition-colors text-sm"
              />
              <MagneticButton className="ml-4 px-6 py-3 bg-text-primary text-background-primary uppercase tracking-widest text-xs hover:bg-text-secondary transition-colors">
                Join
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm font-light">
            © 2024 Oldenfyre. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Twitter", "Facebook"].map(social => (
              <a
                key={social}
                href="#"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-light"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
