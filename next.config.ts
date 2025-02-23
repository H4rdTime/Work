import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'supabase.com',
      },
      {
        protocol: 'https',
        hostname: 'aqua-service.netlify.app',
      },
      {
        protocol: 'https',
        hostname: 'jsisjfkucnluxaaxraxt.supabase.co',
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
              // Базовые настройки
              "default-src 'self'",

              // Скрипты
              `script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : ""}`,

              // Стили
              "style-src 'self' 'unsafe-inline'",

              // Изображения
              "img-src 'self' data: https://*.supabase.co",

              // Шрифты
              "font-src 'self' data:",

              // Подключения
              "connect-src 'self' https://*.supabase.co",

              // Фреймы
              "frame-src 'self' https://yandex.ru"
            ].join('; ')
          }
        ]
      },
    ];
  },
};

export default nextConfig;
