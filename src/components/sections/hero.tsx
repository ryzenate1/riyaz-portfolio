import { VideoBackground } from '@/components/video-background';
import { AnimatedText } from '@/components/animated-text';
import { Container } from '@/components/ui/container';

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="sticky inset-0 flex h-svh w-full flex-col justify-center py-28 bg-transparent overflow-hidden"
    >
      <VideoBackground />
      <Container>
        <div className="flex flex-col items-center justify-center">
          <AnimatedText />
        </div>
      </Container>
    </section>
  );
}
