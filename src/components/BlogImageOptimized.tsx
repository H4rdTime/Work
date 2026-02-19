'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BlogImageOptimizedProps {
  src: string | null | undefined;
  alt: string;
  title?: string;
  priority?: boolean;
}

/**
 * Оптимизированный компонент для вывода изображений в блоге
 * Предотвращает CLS благодаря правильному aspect ratio
 * Показывает skeleton во время загрузки
 */
export default function BlogImageOptimized({
  src,
  alt,
  title = '',
  priority = false,
}: BlogImageOptimizedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Если изображения нет, не отображаем ничего
  if (!src) {
    return null;
  }

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* Skeleton loader для улучшения UX */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 z-10" />
      )}

      {/* Изображение */}
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          priority={priority}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500 text-sm">
            Ошибка загрузки изображения
          </span>
        </div>
      )}
    </div>
  );
}
