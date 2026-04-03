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

              // Скрипты - ДОБАВЛЕНО https://mc.yandex.md
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co https://yastatic.net https://mc.yandex.ru https://mc.yandex.md https://mc.yandex.com https://www.googletagmanager.com",
              // Стили
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Изображения - ДОБАВЛЕНО https://mc.yandex.md
              "img-src 'self' data: https://*.supabase.co https://mc.yandex.ru https://mc.yandex.md https://mc.yandex.com",

              // Шрифты
              "font-src 'self' data: https://fonts.gstatic.com",

              // Подключения - ДОБАВЛЕНО https://mc.yandex.md
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://mc.yandex.ru https://mc.yandex.md https://mc.yandex.com https://www.google-analytics.com https://region1.google-analytics.com",

              // Фреймы - ДОБАВЛЕНО https://mc.yandex.md
              "frame-src 'self' https://yandex.ru https://mc.yandex.md https://mc.yandex.com https://webvisor.com https://metrika.yandex.ru",
              // Разрешаем frame-ancestors для Webvisor/Metriкa (нужен для воспроизведения в интерфейсе Метрики)
              "frame-ancestors 'self' https://webvisor.com https://metrika.yandex.ru https://mc.yandex.ru https://mc.yandex.md",

              // Дополнительные настройки
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests" // Для HTTPS
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