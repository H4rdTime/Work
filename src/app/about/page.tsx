// app/about/page.tsx
"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MapSection from "../components/MapSection";
import EquipmentSlider from "../components/EquipmentSlider";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', updateIndex);

    // Возвращаем функцию очистки с правильным типом
    return () => {
      emblaApi.off('select', updateIndex);
    };
  }, [emblaApi]);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Герой-секция */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-6">
            О компании АкваСервис
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            15+ лет создаём надёжные системы водоснабжения для загородных домов
            и коттеджей в Карелии. Комплексный подход от проектирования до гарантийного обслуживания.
          </p>
        </div>
      </section>

      {/* Основной принцип работы */}
      <section className="bg-[#F5F5F5] rounded-2xl p-8 mb-12 container mx-auto">

        <div className="max-w-full auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] text-center mb-6">
            Наш подход к работе
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Текст слева */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#218CE9]">Полный цикл услуг</h3>
                <p className="text-gray-600">
                  Решаем все задачи водоснабжения: от анализа грунта до монтажа систем фильтрации.
                  Работаем с новыми объектами и реконструкцией существующих.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#218CE9]">Техническое оснащение</h3>
                <ul className="list-disc pl-5 space-y-3 text-gray-600">
                  <li>Буровые установки УРБ 2А2 на базе КАМАЗ</li>
                  <li>Компрессоры AtlasCopco для бурения до 250м</li>
                  <li>Современное диагностическое оборудование</li>
                  <li>Сертифицированные насосные системы</li>
                </ul>
              </div>
            </div>

            {/* Слайдер справа */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {[
                    '/images/about/equipment-1.jpg',
                    '/images/about/process-1.jpg',
                    '/images/about/team-1.jpg',
                    '/images/about/result-1.jpg'
                  ].map((img, index) => (
                    <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
                      <Image
                        src={img}
                        alt={`Пример работы ${index + 1}`}
                        width={1600}
                        height={900}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Навигационные точки */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[
                  '/images/about/equipment-1.jpg',
                  '/images/about/process-1.jpg',
                  '/images/about/team-1.jpg',
                  '/images/about/result-1.jpg'
                ].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index
                        ? 'bg-[#218CE9] scale-125'
                        : 'bg-white/50 hover:scale-110'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Технологии и гарантии */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 mb-12 border-2 border-[#218CE9]/20 rounded-2xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#218CE9]">Профессиональный монтаж</h3>
              <p className="text-gray-600">
                Обустраиваем скважины для сезонного или круглогодичного использования:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Грамотная обвязка скважины</li>
                <li>Установка водоприёмного узла</li>
                <li>Системы с постоянным давлением</li>
                <li>Адаптация под любую стадию строительства</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#218CE9]">Документация</h3>
              <p className="text-gray-600">
                По окончании работ вы получаете полный пакет:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Паспорт скважины с гидротехническими характеристиками</li>
                <li>Схемы подключения оборудования</li>
                <li>Рекомендации по эксплуатации</li>
                <li>Гарантийные обязательства</li>
              </ul>
            </div>
          </div>

          <Image
            src="/images/about/documents.jpg"
            alt="Документация"
            width={800}
            height={500}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Водоподготовка */}
      <section className="bg-[#F5F5F5] p-8 rounded-2xl mb-12 container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] text-center mb-8">
          Системы очистки воды
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mx-auto">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#218CE9]">Индивидуальный подбор</h3>
            <p className="text-gray-600">
              Подбираем фильтры для устранения конкретных проблем:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Повышенная жёсткость</li>
              <li>Содержание железа и марганца</li>
              <li>Присутствие сероводорода</li>
              <li>Химические загрязнения</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#218CE9]">Стандарты качества</h3>
            <p className="text-gray-600">
              Вода соответствует нормам СанПиН для питьевого назначения.
              Используем только сертифицированное оборудование.
            </p>
            <Image
              src="/images/about/filtration.jpg"
              alt="Система фильтрации"
              width={600}
              height={400}
              className="rounded-xl shadow-lg mt-4"
            />
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl mb-12 border-2 border-[#218CE9]/20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] text-center mb-8">
            Наши специалисты
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#218CE9]">Профессиональный состав</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Гидрогеологи с опытом анализа грунтов</li>
                <li>Сертифицированные буровики</li>
                <li>Химики-технологи по водоподготовке</li>
                <li>Монтажники с допусками СРО</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#218CE9]">Наши преимущества</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Многолетний практический опыт</li>
                <li>Круглосуточная техподдержка</li>
                <li>Соблюдение сроков</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* География работы */}
      <div className="container mx-auto px-4">
        <MapSection />
      </div>

      {/* Оборудование */}
      <section className="py-12 container mx-auto">
        <div className="px-4">
          <EquipmentSlider />
        </div>
      </section>

      <Footer />
    </main>
  );
}