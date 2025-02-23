// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ...;
    style-src 'self' 'unsafe-inline';
    img-src 'self' ...;
    font-src 'self' ...;
    connect-src 'self' ...;
    frame-src 'self';
  `

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', cspHeader)
  return response
}