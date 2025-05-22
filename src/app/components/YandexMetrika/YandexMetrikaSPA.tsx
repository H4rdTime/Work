// src/components/YandexMetrika/YandexMetrikaSPA.tsx
'use client'; // Этот компонент должен быть клиентским

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Объявляем ym в глобальной области, чтобы TypeScript не ругался
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const ym: (...args: any[]) => void;

export default function YandexMetrikaSPA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Проверяем, что ym инициализирован перед вызовом hit
    if (typeof ym === 'function') {
      const url = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
      ym(101237027, 'hit', url); // <-- Вставьте ваш номер счетчика
      console.log('Yandex Metrika HIT sent:', url); // Для отладки
    } else {
        console.warn('Yandex Metrika ym function not available'); // Для отладки
    }
  }, [pathname, searchParams]); // Зависимости: реагируем на изменение пути или параметров

  return null; // Этот компонент ничего не рендерит
}