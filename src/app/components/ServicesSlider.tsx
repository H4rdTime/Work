// components/ServicesSlider.tsx - Слайдер услуг на главной странице (app/page.tsx)
"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabase';

// Тип данных для услуг из Supabase
interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
}

const ServicesSlider = () => {
  // Состояния компонента
  const [services, setServices] = useState<Service[]>([]);
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

  // Загрузка данных при монтировании
  useEffect(() => {
    const fetchServices = async () => {
      console.log('Fetching services...');
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*');  
        console.log('Data received:', data);
  
        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Ошибка загрузки:', JSON.stringify(err, null, 2));
        setError('Не удалось загрузить услуги');
      } finally {
        setLoading(false);
      }
    };
  
    fetchServices();
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
        <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500"></div>
      </div>
    );
  }

  // Обработка ошибок
  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        {error}. Попробуйте обновить страницу
      </div>
    );
  }

  return (
    <section className="px-4 py-8 container mx-auto">
      <div className="border-b border-black/10 mb-8"></div>
      
      <h2 className="text-center font-bold text-3xl text-[#218CE9] mb-8">
        НАШИ УСЛУГИ
      </h2>

      <div className="flex items-center gap-4">
        {/* Кнопка назад */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Контейнер слайдов */}
        <div className="embla overflow-hidden flex-1" ref={emblaRef}>
          <div className="embla__container flex gap-3">
            {services.map((service) => (
              <div 
                className="embla__slide flex-[0_0_280px]" 
                key={service.id}
              >
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-60">
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#218CE9] mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {service.description}
                    </p>

                    <div className="mt-auto">
                      <p className="text-lg font-bold text-[#218CE9] mb-3">
                        от {service.price} ₽
                      </p>
                      <button className="w-full bg-[#218CE9] text-white py-2 rounded-lg hover:bg-[#1a6fb9] transition-colors">
                        Заказать
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка вперед */}
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Пагинация */}
      <div className="flex justify-center gap-2 mt-6">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-opacity ${
              selectedIndex === index ? 'opacity-100' : 'opacity-30'
            } bg-[#218CE9]`}
          />
        ))}
      </div>

      {/* Кнопка "Посмотреть все" */}
      <div className="flex justify-center mt-8">
        <Link
          href="/services"
          className="bg-[#218CE9] text-white px-6 py-2 rounded-full hover:bg-[#1a6fb9] transition-colors"
        >
          Все услуги →
        </Link>
      </div>
    </section>
  );
};

export default ServicesSlider;