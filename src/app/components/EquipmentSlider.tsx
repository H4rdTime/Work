// components/EquipmentSlider.tsx - Слайдер оборудования на главной (app/page.tsx)
"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabase';

// Тип данных для оборудования
interface Equipment {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
}

const EquipmentSlider = () => {
  // Состояния компонента
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Инициализация слайдера
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 1024px)": { slidesToScroll: 1 }
      }
    },
    [Autoplay({ delay: 5000 }), WheelGesturesPlugin()]
  );

  // Загрузка данных
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data, error } = await supabase
          .from('equipment')
          .select('*')
          .order('price', { ascending: true });

        if (error) throw error;
        setEquipment(data || []);
      } catch (err) {
        setError('Ошибка загрузки оборудования');
        console.error('Ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // Обработчик изменения слайда
  useEffect(() => {
    if (!emblaApi) return;
    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", updateIndex);
    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi]);

  // Состояния загрузки
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse bg-gray-200 h-64 rounded-xl w-full max-w-4xl mx-auto" />
      </div>
    );
  }

  // Обработка ошибок
  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        {error}. Обновите страницу
      </div>
    );
  }

  return (
    <section className="px-4 py-8 container mx-auto">
      <div className="border-b border-black/10 mb-8"></div>

      <h2 className="text-center font-bold text-3xl text-[#218CE9] mb-8">
        КАКОЕ ОБОРУДОВАНИЕ У НАС ЗАКАЗЫВАЮТ
      </h2>

      <div className="flex items-center gap-4">
        {/* Навигационные кнопки */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Контейнер слайдов */}
        <div className="embla overflow-hidden flex-1" ref={emblaRef}>
          <div className="embla__container flex gap-3">
            {equipment.map((item) => (
              <div
                className="embla__slide flex-[0_0_280px]"
                key={item.id}
              >
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#218CE9] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {item.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-lg font-bold text-[#218CE9] mb-3">
                        {item.price}
                      </p>
                      <button className="w-full bg-[#218CE9] text-white py-2 rounded-lg hover:bg-[#1a6fb9] transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Пагинация */}
      <div className="flex justify-center gap-2 mt-6">
        {equipment.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-opacity ${selectedIndex === index ? 'opacity-100' : 'opacity-30'
              } bg-[#218CE9]`}
          />
        ))}
      </div>

      {/* Кнопка "Посмотреть все" */}
      <div className="flex justify-center mt-8">
        <Link
          href="/equipment"
          className="bg-[#218CE9] text-white px-6 py-2 rounded-full hover:bg-[#1a6fb9] transition-colors"
        >
          Весь каталог →
        </Link>
      </div>
    </section>
  );
};

export default EquipmentSlider;