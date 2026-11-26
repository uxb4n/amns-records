import { NextResponse } from 'next/server'

const ARTIST_HOSTS = ['akanico.com', 'www.akanico.com']

export function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0]
  const { pathname } = request.nextUrl

  // akanico.com root → the non-scrolling artist page
  if (ARTIST_HOSTS.includes(host) && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/artist'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// Only intercept the root. Everything else (assets, /noml, /api) passes through.
export const config = { matcher: ['/'] }