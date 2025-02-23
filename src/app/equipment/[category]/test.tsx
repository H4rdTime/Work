// app/equipment/[category]/page.tsx
import { supabase } from '@/lib/supabase';
import EquipmentCard from '../../components/EquipmentCard';
import Image from 'next/image';

export default async function CategoryPage({
    params,
}: {
    params: { category: string };
}) {
    const decodedCategory = decodeURIComponent(params.category);

    // Получаем данные категории
    const { data: categoryData } = await supabase
        .from('categories')
        .select('*')
        .eq('name', decodedCategory)
        .single();

    // Получаем оборудование категории
    const { data: equipmentData } = await supabase
        .from('equipment')
        .select('*')
        .eq('category', decodedCategory)
        .order('price', { ascending: true });

    if (!categoryData) {
        return (
            <section className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500 py-8">
                    Категория не найдена
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Шапка категории */}
            <div className="mb-8">
                <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={categoryData.image_url}
                        alt={categoryData.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {categoryData.name}
                        </h1>
                        {categoryData.description && (
                            <p className="text-gray-200 mt-2 max-w-xl">
                                {categoryData.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Список оборудования */}
            {equipmentData?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipmentData.map((item) => (
                        <EquipmentCard key={item.id} equipment={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-red-500 py-8">
                    В этой категории пока нет оборудования
                </div>
            )}
        </section>
    );
}

export async function generateStaticParams() {
    const { data: categories } = await supabase
        .from('categories')
        .select('name');

    return categories?.map(({ name }) => ({
        category: encodeURIComponent(name),
    })) || [];
}