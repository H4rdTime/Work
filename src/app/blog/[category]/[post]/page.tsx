// src/app/blog/[category]/[post]/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Image from 'next/image';
import Head from 'next/head';
import parse, { domToReact, Element } from 'html-react-parser';

export async function generateStaticParams() {
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, blog_categories!inner(slug, title)')
        .eq('published', true);

    if (error) return [];

    return posts.map((post) => ({
        category: post.blog_categories[0]?.slug || '',
        post: post.slug
    })).filter(p => p.category);
}

// Обновляем интерфейс PageParams
interface PageParams {
    params: Promise<{
        category: string;
        post: string;
    }>;
}

// Используем явное указание типа для пропсов
export default async function PostPage({ params }: PageParams) {
    const { category, post } = await params;
    const { data: blogPost, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories!inner(*)')
        .eq('slug', post)
        .single();

    if (error || !blogPost) {
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-500">
                    Пост не найден.
                </div>
            </main>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogPost.title,
        "description": blogPost.excerpt,
        "datePublished": blogPost.created_at,
        "author": {
            "@type": "Organization",
            "name": "АкваСервис",
        },
        "image": blogPost.image_url
    };
    console.log('Posts data:', JSON.stringify(blogPost, null, 2));

    return (
        <main>
            <Header />
            <Head>
                {/* Основные метатеги */}
                <title>{`${blogPost.title} | АкваСервис`}</title>
                <meta name="description" content={blogPost.excerpt} />

                {/* Open Graph (обязательно для ВКонтакте и Telegram) */}
                <meta property="og:title" content={blogPost.title} />
                <meta property="og:description" content={blogPost.excerpt} />
                <meta property="og:type" content="article" />
                <meta
                    property="og:url"
                    content={`https://aqua-service-karelia.ru/blog/${category}/${post}`}
                />
                {blogPost.image_url && (
                    <meta
                        property="og:image"
                        content={`https://aqua-service-karelia.ru/${blogPost.image_url}`}
                    />
                )}

                {/* Дополнительные теги для ВКонтакте */}
                <meta property="vk:image" content={`https://aqua-service-karelia.ru/${blogPost.image_url}`} />
                <meta name="vk:title" content={blogPost.title} />
                <meta name="vk:description" content={blogPost.excerpt} />

                {/* Для Telegram (использует Open Graph, но можно добавить явно) */}
                <meta property="telegram:title" content={blogPost.title} />
                <meta property="telegram:description" content={blogPost.excerpt} />
                {blogPost.image_url && (
                    <meta
                        property="telegram:image"
                        content={`https://aqua-service-karelia.ru/${blogPost.image_url}`}
                    />
                )}

                {/* Каноническая ссылка */}
                <link
                    rel="canonical"
                    href={`https://aqua-service-karelia.ru/blog/${category}/${post}`}
                />
            </Head>

            <Script
                id="post-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Хлебные крошки */}
                <nav className="mb-8 text-sm text-gray-500" aria-label="Навигация">
                    <ol className="flex flex-wrap items-center space-x-2">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-[#218CE9] transition-colors"
                            >
                                Главная
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href="/blog"
                                className="hover:text-[#218CE9] transition-colors"
                            >
                                Блог
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href={`/blog/${category}`}
                                className="hover:text-[#218CE9] transition-colors"
                            >
                                {blogPost.blog_categories.title || category}
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-400 truncate max-w-[200px]">
                            {blogPost.title}
                        </li>
                    </ol>
                </nav>
                {/* Заголовок и метаданные */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-4">
                        {blogPost.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <time className="text-sm">
                            {new Date(blogPost.created_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                </div>

                {/* Изображение поста */}
                {blogPost.image_url && (
                    <div className="relative h-64 md:h-96 w-full mb-8">
                        <Image
                            src={blogPost.image_url}
                            alt={`Иллюстрация: ${blogPost.title}`} // Описательный alt
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority={true} // Приоритетная загрузка для первого изображения
                        />
                    </div>
                )}

                {/* Контент */}
                <article className="prose max-w-none w-full">
                    <div
                        className="text-gray-600 text-lg leading-relaxed w-full"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                </article>

                {/* Кнопка возврата */}
                <div className="mt-12">
                    <Link
                        href={`/blog/${category}`}
                        className="inline-flex items-center text-[#218CE9] hover:text-[#1a6fb9] transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Назад к категории
                    </Link>
                </div>
            </section>
        </main>
    );
}
