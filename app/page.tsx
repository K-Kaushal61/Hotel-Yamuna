import HeaderBlock from "@/components/blocks/header-2";
import HeroSection from "@/components/blocks/hero-section";
import RoomsSection from "@/components/blocks/rooms-section";
import NearbyPlacesSection from "@/components/blocks/nearby-places-section";
import AboutSection from "@/components/blocks/about-section";
import EnquireSection from "@/components/blocks/enquire-section";
import FooterSection from "@/components/blocks/footer-section";

export default function Home() {
  return (
    <main>
      <HeaderBlock />
      <HeroSection />
      <RoomsSection />
      <NearbyPlacesSection />
      <AboutSection />
      <EnquireSection />
      <FooterSection />
    </main>
  );
}
