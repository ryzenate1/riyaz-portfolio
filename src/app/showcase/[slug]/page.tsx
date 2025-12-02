import { ProjectShowcasePage } from '@/components/project-showcase-page';
import { notFound } from 'next/navigation';

const validSlugs = ['kadal-thunai', 'busbuddy', 'saira-tickets'];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <ProjectShowcasePage slug={slug} />;
}
