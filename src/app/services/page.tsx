// app/services/page.tsx
import { supabase } from '@/lib/supabase';
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  area_served: string[];
  slug: string;
}

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('price', { ascending: true });

  if (error) throw error;
  return data || [];
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <Header />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
          Наши услуги
        </h1>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-red-500 py-8">
            Услуги временно недоступны
          </div>
        )}
      </section>
    </main>
  );
}