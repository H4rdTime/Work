// next.config.ts
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      'mc.yandex.ru',
      'www.google-analytics.com',
      'jsisjfkucnluxaaxraxt.supabase.co'
    ],
    // Добавляем оптимизации для LCP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Разрешаем все поддомены Supabase
      },
      {
        protocol: "https",
        hostname: "yastatic.net", // Для Яндекс.Метрики
      },
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

              // Скрипты
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co https://yastatic.net https://mc.yandex.ru https://www.googletagmanager.com",
              // Стили
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Изображения
              "img-src 'self' data: https://*.supabase.co https://mc.yandex.ru",

              // Шрифты
              "font-src 'self' data: https://fonts.gstatic.com",

              // Подключения
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://mc.yandex.ru",

              // Фреймы
              "frame-src 'self' https://yandex.ru",

              // Дополнительные настройки
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests" // Для HTTPS
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Включаем сжатие
  compress: true,

};

module.exports = nextConfig;