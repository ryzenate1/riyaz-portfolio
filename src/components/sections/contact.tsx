import { ContactForm } from '@/components/contact-form';
import { StarsBackground } from '@/components/stars-background';
import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/scroll-reveal';

export default function ContactSection() {
  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      hasBorderTop
      hasGlowEffect
      className="lg:after:hidden overflow-hidden"
    >
      <StarsBackground />
      
      <Container>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16 flex flex-col items-center text-center">
            <Caption id="contact-heading">Communication</Caption>
            <Heading className="tracking-tight">Ready to bring your vision to life?</Heading>
            <Paragraph>
              We&apos;re excited to work with you and eager for new connections. <span
                className="text-neutrals-100">Let&apos;s start a conversation and create something amazing together</span
              >.
            </Paragraph>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex h-full w-full flex-col lg:relative lg:flex-row">
            <div className="mt-10 basis-full lg:mt-0">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
