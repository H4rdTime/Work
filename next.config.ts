import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Удалено incrementalRegeneration, так как эта опция больше не поддерживается
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['localhost'], // Добавьте необходимые домены
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'"
          }
        ],
      },
    ]
  },
};

export default nextConfig;