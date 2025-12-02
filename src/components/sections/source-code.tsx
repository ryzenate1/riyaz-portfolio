import { MatrixBackground } from '@/components/matrix-background';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';
import Link from 'next/link';

export default function GamesSection() {
  return (
    <Section
      id="games"
      aria-labelledby="games-heading"
      hasBorderTop
    >
      <MatrixBackground />
      <Container>
        <div className="flex h-full flex-col items-center justify-start text-center">
          <Caption id="games-heading">Interactive Fun</Caption>
          <Heading>Enter the Game Zone</Heading>
          <Paragraph>
            Take a break from browsing and challenge yourself with some
            <span className="text-neutrals-100"> interactive mini-games</span>. 
            Test your skills with memory puzzles, typing challenges, classic snake, 
            and more. Can you beat the high scores?
          </Paragraph>
          <Button
            asChild
            foreground="primary"
            className="mt-8"
          >
            <Link href="/games">
              Play Games
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
