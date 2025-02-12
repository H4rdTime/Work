"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
    image: "/images/sliderEq4.png",
  },
];

const EquipmentSlider = () => {
    return (
      <div className="px-4 py-4 max-w-[390px] mx-auto">
        <div className="border-b border-black border-opacity-10 mb-4"></div>
  
        <h2 className="text-center font-bold text-[32px] text-[#218CE9] mb-6">
          ОБОРУДОВАНИЕ
        </h2>
  
        <Swiper spaceBetween={6} slidesPerView="auto" loop={true}>
          {equipmentItems.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "175px" }}>
              <div className="h-[500px] bg-[#F5F5F5] rounded-xl overflow-hidden shadow-lg flex flex-col">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover h-[175px]"
                />
                <div className="p-2 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Изменено здесь */}
                    <h3 className="text-left font-bold text-[19px] md:text-[24px] text-[#218CE9]">
                      {item.title}
                    </h3>
                    <p className="text-left font-thin italic text-[16px] text-[#666666] mt-2">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-left font-bold text-[20px] text-[#218CE9] mb-2">
                      {item.price}
                    </p>
                    <button className="w-full h-[35px] bg-[#218CE9] text-[#fff] font-bold text-[14px] rounded-[10px]">
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  
        <div className="flex justify-center mt-6">
          <button className="w-full bg-[#218CE9] text-white font-bold text-[16px] rounded-[62px] py-2 px-6">
            Посмотреть все
          </button>
        </div>
      </div>
    );
  };
export default EquipmentSlider;