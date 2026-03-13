// src/app/page.tsx
// ⚡ СЕРВЕРНЫЙ компонент — данные загружаются на сервере, а не в браузере
import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MapSection from './components/MapSection';
import PriceForm from './components/PriceForm';
import Footer from './components/Footer';
import Advantages from './components/Advantages';
import WorkSteps from './components/WorkSteps';
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import ProjectsSlider from './components/ProjectsSlider';
import ServicesSlider from './components/ServicesSlider';
import EquipmentSlider from './components/EquipmentSlider';
import BlogPreview from './components/BlogPreview';

// ⚡ ISR: перегенерация каждый час — HTML кешируется и отдаётся мгновенно
export const revalidate = 3600;

// Серверный Supabase клиент (не попадает в клиентский бандл)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // ⚡ Все 4 запроса выполняются параллельно НА СЕРВЕРЕ
  // Данные попадают в HTML — пользователь видит контент сразу
  const [servicesRes, projectsRes, equipmentRes, categoriesRes] = await Promise.all([
    supabase.from('services').select('*'),
    supabase
      .from('projects')
      .select('id, title, slug, location, short_description, main_image_url, depth, video_url')
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('equipment')
      .select('*')
      .order('price', { ascending: true }),
    supabase
      .from('blog_categories')
      .select('id, slug, title, description, image_url')
      .limit(3),
  ]);

  return (
    <main>
      <LocalBusinessSchema />
      <Header />
      <HeroSection />
      <MapSection />
      <PriceForm />
      <ProjectsSlider projects={projectsRes.data || []} />
      <ServicesSlider services={servicesRes.data || []} />
      <EquipmentSlider equipment={equipmentRes.data || []} />
      <Advantages />
      <WorkSteps />
      <Suspense fallback={<div className="text-center py-12 text-gray-400">Загрузка превью блога...</div>}>
        <BlogPreview categories={categoriesRes.data || []} />
      </Suspense>
      <Footer />
    </main>
  );
}
