// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode, Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
// import Image from 'next/image'; // Импорт Image должен быть удален, если не используется

// Компоненты
import YandexMetrikaSPA from './components/YandexMetrika/YandexMetrikaSPA';
import { WebVitalsComponent } from '../components/WebVitalsComponent';
// Оптимизация: добавляем display=swap для быстрого отображения системного шрифта
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Улучший CLS и TTFB
  preload: true,
  weight: ['400', '500', '600', '700'], // Предварительно загружаем важные веса
});


export const metadata = {
  metadataBase: new URL('https://aqua-service-karelia.ru/'),
  title: {
    default:
      'АкваСервис - Бурение скважин, водоочистка, насосы и фильтры в Петрозаводске | Консультации, монтаж и сервис',
    template: '%s | АкваСервис Карелия',
  },
  description:
    'Профессиональное бурение скважин, установка систем водоочистки и автономной канализации в Петрозаводске и Республике Карелия. 15+ лет опыта, гарантия 10 лет, оборудование от производителя. Работаем в Петрозаводске, Кондопоге, Медвежьегорске, Пряже, Шуе, Сортавале.',
  openGraph: {
    images: '/images/og-image.png',
    locale: 'ru_RU',
    type: 'website',
  },
  keywords: [
    'бурение скважин Петрозаводск',
    'водоочистка Карелия',
    'автономная канализация',
    'ремонт скважин',
    'химический анализ воды',
  ],
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

// Оптимизация: Добавляем правила кэширования для улучшения TTFB
export const revalidate = 3600; // ISR: переиндексируем каждый час

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${inter.className} antialiased`}>
      <head>
        {/* Character encoding for Cyrillic text */}
        <meta charSet="utf-8" />
        
        {/* ⚡ Performance: Preload Google Fonts для улучшения FCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta теги для браузера */}
        <meta name="theme-color" content="#218CE9" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* JSON-LD Schema - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://aqua-service-karelia.ru/#organization',
              name: 'АкваСервис Карелия',
              description: 'Профессиональное бурение скважин и системы водоочистки',
              url: 'https://aqua-service-karelia.ru',
              image: 'https://aqua-service-karelia.ru/images/og-image.png',
              logo: 'https://aqua-service-karelia.ru/images/logo.png',
              sameAs: [],
              telephone: '+7-921-',
              areaServed: {
                '@type': 'State',
                name: 'Карелия',
              },
              priceRange: '$$$',
            }),
          }}
        />
        {/* /JSON-LD Schema */}
      </head>
      <body className="bg-white">
        {children}
        <SpeedInsights />
        <WebVitalsComponent />

        {/* Yandex.Metrika counter - Основной скрипт */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(101237027, "init", { // Проверьте ваш номер счетчика
                  defer: true,
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
            });
          `}
        </Script>
        {/* <noscript> часть с обычным HTML тегом <img> */}
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */} {/* <-- Убедитесь, что эта строка ТОЛЬКО такая */}
            <img
              src="https://mc.yandex.ru/watch/101237027" // Проверьте ваш номер счетчика
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}

        {/* Yandex.Metrika SPA page view tracker */}
        <Suspense fallback={null}>
          <YandexMetrikaSPA />
        </Suspense>
        {/* /Yandex.Metrika SPA page view tracker */}


        {/* Google Analytics counter */}
        <GoogleAnalytics gaId="G-0YHV1T38RB" />
        {/* /Google Analytics counter */}

        {/* Vercel Web Analytics - Real User Monitoring */}
        <Analytics />
        {/* /Vercel Web Analytics */}
      </body>
    </html>
  );
}