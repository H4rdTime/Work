// components/OptimizedImage.tsx
import Image from 'next/image';

export const OptimizedImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={800}
    height={600}
    quality={85}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgo..."
    className="rounded-xl"
  />
);