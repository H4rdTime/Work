"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const equipmentItems = [
  {
    title: "НАСОСНОЕ ОБОРУДОВАНИЕ",
    description: "Погружные и поверхностные насосы для подачи воды из скважин",
    price: "от 20 000 ₽",
    image: "/images/sliderEq1.png",
  },
  {
    title: "СИСТЕМЫ ОЧИСТКИ ВОДЫ",
    description: "Комплексные решения для удаления примесей и бактерий",
    price: "от 20 000 ₽",
    image: "/images/sliderEq2.png",
  },
  {
    title: "ЗАЩИТА ОТ ЗАМЕРЗАНИЯ",
    description: "Оборудование для предотвращения замерзания труб зимой",
    price: "от 20 000 ₽",
    image: "/images/sliderEq3.png",
  },
  {
    title: "ЗАПЧАСТИ И АКСЕССУАРЫ",
    description: "Комплектующие для монтажа и ремонта систем",
    price: "от 20 000 ₽",
    image: "/images/sliderEq3.png",
  },
];

const EquipmentSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 1024px)": { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 5000 }), WheelGesturesPlugin()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", updateIndex);
    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi]);

  return (
    <div className="px-4 py-4 container mx-auto md:max-w-full md:px-8 md:py-8">
      <div className="border-b border-black/10 mb-4 md:mb-6"></div>
      <h2 className="text-center font-bold text-2xl text-[#218CE9] mb-6 md:text-4xl md:mb-8">
        ОБОРУДОВАНИЕ
      </h2>

      <div className="flex items-center">
        {/* Левая кнопка навигации (только для md и выше) */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:block bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
        >
          <svg
            className="w-6 h-6 text-[#218CE9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Основной контейнер слайдера */}
        <div className="embla overflow-hidden mx-4 flex-1" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {equipmentItems.map((item, index) => (
              <div
                className="embla__slide flex-none w-[150px] md:w-[280px]"
                key={index}
              >
                <div className="bg-[#F5F5F5] rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
                  <div className="h-40 md:h-48 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-left font-bold text-lg md:text-2xl text-[#218CE9] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-left font-thin italic text-sm md:text-base text-[#666666] flex-grow line-clamp-4">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-left font-bold text-base md:text-xl text-[#218CE9]">
                        {item.price}
                      </p>
                      <button className="w-full h-9 mt-2 bg-[#218CE9] text-white font-bold text-xs md:text-base rounded-lg hover:bg-[#1a6fb9] transition-colors">
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая кнопка навигации (только для md и выше) */}
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:block bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
        >
          <svg
            className="w-6 h-6 text-[#218CE9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Пагинация */}
      <div className="flex justify-center mt-6 gap-2">
        {equipmentItems.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-opacity ${
              selectedIndex === index
                ? "bg-[#218CE9] opacity-100"
                : "bg-[#218CE9] opacity-30"
            }`}
          />
        ))}
      </div>

      {/* Кнопка "Посмотреть все" */}
      <div className="flex justify-center mt-8">
        <button className="bg-[#218CE9] text-white font-bold text-base rounded-full px-8 py-3 hover:bg-[#1a6fb9] transition-colors">
          Посмотреть все
        </button>
      </div>
    </div>
  );
};

export default EquipmentSlider;
