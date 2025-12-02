import Image from 'next/image';
import riyazImage from '@/assets/images/riyaz.jpg';
import { StarsBackground } from '@/components/stars-background';
import { TypingHeading } from '@/components/typing-heading';
import { Caption, Paragraph } from '@/components/ui/typography';
import { AboutSkills } from '@/components/about-skills';

const headings = [
  'Problem Solvers',
  'Visionaries',
  'Developers',
  'Shopify Partners',
  'Free Thinkers',
  'Coffeeholics',
  'Digital Strategists',
  'Perfectionists',
  'Framer Partners',
  'Creative Minds',
  'Passionists',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 w-full bg-neutrals-900 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:mx-auto after:h-full after:w-full after:max-w-7xl after:bg-[radial-gradient(40%_36%_at_50%_0%,rgba(105,25,255,0.04)_0%,rgba(105,25,255,0)_100%,rgba(105,25,255,0)_100%),radial-gradient(32%_20%_at_50%_32%,rgba(105,25,255,0.08)_0%,rgba(105,25,255,0)_100%)]"
    >
      <StarsBackground />
      <div className="flex w-full items-center max-lg:flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,min(11/12*100%/2,48rem))_minmax(0,min(11/12*100%/2,48rem))_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,min(80%/2,48rem))_minmax(0,min(80%/2,48rem))_minmax(0,1fr)]">
        <Image
          src={riyazImage}
          alt="Riyaz, Full-Stack Developer & Kinesiology Enthusiast"
          className="bg-neutrals-800 h-full max-h-svh object-cover object-center grayscale transition-[filter] duration-500 hover:grayscale-0 lg:col-start-1 lg:col-end-3"
        />

        <div className="w-full py-28 max-lg:mx-auto max-lg:w-11/12 max-lg:max-w-7xl lg:ps-10 xl:ps-20">
          <Caption id="about-heading">About</Caption>
          <TypingHeading headings={headings} />
          <Paragraph className="text-2xl sm:text-3xl md:text-3xl leading-relaxed">
            I&apos;m Riyaz, a passionate{' '}
            <span className="text-neutrals-100">Full-Stack Developer & Kinesiology Enthusiast</span>{' '}
            who loves creating exceptional digital experiences. I specialize in transforming ideas
            into modern, future-ready web applications with a focus on both technical excellence and
            user experience. Let&apos;s build something amazing together!
          </Paragraph>
        </div>
      </div>

      {/* Clean Line Divider - 2px thick */}
      <div className="w-full flex justify-center py-8 lg:pt-0 lg:pb-8">
        <div className="w-[120%] max-w-none h-0.5 bg-gradient-to-r from-transparent via-neutrals-700 to-transparent"></div>
      </div>

      {/* Terminal Of Truth Section Header */}
      <div className="mt-8 mb-12 flex flex-col items-center text-center px-4 md:px-8">
        <p className="border-primary/30 bg-primary/10 text-primary after:animate-shiny-badge-slide after:bg-primary/10 relative mb-4 inline-block overflow-hidden rounded-full border-[0.5px] px-5 py-2 font-medium text-pretty uppercase backdrop-blur-sm text-shadow-lg after:absolute after:inset-0 text-lg md:text-xl">
          More About Me
        </p>
        <h2 className="text-neutrals-50 mb-6 text-3xl/tight font-bold text-balance sm:text-4xl/tight md:text-5xl/tight tracking-tight">
          Terminal Of Truth
        </h2>
        <p className="text-neutrals-300 max-w-prose text-base/relaxed sm:text-lg/relaxed md:text-xl/relaxed">
          Get to know me, it&apos;s wild, funny, and a little crazy. Dive deep and you&apos;ll find
          the code that really makes me, me and what I do and what I love to do.
        </p>
      </div>

      {/* Skills and Terminal Section */}
      <AboutSkills />
    </section>
  );
}
