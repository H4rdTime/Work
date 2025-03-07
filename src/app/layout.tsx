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
  description: 'Профессиональное бурение скважин с гарантией 10 лет...',
  openGraph: {
    images: '/images/og-image.png',
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
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white">
        {children}
        <GoogleAnalytics gaId="G-0YHV1T38RB" />

      </body>
    </html>
  )
}

