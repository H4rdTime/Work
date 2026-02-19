'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

/**
 * ⚡ Web Vitals отслеживание
 * Отправляет Core Web Vitals метрики в Google Analytics
 * Помогает мониторить улучшения производительности
 */
export function WebVitalsComponent() {
  useEffect(() => {
    // CLS - Cumulative Layout Shift
    onCLS(({ value }) => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          'cls': value,
        });
      }
    });

    // FCP - First Contentful Paint
    onFCP(({ value }) => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          'fcp': value,
        });
      }
    });

    // INP - Interaction to Next Paint (replaces FID)
    onINP(({ value }) => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          'inp': value,
        });
      }
    });

    // LCP - Largest Contentful Paint
    onLCP(({ value }) => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          'lcp': value,
        });
      }
    });

    // TTFB - Time to First Byte
    onTTFB(({ value }) => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          'ttfb': value,
        });
      }
    });
  }, []);

  return null;
}
