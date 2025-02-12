// src/app/components/Hero.tsx
import React from "react";

const Hero = () => {
    return (
        <section className="max-w-[390px] mx-auto p-4 bg-gradient-to-b from-blue-100 to-white text-left">
            {/* Заголовок */}
            <h2 className="text-[#218CE9] text-3xl md:text-4xl font-bold mb-4">
                БУРЕНИЕ СКВАЖИН ПОД КЛЮЧ
            </h2>

            {/* Описание */}
            <p className="text-black text-opacity-60 text-sm md:text-base max-w-2xl mb-6">
                Профессиональное обустройство источников воды с гарантией 10 лет.
                Учитываем особенности вашего участка, чтобы обеспечить чистой водой круглый год.
            </p>

            {/* Кнопка */}
            <button className="w-full md:w-auto px-8 py-3 bg-[#218CE9] text-white 
                       text-base md:text-lg font-bold rounded-[62px] hover:bg-[#1a70c0] 
                       transition-colors duration-200">
                Заказать звонок
            </button>
            {/* Блок статистики */}
            <div className="max-w-xl mx-auto">
                <div className="grid grid-cols-2 gap-4 md:gap-8 mt-5 mx-5">
                    {/* Первый блок */}
                    <div className="text-left">
                        <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">15+</div>
                        <div className="text-xs md:text-sm text-gray-600 mt-1">
                            Лет опыта на рынке
                        </div>
                    </div>

                    {/* Второй блок */}
                    <div className="text-left">
                        <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">
                            1,200+
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 mt-1">
                            Скважин с 2010 года
                        </div>
                    </div>

                    {/* Третий блок (98%) */}
                    <div className="col-span-2">
                        <div className="w-fit mx-auto text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">98%</div>
                            <div className="text-xs md:text-sm text-gray-600 mt-1">
                                Клиентов рекомендуют нас
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img
                src="/images/hero.jpeg"
                alt="Статистика бурения"
                className="mt-5 w-full max-w-md mx-auto rounded-[20px]"
            />
        </section>
    );
};

export default Hero;