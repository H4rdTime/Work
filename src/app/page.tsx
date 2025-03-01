// app/page.tsx

import Header from "./components/Header";
import Hero from "./components/Hero";
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
  return (
    <main>
      <LocalBusinessSchema />
      <Header />
      <FullscreenSlider />
      <Hero />
      <MapSection />
      <PriceForm />
      <ServicesSlider />
      <EquipmentSlider />
      <Advantages />
      <WorkSteps />
      <PriceCalculator />
      <Footer />
    </main>
  );
}

