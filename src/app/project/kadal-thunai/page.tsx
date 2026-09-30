import { Container } from '@/components/ui/container';
import { ScrollProgress } from '@/components/scroll-progress';
import ContactSection from '@/components/sections/contact';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kadal Thunai ― Projects',
  description: 'A premium fish e-commerce platform delivering fresh seafood directly from fishermen to your doorstep.',
};

export default function KadalThunaiProject() {
  return (
    <>
      <ScrollProgress />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <Container>
            <Link href="/pro#work" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
              ← Back to work
            </Link>
            
            <div className="mt-8 mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">E-Commerce</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">Next.js</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">Stripe</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-neutrals-100 mb-4">Kadal Thunai</h1>
              <p className="text-lg text-neutrals-400 max-w-2xl">
                A premium fish e-commerce platform delivering fresh seafood directly from fishermen to your doorstep. 
                Built with modern web technologies for a seamless shopping experience.
              </p>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutrals-900 border border-neutrals-800 mb-16">
              <Image
                src="/projects/kadal-thunai.jpg"
                alt="Kadal Thunai - Fish E-commerce Platform"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Role</h3>
                <p className="text-neutrals-200">Full Stack Developer</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Timeline</h3>
                <p className="text-neutrals-200">2024</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Tech Stack</h3>
                <p className="text-neutrals-200">Next.js, TypeScript, Stripe, PostgreSQL</p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <h2 className="text-2xl font-medium text-neutrals-100 mb-6">About the Project</h2>
              <div className="space-y-4 text-neutrals-400">
                <p>
                  Kadal Thunai (meaning &quot;Ocean&apos;s Help&quot; in Tamil) is a comprehensive e-commerce platform 
                  designed to bridge the gap between local fishermen and consumers seeking fresh, quality seafood.
                </p>
                <p>
                  The platform features real-time inventory tracking, secure payment processing via Stripe, 
                  and a user-friendly interface that makes ordering fresh fish as simple as a few clicks.
                </p>
                <p>
                  Key features include geolocation-based delivery estimation, freshness guarantees, 
                  and direct support for fishing communities through fair pricing models.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <ContactSection />
      </main>
    </>
  );
}
