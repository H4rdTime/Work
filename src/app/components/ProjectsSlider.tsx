"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiDroplet } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  short_description?: string;
  main_image_url?: string;
  depth?: number;
  video_url?: string;
}

const ProjectsSlider = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 1, dragFree: false },
        "(min-width: 1024px)": { slidesToScroll: 1, dragFree: false }
      }
    },
    [WheelGesturesPlugin(), Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: true })]
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, slug, location, short_description, main_image_url, depth, video_url')
          .order('created_at', { ascending: false })
          .limit(6);
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError('Не удалось загрузить проекты');
        console.error('Ошибка загрузки проектов для слайдера:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", updateIndex);
    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse bg-gray-200 h-64 rounded-xl w-full max-w-4xl mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        {error}. Попробуйте обновить страницу.
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="px-4 py-8 container mx-auto">
        <h2 className="text-center font-bold text-3xl text-[#218CE9] mb-8">
          НАШИ ПРОЕКТЫ
        </h2>
        <div className="text-center text-gray-500 py-8">
          Проекты пока не добавлены.
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 container mx-auto">
      <div className="border-b border-black/10 mb-8"></div>
      <h2 className="text-center font-bold text-3xl text-[#218CE9] mb-8">
        НАШИ ПРОЕКТЫ
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="embla overflow-hidden flex-1" ref={emblaRef}>
          <div className="py-4 embla__container flex gap-3">
            {projects.map((project) => (
              <div
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
                key={project.id}
              >
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  {project.main_image_url ? (
                    <div className="relative h-64 w-full">
                      <Image
                        src={project.main_image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-t-xl"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 w-full bg-gray-100 rounded-t-xl flex items-center justify-center">
                      <span className="text-gray-400">Нет фото</span>
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#218CE9] mb-2 group-hover:text-[#1a6fb9]">
                      {project.title}
                    </h3>
                    {project.short_description && (
                      <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
                        {project.short_description}
                      </p>
                    )}
                    <div className="mt-auto space-y-1">
                      {project.location && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <FiMapPin className="text-[#218CE9] mr-1" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.depth && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <FiDroplet className="text-[#218CE9] mr-1" />
                          <span>Глубина: {project.depth} м</span>
                        </div>
                      )}
                      {project.video_url && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 text-[#218CE9] mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                          <span>С видеоотчетом</span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block w-full bg-[#218CE9] text-white py-2 rounded-lg hover:bg-[#1a6fb9] transition-colors text-center mt-4"
                      onMouseEnter={() => router.prefetch(`/projects/${project.slug}`)}
                    >
                      Подробнее
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6 text-[#218CE9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-opacity ${selectedIndex === index ? 'opacity-100' : 'opacity-30'} bg-[#218CE9]`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/projects"
          className="bg-[#218CE9] text-white px-6 py-2 rounded-full hover:bg-[#1a6fb9] transition-colors"
        >
          Все проекты →
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSlider;