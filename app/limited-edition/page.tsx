import FloatingSpecs from "@/components/sections/creative/FloatingSpecs";
import ImmersiveHero from "@/components/sections/creative/ImmersiveHero";
import MorphingGallery from "@/components/sections/creative/MorphingGallery";
import FinalCTA from "@/components/sections/limited/FinalCTA";
import InteractiveFocus from "@/components/sections/limited/InteractiveFocus";
import LegacyStory from "@/components/sections/limited/LegacyStory";
import ProductReveal from "@/components/sections/limited/ProductReveal";
import ScarcitySection from "@/components/sections/limited/ScarcitySection";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";

export default function LimitedEditionPage() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] overflow-hidden">
      <Navigation />
      <ImmersiveHero />
      <ProductReveal />
      <MorphingGallery />
      <LegacyStory />
      <FloatingSpecs />
      <InteractiveFocus />
      <ScarcitySection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
