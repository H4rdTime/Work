// src/app/blog/[category]/[post]/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../../components/Header';
import Head from 'next/head';
import { FiArrowRight } from 'react-icons/fi';
import BlogImageOptimized from '../../../../components/BlogImageOptimized';
import RelatedPostsSection from '../../../../components/RelatedPostsSection';

// Оптимизация TTFB: включить ISR с сокращенным временем кэширования для свежести контента
export const revalidate = 1800; // Переиндексировать каждые 30 минут

export async function generateStaticParams() {
    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, blog_categories!inner(slug, title)')
        .eq('published', true);

    if (error) return [];

    return posts.map((post) => {
        const cat = Array.isArray(post.blog_categories) ? post.blog_categories[0] : post.blog_categories;
        return {
            category: cat?.slug || '',
            post: post.slug
        };
    }).filter(p => p.category);
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

    // Улучшенная JSON-LD структура BlogPosting для SEO
    const jsonLdData: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.title,
        "description": blogPost.excerpt,
        "datePublished": blogPost.created_at,
        "dateModified": blogPost.updated_at || blogPost.created_at,
        "keywords": blogPost.keywords || "анализ воды, скважины, водоснабжение, АкваСервис",
        "inLanguage": "ru",
        "author": {
            "@type": "Organization",
            "name": "АкваСервис",
            "url": "https://aqua-service-karelia.ru",
            "logo": "https://aqua-service-karelia.ru/logo.png"
        },
        "publisher": {
            "@type": "Organization",
            "name": "АкваСервис",
            "logo": {
                "@type": "ImageObject",
                "url": "https://aqua-service-karelia.ru/logo.png"
            }
        }
    };
    
    // Добавляем image если существует
    if (blogPost.image_url) {
        jsonLdData.image = `https://aqua-service-karelia.ru/${blogPost.image_url}`;
    }
    
    const jsonLd = jsonLdData;
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
                {blogPost.image_url && (
                    <meta property="vk:image" content={`https://aqua-service-karelia.ru/${blogPost.image_url}`} />
                )}
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
                <nav className="mb-6 md:mb-8 text-sm text-gray-600">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li><Link href="/" className="hover:text-[#218CE9] transition-colors">Главная</Link></li>
                        <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                        <li><Link href="/blog" className="hover:text-[#218CE9] transition-colors">Блог</Link></li>
                        <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                        <li>
                            <Link href={`/blog/${category}`} className="hover:text-[#218CE9] transition-colors">
                                {(Array.isArray(blogPost.blog_categories) ? blogPost.blog_categories[0]?.title : blogPost.blog_categories?.title) || category}
                            </Link>
                        </li>
                        <li><FiArrowRight className="text-[#218CE9]/60" /></li>
                        <li className="text-[#218CE9] font-medium truncate max-w-[200px]">{blogPost.title}</li>
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

                {/* Изображение поста - использование оптимизированного компонента */}
                <BlogImageOptimized
                  src={blogPost.image_url}
                  alt={`Иллюстрация: ${blogPost.title}`}
                  title={blogPost.title}
                  priority={true}
                />

                {/* Контент */}
                <article className="prose max-w-none w-full">
                    <div
                        className="text-gray-600 text-lg leading-relaxed w-full"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                    />
                </article>

                {/* Related posts for SEO (internal linking) */}
                <RelatedPostsSection
                    categoryId={blogPost.category_id}
                    currentPostId={blogPost.id}
                    title="Похожие рекомендации"
                />

                {/* Back button */}
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
