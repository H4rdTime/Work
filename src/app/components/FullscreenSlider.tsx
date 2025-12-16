'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import { FiArrowRight, FiCheckCircle, FiStar, FiClock } from 'react-icons/fi'

const FullscreenSlider = ({
  scrollToForm,
  scrollToMap
}: {
  scrollToForm: () => void;
  scrollToMap: () => void;
}) => {
  // const cities = [
  //   { name: 'Петрозаводск', lat: 61.7849, lon: 34.3469 },
  //   { name: 'Кондопога', lat: 62.20595, lon: 34.26817 },
  //   { name: 'Пряжа', lat: 61.6928, lon: 33.6195 },
  //   { name: 'Шуя', lat: 61.8980, lon: 34.2401 },
  //   { name: 'Новая Вилга', lat: 61.8106, lon: 34.1511 },
  //   { name: 'Сортавала', lat: 61.7045, lon: 30.6879 },
  //   { name: 'Питкяранта', lat: 61.5684, lon: 31.4781 },
  //   { name: 'Олонец', lat: 60.9848, lon: 32.9724 },
  //   { name: 'Суоярви', lat: 62.0879, lon: 32.3733 },
  //   { name: 'Сегежа', lat: 63.7437, lon: 34.3126 },
  //   { name: 'Надвоицы', lat: 63.8925, lon: 34.2641 },
  // ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 12000, pauseOnMouseEnter: true }}
        className="h-screen w-full"
      >
        <SwiperSlide className="relative bg-gradient-to-b from-blue-900 to-cyan-900 overflow-hidden">
          <div className="absolute inset-0 bg-transparent opacity-5"></div>
          <div className="container mx-auto h-full flex flex-col justify-center px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
              <div className="text-left space-y-6 md:space-y-8 z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white leading-tight">
                  Бурение скважин в Карелии
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-normal text-cyan-300 mt-2">
                    Вода «под ключ» за 1-3 дня
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-white/80 max-w-lg">
                  Решаем задачи любой сложности — от геологической разведки до монтажа систем автоматизации. Гарантия на материалы и работы.
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <FiStar className="text-2xl text-cyan-300" />
                    <div>
                      <div className="text-xl font-bold text-white">98%</div>
                      <div className="text-sm text-white/70">довольных клиентов</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-2xl text-cyan-300" />
                    <div>
                      <div className="text-xl font-bold text-white">15+</div>
                      <div className="text-sm text-white/70">лет опыта</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-2xl text-cyan-300" />
                    <div>
                      <div className="text-xl font-bold text-white">500+</div>
                      <div className="text-sm text-white/70">успешных проектов</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 px-8 py-4 rounded-full 
                             text-lg font-bold flex items-center gap-3 transition-all duration-300
                             shadow-lg shadow-cyan-500/20 w-full sm:w-auto"
                >
                  Рассчитать стоимость <FiArrowRight />
                </button>
              </div>
              {/* <div className="relative w-full pb-[75%]">
                <div className="absolute inset-0 w-full h-full bg-[url('/images/KareliaMap.svg')] bg-cover bg-no-repeat bg-center opacity-50 transform-gpu"></div>
                {cities.map((city) => {
                  const topPercent = ((city.lat - 60.5006) / (64.089 - 60.5006)) * 100;
                  const leftPercent = ((city.lon - 29.4959) / (36.0019 - 29.4959)) * 100;
                  return (
                    <div key={city.name} className="group absolute" style={{ top: `${topPercent}%`, left: `${leftPercent}%`, transform: 'translate(-50%, -50%)' }}>
                      <div className="w-3 h-3 bg-cyan-400 rounded-full cursor-pointer animate-pulse"></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-64 mb-4 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2"><FiMapPin /> {city.name}</h4>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative bg-gradient-to-br from-[#218CE9] to-cyan-400">
          <div className="absolute inset-0 opacity-15 z-0">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              <path fill="currentColor" d="M0 120 Q 125 60 250 120 T 500 120 L500 0 0 0" className="text-white">
                <animate
                  attributeName="d"
                  dur="15s"
                  repeatCount="indefinite"
                  values="
                    M0 120 Q 125 60 250 120 T 500 120 L500 0 0 0;
                    M0 120 Q 125 180 250 120 T 500 120 L500 0 0 0;
                    M0 120 Q 125 60 250 120 T 500 120 L500 0 0 0
                  "
                />
              </path>
            </svg>
          </div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="w-full h-[80vh] flex flex-col">
              <div className="space-y-4 md:space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white drop-shadow-lg">
                  Наши ключевые услуги
                  <div className="mt-2 md:mt-4 text-lg md:text-xl lg:text-2xl font-light opacity-90">
                    Профессиональные решения для вашего комфорта
                  </div>
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto pb-8 mt-4">
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-2">
                  {[
                    { icon: '/images/drilling.png', title: 'Бурение скважин', items: ['Бурение на гравийно-галечный и скальный грунт', 'Инженерно-геологические изыскания', 'Ремонт аварийных скважин', 'Устранение самоизлива'], accent: 'bg-blue-100' },
                    { icon: '/images/water-pump.png', title: 'Обустройство скважин', items: ['Подбор и монтаж насосов', 'Установка кессонов', 'Прокладка коммуникаций', 'Монтаж водоприемного узла'], accent: 'bg-blue-100' },
                    { icon: '/images/save-water.png', title: 'Водоочистка', items: ['Химический анализ воды', 'Подбор оборудования', 'Монтаж и наладка систем', 'Сервисное обслуживание'], accent: 'bg-blue-100' },
                    { icon: '🚽', title: 'Автономная канализация', items: ['Анализ местности', 'Подбор оборудования', 'Монтаж очистных сооружений', 'Обслуживание систем'], accent: 'bg-blue-100' }
                  ].map((service, index) => (
                    <div key={index} className="group p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white/20 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1.5 md:h-2 ${service.accent}`}></div>
                      <div className="mt-2">
                        <div className={`mb-3 md:mb-4 p-2 md:p-3 rounded-lg ${service.accent} inline-block shadow-sm md:shadow-md`}>
                          {service.icon.startsWith('/') ? (<Image src={service.icon} alt={service.title} width={40} height={40} className="w-10 h-10 object-contain" />) : (<span className="text-3xl md:text-4xl text-[#218CE9]">{service.icon}</span>)}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">{service.title}</h3>
                        <ul className="space-y-1 md:space-y-2 text-gray-600">
                          {service.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-xs md:text-sm leading-4 md:leading-5"><span className="text-[#218CE9] text-base mt-0.5">•</span>{item}</li>))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
          <div className="container mx-auto h-full flex flex-col justify-center py-8">
            <div className="text-center mb-6 px-4">
              <h2 className="text-3xl font-bold text-[#218CE9] mb-2">Реализованные проекты</h2>
              <p className="text-gray-600 text-base max-w-md mx-auto">Более 500 успешных объектов по всей республике</p>
            </div>
            <div className="flex-1 overflow-y-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 1, title: "Система аэрации", location: "СНТ Корба, Деревянское сельское поселение", depth: null, description: "Комплексная система очистки воды с напорной аэрацией", image: "/images/aeration-system.webp" },
                  { id: 2, title: "Станция биоочистки Юнилос Астра 5", location: "с. Ведлозеро, Пряжинский р-н", depth: null, description: "Монтаж автономной канализации для частного дома", image: "/images/unilos-setup.webp" },
                  { id: 3, title: "Перистальтический насос", location: "ТСН Северные Просторы, деревня Бесовец.", depth: null, description: "Система водоочистки с дозацией гипохлорита натрия ", image: "/images/peristaltic-pump.webp" }
                ].map((project) => (
                  <div key={project.id} className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                    <Image src={project.image} alt={project.title} width={400} height={400} className="object-cover w-full h-full" />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3">
                      <h3 className="text-[#218CE9] font-bold text-sm mb-1">{project.title}</h3>
                      <p className="text-gray-600 text-xs mb-1">{project.description}</p>
                      <div className="flex justify-between items-center text-xs"><span className="text-gray-600">{project.location}</span>{project.depth && <span className="text-[#218CE9]">{project.depth}м</span>}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center pt-6 sticky bottom-4 z-10">
              <button onClick={scrollToMap} className="bg-[#218CE9] text-white px-8 py-3 rounded-full hover:bg-[#1a6fb9] transition-colors">Все проекты</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default FullscreenSlider