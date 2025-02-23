// app/about/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import Advantages from "../components/Advantages";
import MapSection from "../components/MapSection";
import WorkSteps from "../components/WorkSteps";
import EquipmentSlider from "../components/EquipmentSlider";
import Image from "next/image";

export default async function AboutPage() {
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
            Более 15 лет мы дарим людям чистую воду. От небольшой бригады
            до лидера рынка - наш путь основан на профессионализме и
            ответственности перед каждым клиентом.
          </p>
        </div>

        {/* Блок истории */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-[#F5F5F5] rounded-2xl p-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#218CE9]">Наша история</h2>
            <p className="text-gray-600">
              Начав с бурения первых скважин в Подмосковье в 2010 году,
              мы выросли в компанию с филиалами в 12 регионах России.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>2010 - Основание компании</li>
              <li>2014 - Сертификация ISO 9001</li>
              <li>2018 - Запуск собственного производства оборудования</li>
              <li>2023 - 1200+ успешных проектов</li>
            </ul>
          </div>
          <Image
            src="/images/about-history.jpg"
            alt="История компании"
            width={800}
            height={500}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Ценности компании */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
            Наши ценности
          </h2>
          <Advantages />
        </div>
      </section>

      {/* География работы */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
            Мы работаем в 12 регионах
          </h2>
          <MapSection />
        </div>
      </section>

      {/* Процесс контроля качества */}
      <section className="bg-[#F5F5F5] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
            Контроль качества на всех этапах
          </h2>
          <WorkSteps />


        </div>
      </section>

      {/* Наше оборудование */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
            Технологии и инновации
          </h2>
          <EquipmentSlider />
        </div>
      </section>

      <Footer />
    </main>
  );
}