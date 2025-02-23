// components/ServiceCard.tsx
'use client'
import Image from "next/image";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {service.image_url && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={service.image_url}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-[#218CE9] mb-2">
          {service.title}
        </h2>

        <p className="text-gray-600 mb-4 flex-grow">
          {service.description}
        </p>

        <div className="mt-auto">
          <span className="font-bold text-[#218CE9] text-lg">
            {service.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
}