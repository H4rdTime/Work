import React from "react";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="container mx-auto sm:hidden w-full p-4 bg-gradient-to-b from-blue-100 to-white text-left">
            {/* Заголовок */}
            <h2 className="text-[#218CE9] text-3xl font-bold mb-4 text-center">
                БУРЕНИЕ СКВАЖИН ПОД КЛЮЧ
            </h2>

            {/* Описание */}
            <p className="text-black text-opacity-60 text-sm max-w-2xl mx-auto mb-6">
                Профессиональное обустройство источников воды с гарантией 10 лет.
                Учитываем особенности вашего участка, чтобы обеспечить чистой водой круглый год.
            </p>

            {/* Кнопка */}
            <button className="w-full px-8 py-3 bg-[#218CE9] text-white text-base font-bold rounded-[62px] hover:bg-[#1a70c0] transition-colors duration-200">
                Заказать звонок
            </button>

            {/* Блок статистики */}
            <div className="max-w-xl mx-auto">
                <div className="grid grid-cols-2 gap-4 mt-5 mx-5">
                    <div className="text-left">
                        <div className="text-2xl font-bold text-[#218CE9]">15+</div>
                        <div className="text-xs text-gray-600 mt-1">
                            Лет опыта на рынке
                        </div>
                    </div>

                    <div className="text-left">
                        <div className="text-2xl font-bold text-[#218CE9]">
                            1,200+
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                            Скважин с 2010 года
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="w-fit mx-auto text-center">
                            <div className="text-2xl font-bold text-[#218CE9]">98%</div>
                            <div className="text-xs text-gray-600 mt-1">
                                Клиентов рекомендуют нас
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Image
                src="/images/hero.jpeg"
                alt="Статистика бурения"
                width={800}
                height={600}
                className="mt-5 w-full mx-auto rounded-[20px]"
                priority
            />
        </section>
    );
};

export default Hero;