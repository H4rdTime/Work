// src/components/YandexMetrika/YandexMetrikaSPA.tsx
'use client'; // Этот компонент должен быть клиентским

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Объявляем ym в глобальной области, чтобы TypeScript не ругался
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const ym: (...args: any[]) => void;

const COUNTER_ID = 101237027;

/**
 * Отправляет hit в Яндекс.Метрику.
 * Если ym ещё не загружен — ждёт до 5 секунд с интервалом 200мс.
 */
function sendHit(url: string, retries = 25): void {
  if (typeof ym === 'function') {
    ym(COUNTER_ID, 'hit', url);
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Yandex Metrika HIT sent:', url);
    }
  } else if (retries > 0) {
    // ym ещё не загрузился — ждём 200мс и пробуем снова
    setTimeout(() => sendHit(url, retries - 1), 200);
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Yandex Metrika ym function not available after timeout');
  }
}

export default function YandexMetrikaSPA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const url = window.location.href;

    if (isFirstRender.current) {
      // Первый рендер — ym может быть ещё не загружен,
      // поэтому используем sendHit с retry-логикой
      isFirstRender.current = false;
      sendHit(url);
    } else {
      // Последующие навигации — ym уже точно загружен
      if (typeof ym === 'function') {
        ym(COUNTER_ID, 'hit', url);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Yandex Metrika HIT sent:', url);
        }
      }
    }
  }, [pathname, searchParams]); // Зависимости: реагируем на изменение пути или параметров

  return null; // Этот компонент ничего не рендерит
}

// Утилита для отправки целей (используйте при успешной конверсии)
// Пример: sendYandexGoal('form_submit')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendYandexGoal(goalName: string, params?: any) {
  try {
    if (typeof ym === 'function') {
      // reachGoal принимает имя цели и опциональные параметры
      ym(COUNTER_ID, 'reachGoal', goalName, params);
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to send Yandex goal', e);
    }
  }
}