import { CustomCursor } from '@/components/custom-cursor';
import { GlobalStarsBackground } from '@/components/global-stars';
import { Bootloader } from '@/components/layout/bootloader';
import Footer from '@/components/layout/footer';
import { ProHeader } from '@/components/pro/pro-header';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';

export const metadata = {
  title: 'RYZEN STUDIO - Developer Portfolio',
  description: 'Full-Stack Developer & Kinesiology Enthusiast - Professional Portfolio',
};

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutrals-900 text-neutrals-50">
      <SmoothScrollProvider>
        <a href="#main" className="sr-only">
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
