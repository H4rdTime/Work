// app/sitemap.ts
import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Статические страницы
  const staticRoutes = [
    '/',
    '/services',
    '/about',
    '/contact'
  ].map(route => ({
    url: `${process.env.SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // Динамические страницы из Supabase
  const { data: posts } = await supabase.from('posts_with_hubs').select('id, updated_at');
  
  const dynamicRoutes = posts?.map(post => ({
    url: `${process.env.SITE_URL}/blog/${post.id}`,
    lastModified: new Date(post.updated_at),
    priority: 0.8,
  })) || [];

  return [...staticRoutes, ...dynamicRoutes];
}