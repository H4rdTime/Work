// src/app/components/Advantages.tsx
'use client'
import React from 'react'
import Image from 'next/image'; // Добавить в начале файла

const Advantages = () => {
    const advantages = [
        {
            title: 'Комплексное водоснабжение',
            subtitle: 'Полное обеспечение систем водоснабжения',
            image: '/images/advantage5.png',
            content: (
                <>
                    <p className="mb-2 text-left">
                      Мы выполняем полный комплекс работ по водоснабжению загородного дома.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Бурение скважин на воду.</li>
                        <li>Обустройство скважины, монтаж водоприемного узла.</li>
                        <li>Установка системы очистки воды.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'Гарантия',
            subtitle: '«Полная ответственность за каждый метр в Карелии»',
            image: '/images/garant.png',
            content: (
                <>
                    <p className="mb-2 text-left">
                      Мы уверены в качестве работ и материалов в Петрозаводске и Республике Карелия, поэтому даем максимальную гарантию на бурение и обустройство скважин.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Бесплатное устранение любых дефектов, связанных с нашей работой.</li>
                        <li>Гарантия распространяется на герметичность, дебет воды и оборудование.</li>
                        <li>Мы уверены в качестве работ и материалов, поэтому даем максимальную гарантию на бурение и обустройство скважин.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'Собственная техника',
            subtitle: '«Контроль сроков и качества»',
            image: '/images/advantage51.png',
            content: (
                <>
                    <p className="mb-2 text-left">
                      2 единицы современной техники в нашем парке — никаких задержек из-за подрядчиков!
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Буровые установки УРБ 2А2, малогабаритные установки для сложных участков.</li>
                        <li>Транспорт для логистики (КАМАЗ-вездеходы, манипуляторы).</li>
                        <li>Регулярный техосмотр и обслуживание — снижаем риски поломок.</li>
                    </ul>
                </>
            )
        },
        {
            title: 'Экологичный подход',
            subtitle: '«Бережем ваш участок и природу»',
            image: '/images/clean.png',
            content: (
                <>
                    <p className="mb-2 text-left">
                      Используем технологии, которые минимизируют воздействие на окружающую среду:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Утилизируем буровой шлам и техническую воду.</li>
                        <li>Не применяем токсичные реагенты.</li>
                        <li>После работ убираем территорию: никаких следов от техники!</li>
                    </ul>
                </>
            )
        },
        {
            title: 'Комплект документов',
            subtitle: '«Серьезно и профессионально относимся к своим клиентам»',
            image: '/images/advantage7.png',
            content: (
                <>
                    {/* <p className="mb-2 text-left">
                     
                    </p> */}
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Подписываем договор с клиентом</li>
                        <li>Выдаем паспорт скважины</li>
                        <li>Предоставляем кассовый чек</li>
                    </ul>
                </>
            )
        },
        {
            title: 'Специальные предложения',
            subtitle: 'Льготное обслуживание для пенсионеров и участников СВО',
            image: '/images/advantage6.png',
            content: (
                <>

                    <p className="mb-2 text-left">
                      Мы предоставляем скидки для пенсионеров и участников СВО, стремясь сделать наши услуги более доступными и поддержать социально значимые группы.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Скидки на все виды работ.</li>
                        <li>Индивидуальный подход к каждому клиенту.</li>
                    </ul>
                </>
            )
        },
    ]

    return (
        <section className="container mx-auto px-4 py-4">
            <div className="border-b border-black border-opacity-10 mb-4"></div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8 md:mb-12">
                НАШИ ПРЕИМУЩЕСТВА
            </h2>

            <div className="grid grid-cols-2 gap-4 min-[480px]:gap-6 md:gap-8">
                {advantages.map((item, index) => (
                    <article
                        key={index}
                        aria-labelledby={`advantage-${index}`}
                        className="group bg-[#F5F5F5] rounded-xl p-4 md:p-6 shadow-lg"
                    >
                        {/* Кружок с изображением */}
                        <div className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Основной контент */}
                        <div className="text-center">
                            <h3
                                id={`advantage-${index}`}
                                className="text-base md:text-xl lg:text-2xl font-bold text-[#218CE9] mb-1 md:mb-2"
                            >
                                {item.title}
                            </h3>
                            <p className="text-xs md:text-sm text-[#666] italic mb-2 md:mb-4">
                                {item.subtitle}
                            </p>

                            {/* Дополнительный контент */}
                            <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-[500px]">
                                <div className="pt-2 md:pt-4 border-t border-[#218CE9]/20">
                                    <div className="text-xs md:text-sm">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Advantages
