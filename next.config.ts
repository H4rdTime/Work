// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mc.yandex.ru', 'www.google-analytics.com'],

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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.supabase.co https://yastatic.net",

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
};

module.exports = nextConfig;