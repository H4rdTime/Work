'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface RelatedPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    created_at: string;
    blog_categories?: { slug: string } | { slug: string }[];
}

interface RelatedPostsSectionProps {
    categoryId: number;
    currentPostId: number;
    title?: string;
}

/**
 * Компонент для отображения похожих статей
 * Улучшает SEO через внутренние ссылки (internal linking)
 * Client-side компонент для динамической загрузки
 */
export default function RelatedPostsSection({
    categoryId,
    currentPostId,
    title = 'Читайте также',
}: RelatedPostsSectionProps) {
    const [posts, setPosts] = useState<RelatedPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('id, slug, title, excerpt, created_at, blog_categories!inner(slug)')
                    .eq('category_id', categoryId)
                    .neq('id', currentPostId)
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (!error && data) {
                    setPosts(data);
                }
            } catch (err) {
                console.error('Error fetching related posts:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRelatedPosts();
    }, [categoryId, currentPostId]);

    if (isLoading) {
        return (
            <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="h-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#218CE9] mb-6">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((relatedPost) => {
                    const categorySlug = Array.isArray(relatedPost.blog_categories) 
                        ? relatedPost.blog_categories[0]?.slug 
                        : relatedPost.blog_categories?.slug;
                    
                    return (
                    <Link
                        key={relatedPost.id}
                        href={`/blog/${categorySlug}/${relatedPost.slug}`}
                        className="group block p-4 border border-gray-200 rounded-lg hover:border-[#218CE9] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#218CE9] transition-colors line-clamp-2">
                            {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {relatedPost.excerpt}
                        </p>
                        <time className="text-xs text-gray-400 mt-3 block">
                            {new Date(relatedPost.created_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </time>
                    </Link>
                    );
                })}
            </div>
        </div>
    );
}
