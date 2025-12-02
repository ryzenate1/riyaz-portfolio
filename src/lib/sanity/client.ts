import { createClient } from 'next-sanity';
import { env } from '@/t3-env';

// Create a client only if Sanity is configured
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset,
  apiVersion: '2024-03-13',
  useCdn: false,
});

export const isSanityConfigured = Boolean(projectId);
