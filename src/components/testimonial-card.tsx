import { type Testimonial } from '@/lib/sanity/get-testimonials';
import { generateImageSizeProps } from '@/lib/sanity/sanity-image';

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <li className="border-neutrals-200/20 bg-radial-highlight relative me-6 h-full w-[32rem] max-w-[80vw] flex-[0_0_auto] rounded-lg border p-6">
      <article className="flex h-full flex-col justify-between gap-y-2">
        <blockquote className="text-neutrals-200 max-w-prose text-sm/relaxed">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="mt-6 flex items-center">
          <div className="me-3 flex">
            <div className="bg-shiny-frame h-10 w-10 overflow-hidden rounded-full border border-transparent">
              <img
                alt={(testimonial.logo ?? testimonial.avatar).alt}
                className="h-full w-full"
                style={{
                  backgroundColor: (testimonial.logo ?? testimonial.avatar).asset.metadata.palette
                    .dominant.background,
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
                <img
                  alt={testimonial.avatar.alt}
                  className="h-full w-full"
                  style={{
                    backgroundColor: testimonial.avatar.asset.metadata.palette.dominant.background,
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
              <h3 className="mb-0.5 leading-tight not-italic max-lg:text-sm">{testimonial.name}</h3>
            </cite>
            <p className="text-neutrals-200 text-xs lg:text-sm">{testimonial.title}</p>
          </div>
        </div>
      </article>
    </li>
  );
}
