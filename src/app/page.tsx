'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from "./components/Header";
import ServicesSlider from "./components/ServicesSlider";
import EquipmentSlider from './components/EquipmentSlider';
import Advantages from './components/Advantages';
import WorkSteps from './components/WorkSteps';
import PriceForm from './components/PriceForm';
import Footer from './components/Footer';
import FullscreenSlider from './components/FullscreenSlider';
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";

// Динамический импорт MapSection с отключённым SSR
const MapSection = dynamic(() => import('./components/MapSection').then(mod => mod.default), { ssr: false });

// Динамический импорт BlogPreview как серверного компонента
const BlogPreview = dynamic(() => import('./components/BlogPreview'), { ssr: true });

export default function Home() {
  const scrollToForm = () => {
    scrollToElement('price-form-section');
  };

  const scrollToMap = () => {
    scrollToElement('map-section');
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <LocalBusinessSchema />
      <Header />
      <FullscreenSlider
        scrollToForm={scrollToForm}
        scrollToMap={scrollToMap} // Добавляем новый пропс
      />
      <MapSection />
      <PriceForm />
      <ServicesSlider />
      <EquipmentSlider />
      <Advantages />
      <WorkSteps />
      <Suspense fallback={<div>Загрузка превью блога...</div>}>
        <BlogPreview />
      </Suspense>
      <Footer />
    </main>
  );
}
