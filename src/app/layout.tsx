// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://aqua-service-karelia.ru/'),
  title: {
    default: 'АкваСервис - Бурение скважин в Карелии',
    template: '%s | АкваСервис'
  },
  description:
    'АкваСервис – эксперт по водоочистке, бурению скважин, монтажу систем очистки воды, химическому анализу и установке станций биоочистки в Республике Карелия. Профессиональные услуги для жителей Петрозаводска, Кондопоги, Медвежьегорска, Пряжи, Шуи, Деревянного, Сортавалы, Лахденпохьи, Питкяранты, Олонца, Суоярви и Сегежи. Чистая вода – залог здоровья!',
  openGraph: {
    images: '/images/og-image.png',
  },
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

