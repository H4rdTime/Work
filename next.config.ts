import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["localhost"], // Добавь нужные домены
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Применяется ко всем маршрутам
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self' https://yandex.ru",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
