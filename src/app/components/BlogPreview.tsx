// app/components/BlogPreview.tsx
'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
    id: number;
    slug: string;
    title: string;
    description?: string;
    image_url?: string;
}

export default function BlogPreview() {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            const { data } = await supabase
                .from('blog_categories')
                .select('id, slug, title, description, image_url')
                .limit(3);
            setCategories(data);
            setLoading(false);
        }
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Загрузка превью блога...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 ">
            <section className='bg-[#F5F5F5] rounded-xl mx-auto px-4 py-8'>
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#218CE9]">
                        Полезные статьи о бурении и воде
                    </h2>
                </div>
                {categories && categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/blog/${category.slug}`}
                                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="relative h-48 w-full">
                                    {category.image_url ? (
                                        <Image
                                            src={category.image_url}
                                            alt={category.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-400">Нет изображения</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-[#218CE9] mb-2">
                                        {category.title}
                                    </h3>
                                    {category.description && (
                                        <p className="text-gray-600 line-clamp-3">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-red-500">
                        Записи блога временно недоступны
                    </div>
                )}
                <div className="text-center mt-6">
                    <Link href="/blog" className="text-[#218CE9] hover:underline">
                        Смотреть все записи
                    </Link>
                </div>
            </section>
        </div>

    );
}
