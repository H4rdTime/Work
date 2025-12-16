// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspDirectives = [
    "default-src 'self'",
    // allow site scripts, Google Tag Manager and Yandex resources
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://mc.yandex.ru https://yastatic.net https://api-maps.yandex.ru`,
    "style-src 'self' 'unsafe-inline' https://yastatic.net",
    "img-src 'self' data: https://yastatic.net https://mc.yandex.ru",
    "font-src 'self' data: https://yastatic.net",
    "connect-src 'self' https://mc.yandex.ru https://api-maps.yandex.ru https://www.google-analytics.com",
    "frame-src 'self' https://yandex.ru https://api-maps.yandex.ru",
  ]
  const cspHeader = cspDirectives.join('; ')

  const response = NextResponse.next()
  // expose the nonce to server-side rendering so inline scripts can include it
  response.cookies.set('csp-nonce', nonce, { path: '/' })
  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}