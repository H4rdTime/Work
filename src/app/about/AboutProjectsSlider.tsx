// app/about/AboutProjectsSlider.tsx
// ⚡ Маленький клиентский компонент — только для интерактивного слайдера
"use client";
import { useEffect, useState } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  location?: string;
  main_image_url?: string;
  depth?: number;
}

interface Props {
  projects: Project[];
}

export default function AboutProjectsSlider({ projects }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', updateIndex);
    return () => {
      emblaApi.off('select', updateIndex);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="flex-[0_0_100%] min-w-0 relative" key={project.id}>
                {project.main_image_url ? (
                  <Link href={`/projects/${project.slug}`} className="block relative w-full h-full">
                    <Image
                      src={project.main_image_url}
                      alt={project.title}
                      width={1600}
                      height={900}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white flex flex-col gap-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{project.title}</h3>
                      {project.location && <p className="text-sm opacity-90 mb-0">{project.location}</p>}
                      {project.depth && <p className="text-sm opacity-90 mb-0">Глубина: {project.depth} м</p>}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    Нет изображения
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center bg-gray-100 text-gray-500">
              Проекты пока не добавлены.
            </div>
          )}
        </div>
      </div>

      {/* Навигационные точки */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index
                ? 'bg-[#218CE9] scale-125'
                : 'bg-white/50 hover:scale-110'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
