import NextImage from 'next/image';
import { type ComponentProps } from 'react';

type ImageMetadata = {
  src: string;
  width: number;
  height: number;
};

function Image({
  metadata,
  alt,
  isAboveTheFold = false,
  ...props
}: {
  metadata: ImageMetadata;
  alt: string;
  isAboveTheFold?: boolean | undefined;
} & Omit<ComponentProps<typeof NextImage>, 'src' | 'width' | 'height' | 'alt'>) {
  return (
    <NextImage
      src={metadata.src}
      width={metadata.width}
      height={metadata.height}
      alt={alt}
      priority={isAboveTheFold}
      {...props}
    />
  );
}

export { Image };
