import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AboutSection } from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <AboutSection />
    </>
  );
}
