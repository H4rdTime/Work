"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const services = [
  {
    title: "БУРЕНИЕ СКВАЖИН",
    description: "Глубина: 80-200 м. Гарантия 10 лет",
    price: "80 000 ₽",
    image: "/images/slider1.png",
  },
  {
    title: "ОЧИСТКА ВОДЫ",
    description: "Фильтры и системы. Чистая вода 24/7",
    price: "20 000 ₽",
    image: "/images/slider2.png",
  },
  {
    title: "УСТАНОВКА СЕПТИКОВ",
    description: "Монтаж современных септиков для частных домов",
    price: "85 000 ₽",
    image: "/images/slider3.png",
  },
];

const ServicesSlider = () => {
  return (
    
    <div className="px-4 py-4 max-w-[390px] mx-auto">
      {/* Заголовок блока */}

      <div className="border-b border-black border-opacity-10 mb-4"></div>

      <h2 className="text-center font-bold text-[32px] text-[#218CE9] mb-6">НАШИ УСЛУГИ</h2>

      <Swiper spaceBetween={6} slidesPerView="auto" loop={true}>
        {services.map((service, index) => (
          <SwiperSlide key={index} style={{ width: "175px" }}>
            <div className=" h-[400px] bg-[#F5F5F5] rounded-xl overflow-hidden shadow-lg flex flex-col">
              {/* Изображение */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full object-cover"
              />
              {/* Контент карточки */}
              <div className="p-2 flex flex-col flex-grow">
                {/* Заголовок услуги */}
                <h3 className="text-left font-bold text-[24px] text-[#218CE9]">
                  {service.title}
                </h3>
                {/* Описание услуги */}
                <p className="text-left font-thin italic text-[16px] text-[#666666]">
                  {service.description}
                </p>
                {/* Заполнитель, чтобы цена и кнопка оказались внизу */}
                <div className="flex-grow"></div>
                {/* Цена */}
                <p className="text-left font-bold text-[20px] text-[#218CE9]">
                  от {service.price}
                </p>
                {/* Кнопка "Заказать" */}
                <button className="mx-auto w-full h-[35px] mt-2 bg-[#218CE9] text-[#fff] font-bold text-[14px] rounded-[10px] py-1 px-3">
                  Заказать
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Кнопка "Посмотреть все" под слайдером */}
      <div className="flex justify-center mt-6">
        <button className="w-full bg-[#218CE9] text-white font-bold text-[16px] rounded-[62px] py-2 px-6">
          Посмотреть все
        </button>
      </div>
    </div>
  );
};

export default ServicesSlider;
