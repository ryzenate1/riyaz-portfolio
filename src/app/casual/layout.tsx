import type { Metadata } from 'next';
import { Outfit, Caveat } from 'next/font/google';
import { CasualHeader } from '@/components/casual/casual-header';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import '@/styles/casual-theme.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  // Decorative accent font: skip preload to save a render-blocking request.
  preload: false,
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Riyaz - Personal',
  description: 'Welcome to my personal space. I like making fun, interactive things with code.',
  alternates: {
    canonical: 'https://ryzenstudio.com/casual',
  },
  openGraph: {
    title: 'Riyaz - Personal',
    description: 'Welcome to my personal space. I like making fun, interactive things with code.',
    url: 'https://ryzenstudio.com/casual',
    siteName: 'RYZEN STUDIO',
    type: 'website',
    images: [
      {
        url: '/images/riyaz-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Riyaz - Developer, Athlete, Creator',
      },
    ],
  },
};

export default function CasualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div 
        className={`casual-page ${outfit.variable} ${caveat.variable}`} 
        style={{ fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif' }}
      >
        <CasualHeader />
        {children}
      </div>
    </SmoothScrollProvider>
  );
}
