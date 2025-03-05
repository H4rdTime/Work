// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'АкваСервис',
  description: 'Профессиональный сервис водных систем',
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

