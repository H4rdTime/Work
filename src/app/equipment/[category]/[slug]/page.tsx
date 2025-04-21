import { supabase } from '@/lib/supabase';
import Header from '@/src/app/components/Header';
import Image from "next/image";
import Footer from '@/src/app/components/Footer';
import { FiCheckCircle } from "react-icons/fi";
import PriceForm from '@/src/app/components/PriceForm';

interface Equipment {
    id: number;
    title: string;
    description: string;
    description_full?: string;
    price: number;
    image_url: string;
    category: string;
    slug: string;
    specifications?: string[] | Record<string, string>;
    warranty?: number;
    manufacturer?: string;
    contents?: string[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

export async function generateStaticParams() {
    const { data: equipment } = await supabase
        .from('equipment')
        .select('slug, category');

    return equipment?.map((item) => ({
        category: item.category,
        slug: item.slug,
    })) || [];
}

async function getEquipment(slug: string): Promise<Equipment> {
    const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('slug', slug)
        .single();
    if (error) throw error;
    return data as Equipment;
}

async function getCategory(name: string): Promise<Category | null> {
    const { data } = await supabase
        .from('categories')
        .select('*')
        .eq('name', name)
        .single();
    return data;
}

type Params = Promise<{ category: string; slug: string }>;

export default async function EquipmentPage({ params }: { params: Params }) {
    try {
        const { category, slug } = await params;
        const decodedCategory = decodeURIComponent(category);
        const [equipment] = await Promise.all([
            getEquipment(slug),
            getCategory(decodedCategory)
        ]);

        return (
            <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
                <Header />

                <section className="container mx-auto px-4 py-8 md:py-12">
                    {/* Breadcrumbs omitted for brevity */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={equipment.image_url}
                                alt={equipment.title}
                                fill
                                className={`object-cover ${equipment.image_url.includes('yunilos-astra-5-midi.webp') ? 'object-right' : 'object-center'}`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9]">
                                    {equipment.title}
                                </h1>
                                <div className="text-2xl font-bold text-gray-800">
                                    Цена: {equipment.price.toLocaleString('ru-RU')} ₽
                                </div>
                                {equipment.description && (
                                    <div className="prose prose-lg text-gray-600">
                                        <p>{equipment.description}</p>
                                    </div>
                                )}
                            </div>

                            {/* Unified block: either характеристики or состав комплекта */}
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#218CE9]/10">
                                {equipment.contents ? (
                                    <>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <FiCheckCircle className="text-[#218CE9] text-xl" />
                                            <h2 className="text-2xl font-bold text-gray-800">В комплект входит</h2>
                                        </div>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            {equipment.contents.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <FiCheckCircle className="text-[#218CE9] mt-1" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <FiCheckCircle className="text-[#218CE9] text-xl" />
                                            <h2 className="text-2xl font-bold text-gray-800">Характеристики</h2>
                                        </div>
                                        {equipment.specifications && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {Array.isArray(equipment.specifications)
                                                    ? equipment.specifications.map((spec, index) => (
                                                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                            <FiCheckCircle className="text-[#218CE9] flex-shrink-0" />
                                                            <span className="text-gray-600">{spec}</span>
                                                        </div>
                                                      ))
                                                    : Object.entries(equipment.specifications).map(([key, value], index) => (
                                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-gray-600 font-medium">{key}</span>
                                                            <span className="text-[#218CE9] font-semibold">{value}</span>
                                                        </div>
                                                      ))}
                                            </div>
                                        )}
                                        {/* Warranty & manufacturer for single items */}
                                        {(equipment.manufacturer || equipment.warranty) && (
                                            <div className="mt-8 pt-6 border-t border-[#218CE9]/10">
                                                <div className="grid grid-cols-2 gap-4">
                                                    {equipment.manufacturer && (
                                                        <div className="flex items-center gap-2">
                                                            <FiCheckCircle className="text-[#218CE9]" />
                                                            <div>
                                                                <p className="text-sm text-gray-500">Производитель</p>
                                                                <p className="font-medium">{equipment.manufacturer}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {equipment.warranty && (
                                                        <div className="flex items-center gap-2">
                                                            <FiCheckCircle className="text-[#218CE9]" />
                                                            <div>
                                                                <p className="text-sm text-gray-500">Гарантия</p>
                                                                <p className="font-medium">{equipment.warranty} мес</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Подробное описание без упоминания брендов */}
                            {equipment.description_full && (
                                <div className="mt-12 prose prose-lg max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#218CE9]/10">
                                    <h3 className="text-2xl font-bold text-[#218CE9] mb-4">Подробное описание</h3>
                                    <p className="text-gray-600">{equipment.description_full}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <PriceForm />
                <Footer />
            </main>
        );
    } catch (error) {
        console.error('Ошибка загрузки оборудования:', error);
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Оборудование не найдено
                </div>
            </main>
        );
    }
}