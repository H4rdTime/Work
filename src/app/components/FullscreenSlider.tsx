'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import { FiCheckCircle, FiArrowDown } from 'react-icons/fi'

const cities = [
  'Петрозаводск', 'Кондопога', 'Медвежьегорск',
  'Пряжа', 'Шуя', 'Деревянное',
  'Сортавала', 'Лахденпохья', 'Питкяранта',
  'Олонец', 'Суоярви', 'Сегежа'
];

const FullscreenSlider = ({
  scrollToForm,
  scrollToMap // Добавляем новый пропс
}: {
  scrollToForm: () => void;
  scrollToMap: () => void;
}) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1200}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
        className="h-screen w-full"
      >
        {/* Слайд 1: Главный */}
        <SwiperSlide className="relative bg-gradient-to-b from-blue-900 to-cyan-900 flex items-center">
          <div className="container mx-auto h-full flex flex-col items-center px-4 py-12">
            <div className="w-full max-w-6xl mx-auto text-center">
              {/* Заголовок */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-6 text-white">
                БУРЕНИЕ СКВАЖИН В РЕСПУБЛИКЕ КАРЕЛИЯ
                <span className="block text-lg xs:text-xl sm:text-2xl md:text-3xl font-normal mt-3">
                  БЫСТРО КАЧЕСТВЕННО НЕДОРОГО
                </span>
              </h1>

              {/* Мобильный вариант */}
              <div className="md:hidden space-y-6 mb-8">
                {/* Преимущества */}
                {[
                  'Полный цикл работ "под ключ"',
                  'Свой штат специалистов',
                  'Сертифицированные материалы'
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3"
                  >
                    <FiCheckCircle className="text-2xl text-[#218CE9] flex-shrink-0" />
                    <span className="text-lg text-white/90">{item}</span>
                  </div>
                ))}

                {/* Автоматическая прокрутка городов */}
                <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 text-center">
                    Основные населенные пункты:
                  </h2>
                  <div className="overflow-hidden">
                    <div className="flex animate-infinite-scroll">
                      {[...cities, ...cities].map((city, i) => (
                        <div
                          key={i}
                          className="bg-white/10 px-4 py-2 rounded-lg text-white/90 text-sm flex-shrink-0 mr-2"
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={scrollToForm}
                  className="w-full bg-[#218CE9] text-white py-3 rounded-full font-bold hover:bg-[#1a6fb9] flex items-center justify-center gap-2"
                >
                  <FiArrowDown className="animate-bounce" />
                  Оставить заявку
                </button>
              </div>

              {/* Desktop вариант */}
              <div className="hidden md:grid md:grid-cols-2 gap-8 mb-8">
                {/* Левая колонка */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    {[
                      'Полный цикл работ "под ключ"',
                      'Свой штат специалистов',
                      'Сертифицированные материалы'
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3"
                      >
                        <FiCheckCircle className="text-2xl text-[#218CE9] flex-shrink-0" />
                        <span className="text-lg text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { value: '15+', label: 'лет опыта' },
                      { value: '1,200+', label: 'скважин пробурено' },
                      { value: '98%', label: 'рекомендуют нас' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-[#218CE9]">{item.value}</div>
                        <div className="text-sm text-white/80 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={scrollToForm}
                    className="bg-[#218CE9] hover:bg-[#1666b3] text-white px-8 py-4 rounded-full 
                       w-full flex items-center justify-center gap-2 text-lg font-semibold
                       transition-all duration-300"
                  >
                    <FiArrowDown className="text-xl animate-bounce" />
                    Заказать звонок
                  </button>
                </div>

                {/* Правая колонка */}
                <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 text-center">
                    Основные населенные пункты:
                  </h2>
                  <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto">
                    {cities.map((city, i) => (
                      <div
                        key={i}
                        className="bg-white/10 px-4 py-2 rounded-lg text-white/90 text-sm"
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
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
                    {
                      icon: '/images/drilling.png',
                      title: 'Бурение скважин',
                      items: [
                        'Бурение на гравийно-галечный и скальный грунт',
                        'Инженерно-геологические изыскания',
                        'Ремонт аварийных скважин',
                        'Устранение самоизлива'
                      ],
                      accent: 'bg-blue-100'
                    },
                    {
                      icon: '/images/water-pump.png',
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
                      icon: '/images/save-water.png',
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
                          {service.icon.startsWith('/') ? (
                            <Image
                              src={service.icon}
                              alt={service.title}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <span className="text-3xl md:text-4xl text-[#218CE9]">{service.icon}</span>
                          )}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                          {service.title}
                        </h3>
                        <ul className="space-y-1 md:space-y-2 text-gray-600">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs md:text-sm leading-4 md:leading-5">
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
                {[
                  {
                    id: 1,
                    title: "Система аэрации",
                    location: "СНТ Корба, Деревянское сельское поселение",
                    depth: null,
                    description: "Комплексная система очистки воды с напорной аэрацией",
                    image: "/images/aeration-system.webp"
                  },
                  {
                    id: 2,
                    title: "Станция биоочистки Юнилос Астра 5",
                    location: "с. Ведлозеро, Пряжинский р-н",
                    depth: null,
                    description: "Монтаж автономной канализации для частного дома",
                    image: "/images/unilos-setup.webp"
                  }
                  // {
                  //   id: 3,
                  //   title: "Очистные сооружения",
                  //   location: "Калужская область",
                  //   depth: null,
                  //   description: "Многоступенчатая система фильтрации для коттеджного поселка",
                  //   image: "/images/filtration-system.webp"
                  // },
                  // {
                  //   id: 4,
                  //   title: "Водоподготовка",
                  //   location: "Тверская область",
                  //   depth: null,
                  //   description: "Установка умягчителя и обезжелезивателя",
                  //   image: "/images/water-treatment.webp"
                  // },
                  // {
                  //   id: 5,
                  //   title: "Скважина на песок",
                  //   location: "Новгородская область",
                  //   depth: "32",
                  //   description: "Неглубокая скважина с насосной станцией",
                  //   image: "/images/sand-well.webp"
                  // },
                  // {
                  //   id: 6,
                  //   title: "Автоматизация",
                  //   location: "Владимирская область",
                  //   depth: null,
                  //   description: "Система умного управления водоснабжением",
                  //   image: "/images/automation-system.webp"
                  // }
                ].map((project) => (
                  <div key={project.id} className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3">
                      <h3 className="text-[#218CE9] font-bold text-sm mb-1">{project.title}</h3>
                      <p className="text-gray-600 text-xs mb-1">{project.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">{project.location}</span>
                        {project.depth && <span className="text-[#218CE9]">{project.depth}м</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center pt-6 sticky bottom-4 z-10">
              <button
                onClick={scrollToMap}
                className="bg-[#218CE9] text-white px-8 py-3 rounded-full hover:bg-[#1a6fb9] transition-colors">
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
