'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Parallax, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

const FullscreenSlider = () => {
  return (
    <div className="hidden sm:block">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax, Navigation, Pagination]}
        effect="fade"
        speed={1200}
        parallax={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: true }}
        className="h-screen w-full"
      >
        {/* Слайд 1: Главный герой */}
        <SwiperSlide className="relative bg-gradient-to-b from-blue-900 to-cyan-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/waves2.webp')] bg-cover bg-center opacity-10" />
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full items-center">
              <div className="text-white space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase leading-tight">
                  БУРЕНИЕ СКВАЖИН ПОД КЛЮЧ
                  <span className="block text-base md:text-xl lg:text-2xl font-normal mt-1 md:mt-2">
                    с гарантией 10 лет
                  </span>
                </h1>
                <div className="space-y-2 md:space-y-4">
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="text-[#218CE9]">✓</span>
                      Полный цикл работ &quot;под ключ&quot;
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#218CE9]">✓</span>
                      Лицензированное оборудование
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#218CE9]">✓</span>
                      Сертифицированные специалисты
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/10 p-4 md:p-6 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">15+</div>
                      <div className="text-xs md:text-sm">Лет опыта</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">1,200+</div>
                      <div className="text-xs md:text-sm">Скважин пробурено</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-[#218CE9]">98%</div>
                      <div className="text-xs md:text-sm">Рекомендуют нас</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                    <button className="bg-[#218CE9] hover:bg-[#1a6fb9] px-4 py-2 rounded-lg">
                      Бесплатная консультация
                    </button>
                    <button className="border-2 border-white hover:bg-white/10 px-4 py-2 rounded-lg">
                      Смотреть видео
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Оставьте заявку</h2>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full p-3 bg-white/30 rounded-lg text-white placeholder-white/80"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full p-3 bg-white/30 rounded-lg text-white placeholder-white/80"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#218CE9] text-white py-3 rounded-lg hover:bg-[#1a6fb9]"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Слайд 2: Услуги */}
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
            <div className="w-full space-y-4 md:space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white drop-shadow-lg">
                Наши ключевые услуги
                <div className="mt-2 md:mt-4 text-lg md:text-xl lg:text-2xl font-light opacity-90">
                  Профессиональные решения для вашего комфорта
                </div>
              </h2>

              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-2">
                {[
                  {
                    icon: '⛏️',
                    title: 'Бурение скважин',
                    items: [
                      'Бурение на песчаный/гравийно-галечный грунт',
                      'Инженерно-геологические изыскания',
                      'Ремонт аварийных скважин',
                      'Устранение самоизлива'
                    ],
                    accent: 'bg-blue-100'
                  },
                  {
                    icon: '⚙️',
                    title: 'Обустройство скважин',
                    items: [
                      'Подбор и монтаж насосов',
                      'Установка кессонов',
                      'Прокладка коммуникаций',
                      'Монтаж водоприемного узла'
                    ],
                    accent: 'bg-blue-100'
                  },
                  {
                    icon: '💧',
                    title: 'Водоочистка',
                    items: [
                      'Химический анализ воды',
                      'Подбор оборудования',
                      'Монтаж и наладка систем',
                      'Сервисное обслуживание'
                    ],
                    accent: 'bg-blue-100'
                  },
                  {
                    icon: '🚽',
                    title: 'Автономная канализация',
                    items: [
                      'Анализ местности',
                      'Подбор оборудования',
                      'Монтаж очистных сооружений',
                      'Обслуживание систем'
                    ],
                    accent: 'bg-blue-100'
                  }
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white/20 relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1.5 md:h-2 ${service.accent}`}></div>
                    <div className="mt-2">
                      <div className={`mb-3 md:mb-4 p-2 md:p-3 rounded-lg ${service.accent} inline-block shadow-sm md:shadow-md`}>
                        <span className="text-3xl md:text-4xl text-[#218CE9]">{service.icon}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                        {service.title}
                      </h3>
                      <ul className="space-y-1 md:space-y-2 text-gray-600">
                        {service.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs md:text-sm leading-4 md:leading-5"
                          >
                            <span className="text-[#218CE9] text-base mt-0.5">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Слайд 3: Галерея */}
        <SwiperSlide className="relative bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
          <div className="container mx-auto h-full flex flex-col justify-center py-8">
            <div className="text-center mb-6 px-4">
              <h2 className="text-3xl font-bold text-[#218CE9] mb-2">Реализованные проекты</h2>
              <p className="text-gray-600 text-base max-w-md mx-auto">
                Более 1200 успешных объектов по всей стране
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={`/images/${item}.jpg`}
                      alt={`Проект ${item}`}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3">
                      <h3 className="text-[#218CE9] font-bold text-sm truncate">Скважина №{item}</h3>
                      <p className="text-gray-600 text-xs">Московская обл. | {120 + item * 10}м</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center pt-6 sticky bottom-4 z-10">
              <button className="bg-[#218CE9] text-white px-8 py-3 rounded-full hover:bg-[#1a6fb9] transition-colors">
                Все проекты
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default FullscreenSlider