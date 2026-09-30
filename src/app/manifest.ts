import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RYZEN STUDIO - Web Design & Development',
    short_name: 'RYZEN STUDIO',
    description:
      'Professional Web Design & Development by Riyaz. Creating modern, performant, and visually stunning digital experiences.',
    start_url: '/casual',
    display: 'standalone',
    background_color: '#060918',
    theme_color: '#060918',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
