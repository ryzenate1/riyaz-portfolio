import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';

export default function ImprintSection() {
  return (
    <Section id="info" aria-labelledby="imprint-heading">
      <Container>
        <div className="max-w-prose md:mx-auto">
          <div className="text-center mb-12">
            <Caption>Legal Information</Caption>
            <h1
              id="imprint-heading"
              className="mb-4 text-5xl/tight font-bold text-balance md:text-7xl/tight"
            >
              Imprint
            </h1>
            <p className="text-neutrals-300 text-lg">
              Contact details and legal information for RYZEN STUDIO
            </p>
          </div>
          <address className="grid gap-y-16 not-italic">
            <div>
              <Heading>Details</Heading>
              <Paragraph>
                <span className="text-neutrals-100">RYZEN STUDIO</span><br />
                Chennai<br />
                600119, Tamil Nadu<br /><br />
                CEO: Riyaz Akthar
              </Paragraph>
            </div>
            <div>
              <Heading>Contact</Heading>
              <Paragraph>
                E-Mail:
                <a
                  href="mailto:hello@ryzen.studio"
                  title="Hit us up"
                  className="text-neutrals-100 hover:text-primary border-b border-current transition-colors"
                >
                  hello@ryzen.studio</a
                ><br />Phone number: 7200672127
              </Paragraph>
            </div>
          </address>
        </div>
      </Container>
    </Section>
  );
}
