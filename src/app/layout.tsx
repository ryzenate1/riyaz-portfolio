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

export const metadata: Metadata = {
  title: {
    default: "RYZEN STUDIO - Web Design & Development",
    template: "%s | RYZEN STUDIO",
  },
  description: "Professional Web Design & Development by Riyaz. Creating modern, performant, and visually stunning digital experiences.",
  keywords: ["web development", "web design", "portfolio", "riyaz", "ryzen studio", "full-stack developer"],
  authors: [{ name: "Riyaz", url: "https://ryzenstudio.com" }],
  creator: "Riyaz",
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
    title: "RYZEN STUDIO - Web Design & Development",
    description: "Professional Web Design & Development by Riyaz",
  },
  twitter: {
    card: "summary_large_image",
    title: "RYZEN STUDIO",
    description: "Professional Web Design & Development by Riyaz",
    creator: "@ryzenstudio",
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
        <ContentProtection>
          {children}
        </ContentProtection>
      </body>
    </html>
  );
}
