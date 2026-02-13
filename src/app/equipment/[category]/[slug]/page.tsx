import { supabase } from '@/lib/supabase';
import Header from '@/src/app/components/Header';
import Image from "next/image";
import Footer from '@/src/app/components/Footer';
import { FiCheckCircle, FiInfo, FiArrowRight } from "react-icons/fi";
import PriceForm from '@/src/app/components/PriceForm';
import Link from 'next/link';

// --- Types ---
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

// --- Data Fetching ---
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

// --- Component ---
export default async function EquipmentPage({ params }: { params: Params }) {
    try {
        const { category, slug } = await params;
        const decodedCategory = decodeURIComponent(category);
        const [equipment] = await Promise.all([
            getEquipment(slug),
            getCategory(decodedCategory)
        ]);

        return (
            <main className="min-h-screen bg-gray-50">
                <Header />

                <section className="container mx-auto px-4 py-8 md:py-12">
                    {/* Хлебные крошки */}
                    <nav className="mb-6 md:mb-8 text-sm text-gray-600">
                        <ol className="flex flex-wrap items-center gap-2">
                            <li><Link href="/" className="hover:text-[#218CE9] transition-colors">Главная</Link></li>
                            <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                            <li><Link href="/equipment" className="hover:text-[#218CE9] transition-colors">Оборудование</Link></li>
                            <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                            <li><Link href={`/equipment/${encodeURIComponent(decodedCategory)}`} className="hover:text-[#218CE9] transition-colors">{decodedCategory}</Link></li>
                            <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                            <li className="text-[#218CE9] font-medium truncate max-w-[200px]">{equipment.title}</li>
                        </ol>
                    </nav>

                    {/* СЕТКА ДЛЯ БЛОКОВ 1 и 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

                        {/* === БЛОК 1: КАРТИНКА (Слева) === */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100">
                            <Image
                                src={equipment.image_url}
                                alt={equipment.title}
                                fill
                                className={`object-cover ${equipment.image_url.includes('yunilos-astra-5-midi.webp') ? 'object-right' : 'object-center'}`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        {/* === БЛОК 2: ИНФОРМАЦИЯ + КОМПЛЕКТАЦИЯ (Справа) === */}
                        <div className="flex flex-col gap-6">
                            {/* Заголовок и цена */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {equipment.title}
                                </h1>
                                <div className="text-3xl font-extrabold text-[#218CE9] mb-4">
                                    Цена: от {equipment.price.toLocaleString('ru-RU')} ₽
                                </div>
                                {equipment.description && (
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {equipment.description}
                                    </p>
                                )}
                            </div>

                            {/* Блок "В комплект входит" или "Характеристики" */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border-2 border-[#218CE9]/10 flex-grow">
                                {equipment.contents ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                            <div className="p-2 bg-blue-50 rounded-full">
                                                <FiCheckCircle className="text-[#218CE9] text-xl" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                                В комплект входит:
                                            </h2>
                                        </div>
                                        <ul className="space-y-3">
                                            {equipment.contents.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                                    <FiCheckCircle className="text-[#218CE9] mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    /* Если нет contents, показываем характеристики */
                                    <>
                                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                            <div className="p-2 bg-blue-50 rounded-full">
                                                <FiCheckCircle className="text-[#218CE9] text-xl" />
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                                Характеристики:
                                            </h2>
                                        </div>
                                        {equipment.specifications && (
                                            <div className="space-y-3">
                                                {Array.isArray(equipment.specifications)
                                                    ? equipment.specifications.map((spec, index) => (
                                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <FiCheckCircle className="text-[#218CE9]" />
                                                            <span className="text-gray-700">{spec}</span>
                                                        </div>
                                                    ))
                                                    : Object.entries(equipment.specifications).map(([key, value], index) => (
                                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                                            <span className="text-gray-500 font-medium">{key}</span>
                                                            <span className="text-gray-900 font-bold text-right">{value}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                        {/* Гарантия и производитель */}
                                        {(equipment.manufacturer || equipment.warranty) && (
                                            <div className="mt-6 pt-4 border-t border-dashed border-gray-200 grid grid-cols-2 gap-4">
                                                {equipment.manufacturer && (
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase font-semibold">Производитель</p>
                                                        <p className="text-gray-800 font-medium">{equipment.manufacturer}</p>
                                                    </div>
                                                )}
                                                {equipment.warranty && (
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase font-semibold">Гарантия</p>
                                                        <p className="text-gray-800 font-medium">{equipment.warranty} мес.</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* === БЛОК 3: ПОДРОБНОЕ ОПИСАНИЕ (На всю ширину снизу) === */}
                    {equipment.description_full && (
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-full">
                                    <FiInfo className="text-[#218CE9] text-2xl" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    Подробное описание
                                </h3>
                            </div>

                            {/* whitespace-pre-line сохраняет абзацы из базы данных */}
                            <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
                                {equipment.description_full}
                            </div>
                        </div>
                    )}

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
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="inline-block p-4 rounded-lg bg-red-50 text-red-500 font-medium">
                        Оборудование не найдено
                    </div>
                </div>
            </main>
        );
    }
}