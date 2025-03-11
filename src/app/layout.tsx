// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://aqua-service-karelia.ru/'),
  title: {
    default: 'АкваСервис - Бурение скважин, водоочистка, насосы и фильтры в Петрозаводске | Консультации, монтаж и сервис',
    template: '%s | АкваСервис Карелия'
  },
  description: 'Профессиональное бурение скважин, установка систем водоочистки и автономной канализации в Петрозаводске и Республике Карелия. 15+ лет опыта, гарантия 10 лет, оборудование от производителя. Работаем в Петрозаводске, Кондопоге, Медвежьегорске, Пряже, Шуе, Сортавале.',
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
    'химический анализ воды'
  ],
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
}


interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.className} antialiased`}
    >
      <body className="bg-white">
        {children}
        <GoogleAnalytics gaId="G-0YHV1T38RB" />

      </body>
    </html>
  )
}

