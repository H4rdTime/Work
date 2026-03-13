// middleware.ts
// ⚡ Упрощён: убран бесполезный nonce (CSP уже использует 'unsafe-inline')
// CSP заголовки берутся из next.config.ts headers()
// Это устраняет конфликт двух CSP и позволяет кешировать HTML

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Просто пропускаем запрос — CSP настроен в next.config.ts
  return NextResponse.next()
}

// Ограничиваем middleware только нужными путями (не статика/API)
export const config = {
  matcher: [
    // Пропускаем статику, _next, favicon, images
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
}