import { NextResponse } from 'next/server'
import { parseLocalizedPath, getLocalizedUrl } from './lib/url-localization'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if this is a French URL
  const parsed = parseLocalizedPath(pathname)
  
  if (parsed) {
    if (parsed.locale === 'fr') {
      const response = NextResponse.next()
      response.headers.set('x-locale', 'fr')
      return response
    }
  }
  
  // Check if we need to redirect /events to /evenements for French users
  if (pathname === '/events') {
    const locale = request.headers.get('x-locale') || 'en'
    if (locale === 'fr') {
      return NextResponse.redirect(new URL('/evenements', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
