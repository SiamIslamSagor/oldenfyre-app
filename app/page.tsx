import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Collection from "@/components/sections/Collection";
import Craftsmanship from "@/components/sections/Craftsmanship";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <Navigation />
      <Hero />
      <Story />
      <Collection />
      <Craftsmanship />
      <Contact />
      <Footer />
    </main>
  );
}
