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
      const href = typeof window !== 'undefined'
        ? window.location.href
        : `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
      ym(101237027, 'hit', href);
      if (process.env.NODE_ENV === 'development') {
        // Отладочный лог только в dev
        // eslint-disable-next-line no-console
        console.log('Yandex Metrika HIT sent:', href);
      }
    } else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Yandex Metrika ym function not available');
    }
  }, [pathname, searchParams]); // Зависимости: реагируем на изменение пути или параметров

  return null; // Этот компонент ничего не рендерит
}

// Утилита для отправки целей (используйте при успешной конверсии)
// Пример: sendYandexGoal('form_submit')
export function sendYandexGoal(goalName: string, params?: any) {
  try {
    if (typeof ym === 'function') {
      // reachGoal принимает имя цели и опциональные параметры
      ym(101237027, 'reachGoal', goalName, params);
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to send Yandex goal', e);
    }
  }
}