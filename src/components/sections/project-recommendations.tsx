import ProjectCard from '@/components/project-card';
import { Container } from '@/components/ui/container';
import { Icons } from '@/components/ui/icons';
import Section from '@/components/ui/section';
import { Caption, Heading } from '@/components/ui/typography';
import { type Project, getProjects } from '@/lib/sanity/get-projects';
import { shuffleArray } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  project: Project;
};

export default async function ProjectRecommendationsSection({ project }: Props) {
  const projects = await getProjects();

  const otherSimilarProjects = shuffleArray(projects)
    .filter((currentProject) => currentProject._id !== project._id)
    .filter((currentProject) => currentProject.tags?.some((tag) => project.tags?.includes(tag)))
    .slice(0, 2);

  return (
    <Section
      aria-labelledby="related-projects-heading"
      hasGlowEffect
      hasBorderTop
      className="min-h-full"
    >
      <Container>
        <div className="flex flex-col items-center justify-center text-center">
          <Caption id="related-projects-heading">Similar projects</Caption>
          <Heading>Discover new worlds</Heading>
          <div className="mt-4 flex gap-4 max-md:flex-col">
            {otherSimilarProjects.map((otherSimilarProject) => (
              <ProjectCard key={otherSimilarProject._id} project={otherSimilarProject} />
            ))}
          </div>
          <Link
            href="/pro#work"
            className="group hover:text-primary focus-visible:text-primary mt-8 inline-flex items-center justify-center text-lg transition-colors duration-300"
          >
            <Icons.ArrowLongLeft
              aria-hidden
              className="me-2 size-6 transition-transform duration-300 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 lg:h-7 lg:w-7"
            />
            {' '}Back to projects
          </Link>
        </div>
      </Container>
    </Section>
  );
}
