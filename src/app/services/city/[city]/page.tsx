// app/services/[city]/page.tsx
import { supabase } from '@/lib/supabase';
import Header from "../../../components/Header";
import ServiceCard from "../../../components/ServiceCard";

export async function generateStaticParams() {
    const { data: services } = await supabase
        .from('services')
        .select('area_served');

    const cities = Array.from(new Set(
        services?.flatMap(s => s.area_served)
    )).filter(Boolean);

    return cities.map(city => ({
        city: encodeURIComponent(city)
    }));
}

export default async function CityServices({
    params
  }: {
    params: Promise<{ city: string }>
  }) {
    const { city } = await params;
    const decodedCity = decodeURIComponent(city);

    const { data: services } = await supabase
        .from('services')
        .select('*')
        .contains('area_served', [decodedCity]);

    return (
        <main>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Услуги в {decodedCity}
                </h1>

                {services && services.length > 0 ? (
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
                        Нет услуг для данного региона
                    </div>
                )}
            </div>
        </main>
    );
}