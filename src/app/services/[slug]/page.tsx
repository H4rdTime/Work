import { supabase } from '@/lib/supabase';
import Header from "../../components/Header";
import Image from "next/image";
import PriceForm from "../../components/PriceForm";
import Footer from "../../components/Footer";

// Генерация статических путей по slug услуги
export async function generateStaticParams() {
    const { data: services } = await supabase
        .from('services')
        .select('slug');

    return services?.map((service) => ({
        slug: service.slug,
    })) || [];
}

export default async function ServicePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    // Получение данных услуги по slug
    const { data: service, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !service) {
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Услуга не найдена
                </div>
            </main>
        );
    }

    return (
        <main>
            <Header />

            <section className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={service.image_url}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9]">
                            {service.title}
                        </h1>

                        <div className="prose max-w-none text-gray-600">
                            <p className="text-lg">{service.description}</p>
                        </div>

                        <div className="bg-[#F5F5F5] p-6 rounded-xl">
                            <div className="flex items-baseline gap-4">
                                <span className="text-2xl font-bold text-[#218CE9]">
                                    от {service.price.toLocaleString('ru-RU')} ₽
                                </span>
                            </div>

                            <ul className="mt-4 space-y-2 text-gray-600">
                                {service.area_served?.map((area: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="text-[#218CE9]">•</span>
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <PriceForm />
            <Footer />
        </main>
    );
}