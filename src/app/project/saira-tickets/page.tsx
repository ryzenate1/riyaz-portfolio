import { Container } from '@/components/ui/container';
import { ScrollProgress } from '@/components/scroll-progress';
import ContactSection from '@/components/sections/contact';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saira Tickets ― Projects',
  description: 'Modern ticket booking interface with seamless seat selection and payment flow.',
};

export default function SairaTicketsProject() {
  return (
    <>
      <ScrollProgress />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <Container>
            <Link href="/#work" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
              ← Back to work
            </Link>
            
            <div className="mt-8 mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">UI/UX</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">Booking System</span>
                <span className="text-xs font-mono text-neutrals-400 bg-neutrals-800 px-2 py-1 rounded">Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-medium text-neutrals-100 mb-4">Saira Tickets</h1>
              <p className="text-lg text-neutrals-400 max-w-2xl">
                A modern ticket booking interface designed for seamless user experience with intuitive 
                seat selection and streamlined payment flow.
              </p>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutrals-900 border border-neutrals-800 mb-16">
              <Image
                src="/projects/saira-tickets.jpg"
                alt="Saira Tickets - Booking Platform Design"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Role</h3>
                <p className="text-neutrals-200">UI/UX Designer</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Timeline</h3>
                <p className="text-neutrals-200">2024</p>
              </div>
              <div>
                <h3 className="text-sm text-neutrals-500 uppercase tracking-wider mb-2">Deliverables</h3>
                <p className="text-neutrals-200">UI Design, Prototypes, Design System</p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl">
              <h2 className="text-2xl font-medium text-neutrals-100 mb-6">About the Project</h2>
              <div className="space-y-4 text-neutrals-400">
                <p>
                  Saira Tickets is a comprehensive ticket booking platform design focused on creating 
                  a delightful user experience for event-goers and travelers alike.
                </p>
                <p>
                  The design features an interactive seat map with real-time availability, 
                  a streamlined checkout process, and a cohesive visual language that guides 
                  users through their booking journey.
                </p>
                <p>
                  Special attention was given to mobile responsiveness and accessibility, 
                  ensuring the platform works seamlessly across all devices and for all users.
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
