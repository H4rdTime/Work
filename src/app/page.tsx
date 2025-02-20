// app/page.tsx

import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ServicesSlider from "./components/ServicesSlider";
import EquipmentSlider from './components/EquipmentSlider';
import Advantages from './components/Advantages';
import WorkSteps from './components/WorkSteps'
import PriceForm from './components/PriceForm'
import PriceCalculator from './components/PriceCalculator'
import Footer from './components/Footer'
import FullscreenSlider from './components/FullscreenSlider'
import MapSection from "./components/MapSection";

export default function Home() {
  return (
    <main>
      <Header />
      <FullscreenSlider />
      <Hero />
      <MapSection />
      <ServicesSlider />
      <EquipmentSlider />
      <Advantages />
      <WorkSteps />
      <PriceForm />
      <PriceCalculator />
      <Footer />
    </main>
  );
}

