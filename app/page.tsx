import { HeroSection } from "@/components/home/HeroSection";
import { IconStrip } from "@/components/home/IconStrip";
import { ServicesSection } from "@/components/home/ServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IconStrip />
      <ServicesSection />
    </>
  );
}
