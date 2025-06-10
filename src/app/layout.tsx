// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode, Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
// import Image from 'next/image'; // Импорт Image должен быть удален, если не используется

// Предположим, вы создали этот файл
import YandexMetrikaSPA from './components/YandexMetrika/YandexMetrikaSPA';
const inter = Inter({ subsets: ['latin'] });


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

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${inter.className} antialiased`}>
      <body className="bg-white">
        {children}
        <SpeedInsights />

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
      </body>
    </html>
  );
}