import AmbitionSection from '@/components/sections/ambition';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Childhood Dreams - RYZEN STUDIO',
};

export default function AmbitionPage() {
  return (
    <main id="main" className="bg-neutrals-900">
      <AmbitionSection />
    </main>
  );
}
