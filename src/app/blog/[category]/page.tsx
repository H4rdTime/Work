// src/app/blog/[category]/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Header from '../../components/Header';
import Image from 'next/image';

// Define the structure of a post
interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    created_at: string;
    image_url?: string;
    blog_categories: {
        slug: string;
        title: string;
        image_url?: string;
    }[];
}

export async function generateStaticParams() {
    const { data: categories, error } = await supabase
        .from('blog_categories')
        .select('slug');

    if (error) {
        console.error('Ошибка получения категорий:', error);
        return [];
    }

    return categories.map((cat: { slug: string }) => ({ category: cat.slug }));
}

export default async function CategoryBlogPage({
    params
}: {
    params: Promise<{category: string }>
}) {
    const {category} = await params; 
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select(`
            *,
            blog_categories:blog_categories!inner(slug, title, image_url)
        `)
        .eq('blog_categories.slug', category)
        .order('created_at', { ascending: false });

    if (error || !posts) {
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Ошибка загрузки постов
                </div>
            </main>
        );
    }
    console.log('Posts data:', JSON.stringify(posts, null, 2));

    const firstPostCategory = posts[0]?.blog_categories?.[0];

    return (
        <main>
            <Header />

            <section className="container mx-auto px-4 py-8">
                {/* Шапка категории */}
                <div className="mb-8">
                    <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg bg-gray-100">
                        {firstPostCategory?.image_url && (
                            <Image
                                src={firstPostCategory.image_url}
                                alt={firstPostCategory.title || category}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 80vw"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {posts[0]?.blog_categories?.title || category}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Список постов */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post: Post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Link href={`/blog/${category}/${post.slug}`}>
                                <div className="relative h-48 w-full">
                                    {post.image_url ? (
                                        <Image
                                            src={post.image_url}
                                            alt={post.title}
                                            fill
                                            className="object-cover rounded-t-xl"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-400">Нет изображения</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-[#218CE9] mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <time className="text-sm text-gray-400">
                                        {new Date(post.created_at).toLocaleDateString('ru-RU', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center text-red-500 py-8">
                        Постов в этой категории пока нет
                    </div>
                )}
            </section>
        </main>
    );
}
