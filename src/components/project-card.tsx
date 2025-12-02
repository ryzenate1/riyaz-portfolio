import Link from 'next/link';
import Image from 'next/image';
import { type Project } from '@/lib/sanity/get-projects';
import { generateImageSizeProps } from '@/lib/sanity/sanity-image';

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const imageProps = generateImageSizeProps({ image: project.poster });

  return (
    <Link
      href={`/project/${project.slug.current}`}
      aria-label={`Show ${project.name} project details`}
      className="border-neutrals-200/20 bg-radial-highlight relative flex-1 grow rounded-lg border p-4 transition-transform duration-300 focus-visible:-translate-y-2 focus-visible:scale-[1.01] focus-visible:drop-shadow-lg md:p-8 md:hover:-translate-y-2 md:hover:scale-[1.01] md:hover:drop-shadow-lg"
    >
      <Image
        alt={project.poster.alt}
        src={imageProps.src}
        width={imageProps.width}
        height={imageProps.height}
        className="aspect-video w-full rounded-md object-cover object-center"
        style={{
          backgroundColor: project.poster.asset.metadata.palette.dominant.background,
        }}
        sizes={imageProps.sizes}
      />
      <article className="mt-8 flex flex-col items-center gap-y-2 text-center">
        <h3 className="text-2xl font-bold md:text-3xl">{project.name}</h3>
        {project.tags && <p className="text-neutrals-300 mb-2 text-sm">{project.tags.join(', ')}</p>}
        <p className="text-neutrals-200 max-w-prose text-base/relaxed text-pretty">
          {project.description}
        </p>
      </article>
    </Link>
  );
}
