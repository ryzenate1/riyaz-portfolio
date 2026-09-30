import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { Paragraph } from '@/components/ui/typography';
import { type ProjectSection as ProjectSectionType } from '@/lib/sanity/get-projects';
import { generateImageSizeProps } from '@/lib/sanity/sanity-image';
import { cn } from '@/lib/utils';

type Props = {
  section: ProjectSectionType;
  previousSectionType?: ProjectSectionType['_type'] | undefined;
  nextSectionType?: ProjectSectionType['_type'] | undefined;
};

export default function ProjectSection({ section, previousSectionType, nextSectionType }: Props) {
  switch (section._type) {
    case 'textblock':
      return (
        <Section
          className="min-h-auto"
          hasBorderTop
        >
          <Container className="flex items-center justify-center">
            <Paragraph className="text-center">{section.text}</Paragraph>
          </Container>
        </Section>
      );
    case 'imageWithText':
      return (
        <Container className="flex items-center gap-10 max-lg:flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images */}
          <img
            alt={section.image.alt}
            loading="lazy"
            decoding="async"
            className={cn('rounded-lg lg:w-1/2', section.imagePosition === 'right' && 'order-1')}
            style={{
              backgroundColor: section.image.asset.metadata.palette.dominant.background,
            }}
            {...generateImageSizeProps({ image: section.image, maxWidth: 1536 / 2 })}
          />
          <div className={cn('lg:w-1/2', section.imagePosition === 'right' && 'lg:text-right')}>
            <Paragraph>{section.text}</Paragraph>
          </div>
        </Container>
      );
    case 'image':
      const image = section;
      return (
        <Container className="max-sm:w-auto">
          {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images */}
          <img
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              'w-full rounded-lg',
              previousSectionType === 'image' && 'rounded-t-none',
              nextSectionType === 'image' && 'rounded-b-none',
            )}
            style={{
              backgroundColor: image.asset.metadata.palette.dominant.background,
            }}
            {...generateImageSizeProps({ image, maxWidth: 1536 })}
          />
        </Container>
      );
    case 'testimonial':
      const testimonial = section;
      return (
        <Section
          className="min-h-auto"
          hasBorderTop
        >
          <Container className="flex items-center justify-center">
            <article className="flex h-full flex-col justify-between gap-y-2">
              <Paragraph>&quot;{testimonial.quote}&quot;</Paragraph>
              <div className="mt-6 flex items-center">
                <div className="me-3 flex">
                  <div className="bg-shiny-frame h-10 w-10 overflow-hidden rounded-full border border-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images */}
                    <img
                      alt={(testimonial.logo ?? testimonial.avatar).alt}
                      loading="lazy"
                      decoding="async"
                      className="size-full"
                      style={{
                        backgroundColor: (testimonial.logo ?? testimonial.avatar).asset.metadata
                          .palette.dominant.background,
                      }}
                      {...generateImageSizeProps({
                        image: testimonial.logo ?? testimonial.avatar,
                        sizes: '160px',
                        width: 40,
                        height: 40,
                        maxWidth: 160,
                      })}
                    />
                  </div>
                  {testimonial.logo && (
                    <div className="bg-shiny-frame -ms-3 h-10 w-10 overflow-hidden rounded-full border border-transparent">
                      {/* eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images */}
                      <img
                        alt={testimonial.avatar.alt}
                        loading="lazy"
                        decoding="async"
                        className="size-full"
                        style={{
                          backgroundColor:
                            testimonial.avatar.asset.metadata.palette.dominant.background,
                        }}
                        {...generateImageSizeProps({
                          image: testimonial.avatar,
                          sizes: '160px',
                          width: 40,
                          height: 40,
                          maxWidth: 160,
                        })}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <cite>
                    <h3 className="mb-0.5 leading-tight not-italic max-lg:text-sm">
                      {testimonial.name}
                    </h3>
                  </cite>
                  <p className="text-neutrals-200 text-xs lg:text-sm">{testimonial.title}</p>
                </div>
              </div>
            </article>
          </Container>
        </Section>
      );
    default:
      return null;
  }
}
