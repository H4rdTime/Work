// next.config.ts
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    // Добавляем оптимизации для LCP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
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

              // Скрипты - ДОБАВЛЕНО https://mc.yandex.com
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co https://yastatic.net https://mc.yandex.ru https://mc.yandex.com https://www.googletagmanager.com",
              // Стили
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // Изображения - ДОБАВЛЕНО https://mc.yandex.com
              "img-src 'self' data: https://*.supabase.co https://mc.yandex.ru https://mc.yandex.com",

              // Шрифты
              "font-src 'self' data: https://fonts.gstatic.com",

              // Подключения - ДОБАВЛЕНО https://mc.yandex.com (на всякий случай, хотя в ошибках connect-src его не было) и region1.google-analytics.com
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://mc.yandex.ru https://mc.yandex.com https://www.google-analytics.com https://region1.google-analytics.com",

              // Фреймы - ДОБАВЛЕНО https://mc.yandex.com
              "frame-src 'self' https://yandex.ru https://mc.yandex.com",

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

// module.exports = withBundleAnalyzer(nextConfig); // Если вы используете bundle analyzer, оставьте эту строку
module.exports = nextConfig; // Если не используете, используйте эту