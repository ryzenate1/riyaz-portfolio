import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Italianno } from "next/font/google";
import { ContentProtection } from "@/components/content-protection";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italianno",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d4af37" },
    { media: "(prefers-color-scheme: dark)", color: "#060918" },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://ryzenstudio.com/#person',
      name: 'Riyaz Akthar',
      alternateName: ['Riyaz', 'RYZEN'],
      url: 'https://ryzenstudio.com/pro',
      jobTitle: 'Full-Stack Developer',
      description:
        'Riyaz Akthar is a Full-Stack Developer and Mechanical Engineering student at BSA Crescent Institute of Science & Technology, Chennai.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'BSA Crescent Institute of Science & Technology',
      },
      knowsAbout: [
        'Web Development',
        'Next.js',
        'React',
        'UI/UX Design',
        'Cloud Computing',
        'Distributed Systems',
        'Developer Tools',
        'Artificial Intelligence',
        'Virtualization',
      ],
      sameAs: [
        'https://www.linkedin.com/in/riyazakthar',
        'https://github.com/ryzenate1',
        'https://instagram.com/ryzenvfx',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ryzenstudio.com/#website',
      url: 'https://ryzenstudio.com/',
      name: 'RYZEN STUDIO',
      publisher: { '@id': 'https://ryzenstudio.com/#person' },
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Riyaz Akthar — Full-Stack Developer | RYZEN STUDIO",
    template: "%s | RYZEN STUDIO",
  },
  description: "Riyaz Akthar is a Full-Stack Developer and Mechanical Engineering student at BSA Crescent Institute of Science & Technology, Chennai. Explore demo UI/UX projects, interactive games, and creative experiments.",
  keywords: ["Riyaz Akthar", "Riyaz", "RYZEN STUDIO", "Full-Stack Developer Chennai", "Mechanical Engineering BSA Crescent", "Next.js developer", "React developer", "UI UX designer", "web development portfolio", "ryzenvfx"],
  authors: [{ name: "Riyaz Akthar", url: "https://www.linkedin.com/in/riyazakthar" }],
  creator: "Riyaz Akthar",
  publisher: "RYZEN STUDIO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryzenstudio.com",
    siteName: "RYZEN STUDIO",
    title: "Riyaz Akthar — Full-Stack Developer | RYZEN STUDIO",
    description: "Full-Stack Developer and Mechanical Engineering student in Chennai. Demo UI/UX projects, games, and experiments.",
    images: [
      {
        url: "/images/riyaz-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Riyaz Akthar - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyaz Akthar — Full-Stack Developer | RYZEN STUDIO",
    description: "Full-Stack Developer and Mechanical Engineering student in Chennai. Demo UI/UX projects, games, and experiments.",
    images: ["/images/riyaz-profile.jpg"],
  },
  alternates: {
    canonical: "https://ryzenstudio.com",
  },
  metadataBase: new URL("https://ryzenstudio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for faster resolution */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${italianno.variable} antialiased font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ContentProtection>
          {children}
        </ContentProtection>
      </body>
    </html>
  );
}
