// components/EquipmentCategoryCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface EquipmentCategoryCardProps {
  category: {
    name: string;
    image_url: string | null;
    description?: string;
  };
}

export default function EquipmentCategoryCard({ category }: EquipmentCategoryCardProps) {
  return (
    <Link
      href={`/equipment/${encodeURIComponent(category.name)}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="relative h-48 w-full">
        {
          category.image_url ? (
            <Image
              src={category.image_url}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Нет изображения</span>
            </div>
          )
        }
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-[#218CE9] mb-2">
          {category.name}
        </h2>
        {category.description && (
          <p className="text-gray-600 line-clamp-3">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}