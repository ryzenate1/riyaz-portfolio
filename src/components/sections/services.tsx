import { ServicesGrid } from '@/components/services-grid';
import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function ServicesSection() {
  return (
    <Section
      id="services"
      aria-labelledby="services-heading"
      hasBorderTop
      hasGlowEffect
      className="overflow-hidden"
    >
      <Container>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16 flex flex-col items-center text-center">
            <Caption id="services-heading">Services</Caption>
            <Heading className="tracking-tight">
              Launching visions, <br className="lg:hidden" />building websites
            </Heading>
            <Paragraph>
              Secure your seat, fasten your seatbelt, and join us on an interstellar journey to <span
                className="text-neutrals-100">turn your web vision into a next level reality</span
              >.
            </Paragraph>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <ServicesGrid />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
