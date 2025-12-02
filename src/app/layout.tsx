import { CustomCursor } from '@/components/custom-cursor';
import { GlobalStarsBackground } from '@/components/global-stars';
import { Bootloader } from '@/components/layout/bootloader';
import Footer from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import type { Metadata } from "next";
import { Space_Grotesk, Italianno } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italianno",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RYZEN STUDIO",
  description: "Web Design & Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scheme-dark">
      <body
        className={`${spaceGrotesk.variable} ${italianno.variable} bg-neutrals-900 text-neutrals-50 selection:bg-primary selection:text-neutrals-50 antialiased font-sans`}
      >
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only"
          >
            Skip to main content
          </a>
          <Bootloader />
          <CustomCursor />
          <GlobalStarsBackground />
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
