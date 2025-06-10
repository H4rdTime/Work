import { supabase } from '@/lib/supabase';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiMapPin, FiDroplet, FiCheckCircle, FiClock } from 'react-icons/fi';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Project = {
  id: string;
  title: string;
  slug: string;
  location?: string;
  short_description?: string;
  full_description?: string;
  main_image_url?: string;
  video_url?: string;
  gallery_images?: string[];
  performed_work_items?: string[];
  depth?: number;
  service_type?: string;
  customer_review?: string;
  duration_days?: number;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: projects, error } = await supabase.from('projects').select('slug');

  if (error || !projects) {
    console.error('Ошибка получения slug проектов для generateStaticParams:', error);
    return [];
  }

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error(`Ошибка загрузки проекта с slug ${slug}:`, error);
    return null;
  }

  return data as Project;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Проект не найден | АкваСервис Карелия',
    };
  }

  return {
    title: `${project.title} | Наши проекты | АкваСервис Карелия`,
    description: project.short_description || `Подробное описание проекта ${project.title}.`,
    openGraph: {
      images: project.main_image_url
        ? [`/images/projects/${project.main_image_url.split('/').pop()}`]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {(project.main_image_url || project.video_url) && (
            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
              {project.video_url ? (
                <video
                  src={project.video_url}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay={false}
                  loop={false}
                  muted={false}
                  playsInline
                  preload="metadata"
                  poster={project.main_image_url || undefined}
                >
                  Ваш браузер не поддерживает тег видео.
                </video>
              ) : (
                <Image
                  src={project.main_image_url!}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
          )}

          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-4">{project.title}</h1>

            <div className="flex flex-col gap-4 text-gray-700 text-lg">
              {project.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#218CE9]" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.depth && (
                <div className="flex items-center gap-2">
                  <FiDroplet className="text-[#218CE9]" />
                  <span>Глубина: {project.depth} м</span>
                </div>
              )}
              {project.duration_days && (
                <div className="flex items-center gap-2">
                  <FiClock className="text-[#218CE9]" />
                  <span>
                    Срок: {project.duration_days}{' '}
                    {project.duration_days === 1 ? 'день' : 'дней'}
                  </span>
                </div>
              )}
            </div>

            {project.full_description && (
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <div dangerouslySetInnerHTML={{ __html: project.full_description }} />
              </div>
            )}

            {project.performed_work_items && project.performed_work_items.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#218CE9]/10 mt-6">
                <h3 className="text-xl font-bold text-[#218CE9] mb-3">Выполненные работы:</h3>
                <ul className="space-y-2 text-gray-700">
                  {project.performed_work_items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FiCheckCircle className="text-[#218CE9] mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.customer_review && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#218CE9]/10 mt-6">
                <h3 className="text-xl font-bold text-[#218CE9] mb-3">Отзыв клиента</h3>
                <p className="text-gray-700 italic">{'\u0022'}{project.customer_review}{'\u0022'}</p>
              </div>
            )}
          </div>
        </div>

        {project.gallery_images && project.gallery_images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#218CE9] text-center mb-8">
              Галерея проекта
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.gallery_images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-md"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} - Изображение ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white font-bold text-lg">Увеличить</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/contacts"
            className="inline-flex items-center bg-[#218CE9] text-white px-8 py-4 rounded-full hover:bg-[#1a6fb9] transition-colors text-lg font-semibold"
          >
            Заказать похожий проект <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}