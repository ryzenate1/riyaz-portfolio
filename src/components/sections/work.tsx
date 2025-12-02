import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';
import { ProjectCards } from '@/components/project-cards';
import { ScrollReveal } from '@/components/scroll-reveal';

// Old project showcase (deprecated) - see src/components/project-showcase/README.md
// import { ProjectShowcase } from '@/components/project-showcase';

export default async function WorkSection() {
  return (
    <Section
      id="work"
      aria-labelledby="work-heading"
      hasBorderTop
      hasGlowEffect
      className="lg:border-neutrals-600 lg:border-t-[0.5px] lg:before:hidden lg:after:hidden py-16 overflow-hidden"
    >
      
      <Container>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center mb-12">
            <Caption id="work-heading">Work</Caption>
            <Heading className="tracking-tight">Selected Projects</Heading>
            <Paragraph>
              Swipe through my projects · Tap for deep dives with live demos
            </Paragraph>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <ProjectCards />
        </ScrollReveal>
      </Container>
    </Section>
  );
}

