// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://jsisjfkucnluxaaxraxt.supabase.co",
              
              // Стили
              "style-src 'self' 'unsafe-inline'",
              
              // Изображения
              "img-src 'self' data: https://*.supabase.co",
              
              // Шрифты
              "font-src 'self' data: https:",
              
              // Подключения
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              
              // Фреймы
              "frame-src 'self' https://yandex.ru",
              
              // Дополнительные настройки
              "base-uri 'self'",
              "form-action 'self'"
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;