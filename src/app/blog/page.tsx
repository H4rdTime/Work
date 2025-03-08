// app/blog/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Header from '../components/Header';
import Image from 'next/image';

export default async function BlogPage() {
    const { data: categories } = await supabase
        .from('blog_categories')
        .select('id, slug, title, description, image_url'); // Явно выбираем нужные поля

    return (
        <main>
            <Header />

            <section className="container mx-auto px-4 py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
                    Блог о воде и скважинах
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories?.map((category) => (
                        <Link
                            key={category.id}
                            href={`/blog/${category.slug}`}
                            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                            <div className="relative h-48 w-full">
                                {category.image_url ? (
                                    <Image
                                        src={category.image_url}
                                        alt={category.title} // Используем русское название для alt
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

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-[#218CE9] mb-2">
                                    {category.title}
                                </h2>
                                {category.description && (
                                    <p className="text-gray-600 line-clamp-3">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {!categories?.length && (
                    <div className="text-center text-red-500 py-8">
                        Категории временно недоступны
                    </div>
                )}
            </section>
        </main>
    );
}