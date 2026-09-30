import { ScrollProgress } from '@/components/scroll-progress';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import HeroSection from '@/components/sections/hero';
import GamesSection from '@/components/sections/games-section';
import WorkSection from '@/components/sections/work';

export default function ProHomePage() {
  return (
    <>
      <ScrollProgress />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <GamesSection />
      </main>
    </>
  );
}
