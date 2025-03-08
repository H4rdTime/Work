// components/ServiceCard.tsx
'use client';
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  area_served: string[] | null; // Добавляем возможность null
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Создаем безопасную версию массива
  const areas = service.area_served || [];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      <div itemScope itemType="https://schema.org/Service">
        <meta itemProp="serviceType" content={service.title} />
        <div itemProp="provider" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="АкваСервис" />
        </div>
        {areas.map((area, i) => (
          <meta key={i} itemProp="areaServed" content={area} />
        ))}
      </div>

      {service.image_url && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={service.image_url}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            itemProp="image"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-[#218CE9] mb-2" itemProp="name">
          {service.title}
        </h2>

        <p className="text-gray-600 mb-4 flex-grow" itemProp="description">
          {service.description}
        </p>

        <div className="mt-auto">
          <span
            className="font-bold text-[#218CE9] text-lg"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="RUB" />
            <span itemProp="price">{service.price.toLocaleString('ru-RU')}</span> ₽
          </span>

          {/* Безопасное отображение городов */}
          <div className="mt-2 text-sm text-gray-500">
            Доступно в: {areas.length > 0 ? areas.join(', ') : 'Все регионы'}
          </div>
        </div>
      </div>
    </div>
  );
}