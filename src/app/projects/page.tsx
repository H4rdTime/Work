import { supabase } from '@/lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiMapPin, FiDroplet } from 'react-icons/fi';
import type { Metadata } from 'next';

type ProjectSummary = {
  id: string;
  title: string;
  slug: string;
  location?: string;
  short_description?: string;
  main_image_url?: string;
  depth?: number;
};

async function getAllProjects(): Promise<ProjectSummary[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, location, short_description, main_image_url, depth')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка загрузки списка проектов:', error);
    return [];
  }

  return data as ProjectSummary[];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Наши проекты | АкваСервис Карелия',
    description: 'Список выполненных проектов по бурению скважин и водоснабжению в Карелии.',
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
          Все наши проекты
        </h1>

        {projects.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-12">
            Проекты пока не добавлены. Загляните позже!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {project.main_image_url && (
                  <div className="relative aspect-video">
                    <Image
                      src={project.main_image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#218CE9] mb-2">{project.title}</h2>
                  {project.location && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                      <FiMapPin className="text-current" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  {project.depth && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <FiDroplet className="text-current" />
                      <span>Глубина: {project.depth} м</span>
                    </div>
                  )}
                  {project.short_description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.short_description}</p>
                  )}
                  <div className="mt-auto text-right">
                    <span className="inline-flex items-center text-[#218CE9] hover:text-[#1a6fb9] font-medium transition-colors">
                      Подробнее <FiArrowRight className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}