import CraftsmanshipShowcase from "@/components/sections/limited/CraftsmanshipShowcase";
import FinalCTA from "@/components/sections/limited/FinalCTA";
import InteractiveFocus from "@/components/sections/limited/InteractiveFocus";
import LegacyStory from "@/components/sections/limited/LegacyStory";
import LimitedHero from "@/components/sections/limited/LimitedHero";
import ProductReveal from "@/components/sections/limited/ProductReveal";
import ScarcitySection from "@/components/sections/limited/ScarcitySection";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";

export default function LimitedEditionV2Page() {
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
