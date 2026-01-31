import Navigation from "@/components/ui/Navigation";
import LimitedHero from "@/components/sections/limited/LimitedHero";
import ProductReveal from "@/components/sections/limited/ProductReveal";
import LegacyStory from "@/components/sections/limited/LegacyStory";
import CraftsmanshipShowcase from "@/components/sections/limited/CraftsmanshipShowcase";
import InteractiveFocus from "@/components/sections/limited/InteractiveFocus";
import ScarcitySection from "@/components/sections/limited/ScarcitySection";
import FinalCTA from "@/components/sections/limited/FinalCTA";
import Footer from "@/components/ui/Footer";

export default function LimitedEditionPage() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <Navigation />
      <LimitedHero />
      <ProductReveal />
      <LegacyStory />
      <CraftsmanshipShowcase />
      <InteractiveFocus />
      <ScarcitySection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
