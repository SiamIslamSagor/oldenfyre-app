import Navigation from "@/components/ui/Navigation";
import ImmersiveHero from "@/components/sections/creative/ImmersiveHero";
import SplitReveal from "@/components/sections/creative/SplitReveal";
import MorphingGallery from "@/components/sections/creative/MorphingGallery";
import InteractiveStory from "@/components/sections/creative/InteractiveStory";
import FloatingSpecs from "@/components/sections/creative/FloatingSpecs";
import MagneticCTA from "@/components/sections/creative/MagneticCTA";
import Footer from "@/components/ui/Footer";
import ProductReveal from "@/components/sections/limited/ProductReveal";
import LegacyStory from "@/components/sections/limited/LegacyStory";
import ScarcitySection from "@/components/sections/limited/ScarcitySection";
import InteractiveFocus from "@/components/sections/limited/InteractiveFocus";
import FinalCTA from "@/components/sections/limited/FinalCTA";

export default function LimitedEditionV2Page() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] overflow-hidden">
      <Navigation />
      <ImmersiveHero />
      {/* <SplitReveal /> */}
      <ProductReveal />
      <MorphingGallery />
      <LegacyStory />
      {/* <InteractiveStory /> */}
      <FloatingSpecs />
      <InteractiveFocus />
      <ScarcitySection />
      {/* <MagneticCTA /> */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
