import { NextResponse } from 'next/server'
import { parseLocalizedPath, getLocalizedUrl } from './lib/url-localization'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  const parsed = parseLocalizedPath(pathname)
  
  if (parsed) {
    if (parsed.locale === 'fr') {
      const response = NextResponse.next()
      response.headers.set('x-locale', 'fr')
      return response
    }
  }
  
  const locale = request.headers.get('x-locale') || 'en'
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
