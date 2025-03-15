import { supabase } from '@/lib/supabase';
import Header from "../../components/Header";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import PriceForm from '../../components/PriceForm';

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
    try {
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
            <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
                <Header />

                <section className="container mx-auto px-4 py-8 md:py-12">
                    {/* Хлебные крошки */}
                    <nav className="mb-6 md:mb-8 text-sm text-gray-600">
                        <ol className="flex flex-wrap items-center gap-2">
                            <li><Link href="/" className="hover:text-[#218CE9] transition-colors">Главная</Link></li>
                            <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                            <li><Link href="/services" className="hover:text-[#218CE9] transition-colors">Услуги</Link></li>
                            <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                            <li className="text-[#218CE9] font-medium truncate max-w-[200px]">{service.title}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Изображение */}
                        <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={service.image_url}
                                alt={service.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Контент */}
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-4">
                                {service.title}
                            </h1>

                            <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                                <p className="text-lg leading-relaxed">{service.description}</p>
                            </div>

                            {/* Блок преимуществ */}
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#218CE9]/10">
                                <div className="flex items-baseline gap-4 mb-6">
                                    <span className="text-2xl md:text-3xl font-bold text-[#218CE9]">
                                        от {service.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                    <span className="text-gray-500">·</span>
                                    <span className="text-gray-600">Гарантия 2 года</span>
                                </div>

                                {service.area_served?.length > 0 && (
                                    <div className="border-t border-[#218CE9]/10 pt-6">
                                        <h3 className="text-xl font-semibold text-[#218CE9] mb-4">
                                            Доступно в регионах:
                                        </h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {service.area_served.map((area: string, index: number) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <FiCheckCircle className="text-[#218CE9] mt-1 flex-shrink-0" />
                                                    <span className="text-gray-600">{area}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <PriceForm />
                </section>

                <Footer />
            </main>
        );
    } catch (error) {
        console.error('Ошибка загрузки услуги:', error);
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Услуга не найдена
                </div>
            </main>
        );
    }
}