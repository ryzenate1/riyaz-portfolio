import ProjectSection from '@/components/sections/project-section';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icons } from '@/components/ui/icons';
import { type Project } from '@/lib/sanity/get-projects';
import { generateImageSizeProps } from '@/lib/sanity/sanity-image';
import Link from 'next/link';

type Props = {
  project: Project;
};

export default function ProjectDetailsSection({ project }: Props) {
  return (
    <>
      <section
        aria-labelledby="project-details-heading"
        className="bg-neutrals-900 after:from-neutrals-900 after:to-neutrals-900/60 relative flex min-h-screen w-full py-[14vh] after:absolute after:inset-0 after:h-full after:w-full after:bg-gradient-to-t"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images */}
        <img
          alt={project.poster.alt}
          loading="eager"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{
            backgroundColor: project.poster.asset.metadata.palette.dominant.background,
          }}
          {...generateImageSizeProps({
            image: project.poster,
            sizes: '(max-width: 1024px) 200vw, 100vw',
          })}
        />
        <Container>
          <div className="relative z-10 flex h-full flex-col justify-end">
            <Link
              href="/#work"
              className="group absolute start-0 top-0 flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:opacity-80"
            >
              <Icons.ArrowLongLeft
                aria-hidden
                className="me-2 size-6 transition-transform duration-300 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 lg:h-7 lg:w-7"
              /> Back to projects
            </Link>
            <h1
              id="project-details-heading"
              className="mb-4 text-4xl font-bold text-balance lg:text-6xl"
            >
              {project.name}
            </h1>
            <p
              className="text-neutrals-50/90 mb-8 max-w-prose text-sm/relaxed text-pretty md:text-base/relaxed"
            >
              {project.description}
            </p>
            {
              project.tags && (
                <p className="text-neutrals-50/90 text-xs lg:text-sm">{project.tags.join(', ')}</p>
              )
            }
            <hr className="from-neutrals-50/40 mt-4 mb-8 h-px border-0 bg-gradient-to-r to-transparent" />
            <div className="flex gap-x-4">
              {
                project.projecturl && (
                  <Button
                    asChild
                    size="small"
                  >
                    <a
                      href={project.projecturl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icons.Eye
                        aria-hidden
                        className="size-5 me-2"
                      />{' '}
                      View project
                    </a>
                  </Button>
                )
              }
              {
                project.githuburl && (
                  <Button
                    asChild
                    size="small"
                    isGhost
                  >
                    <a
                      href={project.githuburl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icons.GitHub
                        aria-hidden
                        className="size-5 me-2"
                      />{' '}
                      View source code
                    </a>
                  </Button>
                )
              }
            </div>
          </div>
          {
            project.sections && project.sections.length > 0 && (
              <a
                href="#project-gallery"
                title="See project breakdown"
                aria-label="See project breakdown"
                className="absolute inset-x-0 bottom-[3vh] z-10 mx-auto w-fit animate-bounce"
              >
                <Icons.ArrowDownCircle className="size-9" />
              </a>
            )
          }
        </Container>
      </section>
      {
        project.sections && (
          <div
            id="project-gallery"
            aria-label="Project Gallery"
          >
            {project.sections.map((section, index) => (
              <ProjectSection
                key={section._key}
                section={section}
                previousSectionType={project.sections![index - 1]?._type}
                nextSectionType={project.sections![index + 1]?._type}
              />
            ))}
          </div>
        )
      }
    </>
  );
}
