import { CustomCursor } from '@/components/custom-cursor';
import { GlobalStarsBackground } from '@/components/global-stars';
import { Bootloader } from '@/components/layout/bootloader';
import Footer from '@/components/layout/footer';
import { ProHeader } from '@/components/pro/pro-header';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RYZEN STUDIO - Developer Portfolio',
  description: 'Full-Stack Developer - Professional Portfolio',
  alternates: {
    canonical: 'https://ryzenstudio.com/pro',
  },
  openGraph: {
    title: 'RYZEN STUDIO - Developer Portfolio',
    description: 'Full-Stack Developer - Professional Portfolio',
    url: 'https://ryzenstudio.com/pro',
    siteName: 'RYZEN STUDIO',
    type: 'website',
    images: [
      {
        url: '/images/riyaz-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Riyaz - Full-Stack Developer',
      },
    ],
  },
};

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutrals-900 text-neutrals-50">
      <SmoothScrollProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-neutrals-50 focus:px-4 focus:py-2 focus:text-neutrals-900">
          Skip to main content
        </a>
        <Bootloader />
        <CustomCursor />
        <GlobalStarsBackground />
        <ProHeader />
        {children}
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
