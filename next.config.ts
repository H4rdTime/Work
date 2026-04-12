// next.config.ts
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    // Добавляем оптимизации для LCP и Performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'], // AVIF первый (меньший размер)
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "yastatic.net",
      },
      {
        protocol: "https",
        hostname: "mc.yandex.ru",
      },
       { // <-- Добавлено разрешение для mc.yandex.com
        protocol: "https",
        hostname: "mc.yandex.com",
      },
      {
        protocol: "https",
        hostname: "www.google-analytics.com",
      },
       { // <-- Добавлено разрешение для region1.google-analytics.com, если оно используется
         protocol: "https",
         hostname: "region1.google-analytics.com",
       }
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Основные директивы
              "default-src 'self'",

              // Скрипты — все домены Яндекс.Метрики + Карты + Google Analytics + Vercel
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co https://yastatic.net https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com https://yandex.md https://*.yandex.md https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",

              // Стили
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://yastatic.net",

              // Изображения
              "img-src 'self' data: blob: https://*.supabase.co https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com https://*.yandex.md https://yastatic.net",

              // Шрифты
              "font-src 'self' data: https://fonts.gstatic.com https://yastatic.net",

              // Подключения — Метрика + Карты + Supabase + Analytics
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com https://*.yandex.md wss://*.yandex.ru wss://*.yandex.com wss://*.yandex.md https://yastatic.net https://www.google-analytics.com https://region1.google-analytics.com https://va.vercel-scripts.com",

              // Фреймы — Яндекс.Карты виджет загружается с yandex.ru (без поддомена!)
              "frame-src 'self' https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com https://*.yandex.md https://webvisor.com",

              // Разрешаем frame-ancestors для Webvisor/Метрика
              "frame-ancestors 'self' https://webvisor.com https://yandex.ru https://*.yandex.ru https://*.yandex.com https://*.yandex.md",

              // Worker-src нужен Метрике для Webvisor 2.0
              "worker-src 'self' blob:",

              // Дополнительные настройки
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join("; "),
          },
          // Оптимизация TTFB: добавляем заголовки кэширования
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
          // Добавляем X-Content-Type-Options для безопасности
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Примечание: X-Frame-Options удалён, используем CSP frame-ancestors
        ],
      },
      // Отдельные правила для изображений - агрессивное кэширование
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Отдельные правила для шрифтов 
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Отдельные правила для API эндпоинтов - никакого кэширования
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  // Включаем сжатие
  compress: true,

  // ⚡ Performance: Оптимизации для улучшения TTI и LCP
  productionBrowserSourceMaps: false, // Не отправляем source maps в продакшен
  output: 'standalone', // ⚡ Подготовка для VPS
};

module.exports = nextConfig;