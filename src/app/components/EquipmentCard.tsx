'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBlurDataURL } from "@/lib/image-utils"; // или корректный путь

interface EquipmentCardProps {
  equipment: {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
  };
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const [blurData, setBlurData] = useState<string>("");

  useEffect(() => {
    getBlurDataURL(equipment.image_url)
      .then(setBlurData)
      .catch((error) => {
        console.error("Ошибка загрузки blurData:", error);
        setBlurData(""); 
      });
  }, [equipment.image_url]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
      <div className="relative h-48 w-full mb-4 flex-shrink-0">
        <Image
          src={equipment.image_url}
          alt={equipment.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          {...(blurData ? { placeholder: "blur", blurDataURL: blurData } : {})}
        />
      </div>
      <h3 className="text-xl font-bold text-[#218CE9] mb-2">
        {equipment.title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{equipment.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-[#218CE9]">
          от {equipment.price.toLocaleString('ru-RU')} ₽
        </span>
        <a
          href={`/equipment/${encodeURIComponent(equipment.category)}`}
          className="text-sm bg-blue-100 text-[#218CE9] px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
        >
          
          {equipment.category}
        </a>
      </div>
    </div>
  );
}
