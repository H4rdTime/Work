'use client'
import Header from "./components/Header";
import ServicesSlider from "./components/ServicesSlider";
import EquipmentSlider from './components/EquipmentSlider';
import Advantages from './components/Advantages';
import WorkSteps from './components/WorkSteps'
import PriceForm from './components/PriceForm'
import PriceCalculator from './components/PriceCalculator'
import Footer from './components/Footer'
import FullscreenSlider from './components/FullscreenSlider'
import MapSection from "./components/MapSection";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";

export default function Home() {
  const scrollToForm = () => {
    const element = document.getElementById('price-form-section');
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
      <FullscreenSlider scrollToForm={scrollToForm} />
      {/* <Hero /> */}
      <MapSection />
      <PriceForm /> {/* Убрали ref пропс */}
      <ServicesSlider />
      <EquipmentSlider />
      <Advantages />
      <WorkSteps />
      <PriceCalculator />
      <Footer />
    </main>
  );
}