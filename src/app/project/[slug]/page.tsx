import { ScrollProgress } from '@/components/scroll-progress';
import ContactSection from '@/components/sections/contact';
import ProjectDetailsSection from '@/components/sections/project-details';
import ProjectRecommendationsSection from '@/components/sections/project-recommendations';
import { getProjects } from '@/lib/sanity/get-projects';
import { imageUrlFor } from '@/lib/sanity/sanity-image';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug.current === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} ― Projects`,
    description: project.description,
    openGraph: {
      images: [
        {
          url: imageUrlFor(project.poster).format('png').width(1200).height(630).fit('crop').url(),
          alt: project.poster.alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug.current === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />
      <main id="main">
        <ProjectDetailsSection project={project} />
        <ContactSection />
        <ProjectRecommendationsSection project={project} />
      </main>
    </>
  );
}
