// components/CategoryCard.tsx
'use client'
import Image from "next/image";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image_url: string;
    description: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={`/equipment/${encodeURIComponent(category.name)}`}
      className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative h-48 w-full">
        <Image
          src={category.image_url}
          alt={category.name}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-xl font-bold mb-1 drop-shadow-lg">
          {category.name}
        </h2>
        <p className="text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
          {category.description}
        </p>
      </div>
    </a>
  );
}