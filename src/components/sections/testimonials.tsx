import { StarsBackground } from '@/components/stars-background';
import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Caption, Heading, Paragraph } from '@/components/ui/typography';
import Image from 'next/image';

// Testimonial author type
type TestimonialAuthor = {
  name: string;
  position: string;
  avatar: string;
};

// Testimonial type
type Testimonial = {
  id: number;
  quote: string;
  authors: TestimonialAuthor[];
};

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We had the pleasure of working with Ryzen on a critical project for our business: migrating our webshop from WooCommerce to Shopify. Choosing Ryzen as the right person for the job was paramount and the communication was outstanding. His expertise, professionalism, and dedication to our project were evident in every interaction. We would not hesitate to recommend Ryzen as he is a true professional who delivers outstanding results.",
    authors: [
      {
        name: "Olaolu Fajembola",
        position: "Founder of Tebalou GmbH",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      {
        name: "Tebogo Nimindé-Dundadengar",
        position: "Co-Founder of Tebalou GmbH",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 2,
    quote: "Great to work with Ryzen! Ryzen is very responsive and skilled professional designer, who enriches your views with pretty creativity! Will sure work with Ryzen again!",
    authors: [
      {
        name: "Yasser Chehade",
        position: "CEO of BEE PaPS GmbH & Co. KG",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 3,
    quote: "Ryzen immediately understood my idea and vision. He was super professional and at the same time really honest and real, which gave me really good guidance and feedback throughout the whole process. He worked really fast and I had nothing I wanted to change about the result. It turned out exactly how I wanted it to.",
    authors: [
      {
        name: "Malou Idler",
        position: "Mediator, Systemic Coach, Supervisor & Consultant",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 4,
    quote: "With his high level of professionalism and intuitive sense of digital design, Ryzen has created an incredibly customized website branding for my business that is simply mind blowing. You better choose RYZEN STUDIO.",
    authors: [
      {
        name: "Caroline Seiffert",
        position: "Visual Artist",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 5,
    quote: "Ryzen understood and executed our vision with precision and creativity. Always up to hire him again.",
    authors: [
      {
        name: "Peer Joeressen",
        position: "Co-Founder of Aviana Development",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face"
      }
    ]
  },
  {
    id: 6,
    quote: "Working with Ryzen was an absolute pleasure. He's incredibly versatile. Be it UI/UX design or development, he approaches everything with a creative mindset. Would definitely recommend and have had honor to work with him multiple times.",
    authors: [
      {
        name: "Matthew Richardson",
        position: "Senior Developer at Tech Innovations",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      }
    ]
  }
];

const reversedTestimonials = [...testimonials].reverse();

// Reusable Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <li className="border-neutrals-200/20 bg-radial-highlight relative me-6 h-full w-[32rem] max-w-[80vw] flex-[0_0_auto] rounded-lg border p-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <StarsBackground />
      </div>
      <article className="flex h-full flex-col justify-between gap-y-2 relative z-10">
        <blockquote className="text-neutrals-200 max-w-prose text-sm/relaxed">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="mt-6 flex items-center">
          <div className="me-3 flex">
            {testimonial.authors.map((author, index) => (
              <div 
                key={index} 
                className={`bg-shiny-frame h-10 w-10 overflow-hidden rounded-full border border-transparent relative ${index > 0 ? '-ms-3' : ''}`}
              >
                <Image
                  src={author.avatar}
                  alt=""
                  fill
                  sizes="40px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="mb-0.5 leading-tight max-lg:text-sm text-neutrals-50 font-semibold">
              <cite className="not-italic">
                {testimonial.authors.length === 1 
                  ? testimonial.authors[0]?.name
                  : testimonial.authors.map(author => author.name).join(' & ')}
              </cite>
            </p>
            <p className="text-neutrals-200 text-xs lg:text-sm">{testimonial.authors[0]?.position}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

// Reusable Testimonial Row Component
function TestimonialRow({ items, isReversed = false, ariaHidden = false }: { 
  items: Testimonial[]; 
  isReversed?: boolean; 
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className={`group-hover:paused motion-reduce:paused animate-marquee flex ${isReversed ? '[animation-direction:reverse]' : ''}`}
    >
      {items.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </ul>
  );
}

export default function TestimonialsSection() {
  return (
    <Section
      id="stories"
      aria-labelledby="stories-heading"
      hasBorderTop
      hasGlowEffect
    >
      <StarsBackground />
      <Container>
        <div className="mb-16 flex flex-col items-center text-center">
          <Caption id="stories-heading">Customer Stories</Caption>
          <Heading className="tracking-tight">Trusted by the kindest clients</Heading>
          <Paragraph>
            Here&apos;s a glimpse into the heartfelt experiences of our incredible clients.<br />Your
            trust fuels our passion.
          </Paragraph>
        </div>
      </Container>
      
      {/* Forward scrolling row */}
      <div className="group mb-6 flex w-full overflow-x-clip mask-x-from-80%">
        <TestimonialRow items={testimonials} />
        <TestimonialRow items={testimonials} ariaHidden />
      </div>
      
      {/* Reverse scrolling row */}
      <div className="group flex w-full overflow-x-clip mask-x-from-80%">
        <TestimonialRow items={reversedTestimonials} isReversed ariaHidden />
        <TestimonialRow items={reversedTestimonials} isReversed ariaHidden />
      </div>
    </Section>
  );
}
