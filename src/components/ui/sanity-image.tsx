import { generateImageSizeProps, type Image } from '@/lib/sanity/sanity-image';
import { type ComponentProps } from 'react';

/**
 * SanityImage Component
 * 
 * Uses native <img> tag intentionally because:
 * - Sanity's CDN already provides optimized, responsive images
 * - The generateImageSizeProps handles srcset generation
 * - Sanity's image pipeline handles format conversion (WebP, AVIF)
 * - Using Next.js Image would double-optimize and add unnecessary overhead
 */
function SanityImage({
  image,
  sizes = undefined,
  maxWidth = undefined,
  width = undefined,
  height = undefined,
  isAboveTheFold = false,
  ref,
  ...props
}: {
  image: Image;
  sizes?: string | undefined;
  maxWidth?: number | undefined;
  width?: number | undefined;
  height?: number | undefined;
  isAboveTheFold?: boolean | undefined;
} & ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Sanity CDN provides optimized images
    <img
      style={{
        backgroundColor: image.asset.metadata.palette.dominant.background,
      }}
      alt={image.alt}
      loading={isAboveTheFold ? 'eager' : 'lazy'}
      decoding={isAboveTheFold ? 'sync' : 'async'}
      {...generateImageSizeProps({ image, sizes, maxWidth, width, height })}
      ref={ref}
      {...props}
    />
  );
}

export { SanityImage };
