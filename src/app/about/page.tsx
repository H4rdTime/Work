// app/about/page.tsx
// ⚡ Серверный компонент — данные загружаются на сервере
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapSection from "../components/MapSection";
import EquipmentSlider from "../components/EquipmentSlider";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Link from 'next/link';
import AboutProjectsSlider from "./AboutProjectsSlider";

export const revalidate = 3600;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Определяем интерфейс для данных проекта
interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  short_description?: string;
  main_image_url?: string;
  video_url?: string;
  depth?: number;
}

export default async function AboutPage() {
  // Загружаем данные на сервере
  const [projectsRes, equipmentRes] = await Promise.all([
    supabase
      .from('projects')
      .select('id, title, slug, main_image_url, location, depth')
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('equipment')
      .select('*')
      .order('price', { ascending: true }),
  ]);

  const projects = projectsRes.data || [];
  const equipment = equipmentRes.data || [];

  const stats = [
    { value: '15+', label: 'Лет опыта', icon: '🏆' },
    { value: '500+', label: 'Скважин пробурено', icon: '💧' },
    { value: '10', label: 'Лет гарантии', icon: '🛡️' },
  ];

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      ),
      title: 'Бурение скважин',
      desc: 'Профессиональное бурение на любую глубину с использованием буровых установок УРБ 2А2 на базе КАМАЗ',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
        </svg>
      ),
      title: 'Обустройство',
      desc: 'Полная обвязка скважины, установка водоприёмного узла, системы с постоянным давлением',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      title: 'Водоочистка',
      desc: 'Индивидуальный подбор фильтров: устранение жёсткости, железа, марганца, сероводорода',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: 'Гарантия и сервис',
      desc: 'Полный пакет документов, паспорт скважины, гарантийные обязательства до 10 лет',
    },
  ];

  const techItems = [
    { label: 'Буровые установки УРБ 2А2 на базе КАМАЗ', icon: '🚛' },
    { label: 'Компрессоры AtlasCopco для бурения до 250м', icon: '⚙️' },
    { label: 'Современное диагностическое оборудование', icon: '📊' },
    { label: 'Сертифицированные насосные системы', icon: '🔧' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'О компании АкваСервис',
            description: '15+ лет создаём надёжные системы водоснабжения для загородных домов и коттеджей в Карелии.',
            url: 'https://aqua-service-karelia.ru/about',
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'АкваСервис',
              description: 'Профессиональное бурение скважин и водоочистка',
            },
          }),
        }}
      />
      <main className="flex flex-col min-h-screen">
        <Header />

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#153d6f]">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#218CE9] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4da8ff] rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="text-center max-w-4xl mx-auto">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Надёжное водоснабжение{' '}
                <span className="bg-gradient-to-r from-[#4da8ff] to-[#82c5ff] bg-clip-text text-transparent">
                  для вашего дома
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-200/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                15+ лет создаём надёжные системы водоснабжения для загородных домов и коттеджей
                в Карелии. Комплексный подход от проектирования до гарантийного обслуживания.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-300/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ===== SERVICES GRID ===== */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
              Полный <span className="text-[#218CE9]">цикл услуг</span>
            </h2>
            <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
              Решаем все задачи водоснабжения: от анализа грунта до монтажа систем фильтрации
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border-2 border-transparent hover:border-[#218CE9]/20 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(33,140,233,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#218CE9] to-[#4da8ff] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#218CE9]/20">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a365d] mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== APPROACH + PROJECTS SLIDER ===== */}
        <section className="bg-[#f8fafc] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
                Наш <span className="text-[#218CE9]">подход к работе</span>
              </h2>
              <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Техническое оснащение */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <h3 className="text-xl font-bold text-[#1a365d] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-br from-[#218CE9] to-[#4da8ff] rounded-lg flex items-center justify-center text-white text-lg shadow-lg shadow-[#218CE9]/20">⚡</span>
                    Техническое оснащение
                  </h3>
                  <div className="space-y-4">
                    {techItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                        <div className="flex-1">
                          <p className="text-gray-600 group-hover:text-[#1a365d] transition-colors duration-200">{item.label}</p>
                          <div className="h-px bg-gradient-to-r from-[#218CE9]/10 to-transparent mt-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#218CE9] to-[#1a6bc4] rounded-2xl p-8 text-white shadow-xl shadow-[#218CE9]/20">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🎯</span>
                    <div>
                      <h4 className="text-lg font-bold mb-2">Работаем с любыми объектами</h4>
                      <p className="text-blue-100/90 text-sm leading-relaxed">
                        Новое строительство, реконструкция, сезонное или круглогодичное использование —
                        адаптируем решение под любую стадию строительства.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Слайдер проектов */}
              <div className="space-y-4">
                <AboutProjectsSlider projects={projects} />
                <p className="text-center text-sm text-gray-400">
                  Наши последние проекты
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DOCUMENTATION & MONTAGE ===== */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image side */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#218CE9]/20 to-[#4da8ff]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/about/documents.jpg"
                  alt="Документация и проектирование — АкваСервис"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    Полный пакет документов
                  </span>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
                  Профессиональный <span className="text-[#218CE9]">монтаж</span>
                </h2>
                <div className="w-16 h-1 bg-[#218CE9]/30 rounded-full" />
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Обустраиваем скважины для сезонного или круглогодичного использования с полным документальным сопровождением.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: '🔩', title: 'Обвязка скважины', desc: 'Грамотная герметичная обвязка' },
                  { icon: '🏗️', title: 'Водоприёмный узел', desc: 'Установка и настройка' },
                  { icon: '📐', title: 'Постоянное давление', desc: 'Системы стабильного давления' },
                  { icon: '🏠', title: 'Любая стадия', desc: 'Адаптация под строительство' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100 hover:border-[#218CE9]/20 hover:shadow-md transition-all duration-300">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h4 className="font-bold text-[#1a365d] text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-[#218CE9]/10 shadow-sm">
                <h3 className="text-lg font-bold text-[#1a365d] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#218CE9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  Документация по окончании работ
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Паспорт скважины',
                    'Схемы подключения',
                    'Рекомендации по эксплуатации',
                    'Гарантийные обязательства',
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4 text-[#218CE9] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WATER TREATMENT ===== */}
        <section className="bg-[#f8fafc] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
                Системы <span className="text-[#218CE9]">очистки воды</span>
              </h2>
              <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto rounded-full" />
              <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
                Индивидуальный подбор фильтрации на основе анализа вашей воды
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Problems we solve */}
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '💧', problem: 'Повышенная жёсткость', solution: 'Системы умягчения воды' },
                    { icon: '🟤', problem: 'Железо и марганец', solution: 'Обезжелезивание аэрацией' },
                    { icon: '💨', problem: 'Сероводород', solution: 'Дегазация и окисление' },
                    { icon: '🧪', problem: 'Химические загрязнения', solution: 'Комплексная фильтрация' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(33,140,233,0.1)] transition-all duration-300 hover:-translate-y-0.5">
                      <span className="text-3xl mb-3 block">{item.icon}</span>
                      <h4 className="font-bold text-[#1a365d] text-sm mb-1">{item.problem}</h4>
                      <p className="text-gray-500 text-xs">{item.solution}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20 flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Стандарт СанПиН</h4>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      Вода соответствует нормам СанПиН для питьевого назначения.
                      Используем только сертифицированное оборудование ведущих производителей.
                    </p>
                  </div>
                </div>
              </div>

              {/* Filtration image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#218CE9]/20 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/about/filtration.jpg"
                    alt="Система водоочистки и фильтрации — АкваСервис"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                      Профессиональная фильтрация
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TEAM ===== */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-4">
              Наши <span className="text-[#218CE9]">специалисты</span>
            </h2>
            <div className="w-16 h-1 bg-[#218CE9]/30 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-xl mx-auto text-base md:text-lg">
              Профессиональная команда с многолетним опытом в водоснабжении
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: '🛠️', title: 'Буровики', desc: 'Сертифицированные мастера бурения' },
              { icon: '🧪', title: 'Химики-технологи', desc: 'Специалисты по водоподготовке' },
              { icon: '👷', title: 'Монтажники', desc: 'Допуски СРО, опыт 10+ лет' },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#218CE9] to-[#4da8ff] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-[#218CE9]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {member.icon}
                </div>
                <h4 className="font-bold text-[#1a365d] mb-1">{member.title}</h4>
                <p className="text-gray-500 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>

          {/* Advantages strip */}
          <div className="bg-gradient-to-r from-[#0a1628] via-[#0f2847] to-[#153d6f] rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto text-center">
              {[
                { icon: '⏱️', title: 'Соблюдение сроков', desc: 'Чёткое планирование каждого этапа' },
                { icon: '💼', title: 'Многолетний опыт', desc: 'Практический опыт работы 15+ лет' },
              ].map((adv, i) => (
                <div key={i} className="group">
                  <div className="text-3xl mb-3">{adv.icon}</div>
                  <h4 className="font-bold text-white mb-2">{adv.title}</h4>
                  <p className="text-blue-300/70 text-sm">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="bg-[#f8fafc] py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-[#218CE9] to-[#1a6bc4] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl shadow-[#218CE9]/20">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Нужна консультация?
                </h2>
                <p className="text-blue-100/90 text-lg mb-8 leading-relaxed">
                  Оставьте заявку и получите бесплатную консультацию специалиста.
                  Поможем подобрать оптимальное решение для вашего участка.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contacts"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#218CE9] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-lg"
                  >
                    Оставить заявку
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contacts"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 text-lg"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Позвонить
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== GEOGRAPHY ===== */}
        <div className="container mx-auto px-4">
          <MapSection />
        </div>

        {/* ===== EQUIPMENT ===== */}
        <section className="py-12 container mx-auto">
          <div className="px-4">
            <EquipmentSlider equipment={equipment} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}