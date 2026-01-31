import Navigation from "@/components/ui/Navigation";
import ImmersiveHero from "@/components/sections/creative/ImmersiveHero";
import SplitReveal from "@/components/sections/creative/SplitReveal";
import MorphingGallery from "@/components/sections/creative/MorphingGallery";
import InteractiveStory from "@/components/sections/creative/InteractiveStory";
import FloatingSpecs from "@/components/sections/creative/FloatingSpecs";
import MagneticCTA from "@/components/sections/creative/MagneticCTA";
import Footer from "@/components/ui/Footer";

export default function LimitedEditionV2Page() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] overflow-hidden">
      <Navigation />
      <ImmersiveHero />
      <SplitReveal />
      <MorphingGallery />
      <InteractiveStory />
      <FloatingSpecs />
      <MagneticCTA />
      <Footer />
    </main>
  );
}
