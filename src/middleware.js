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
  
  // Set French locale for French URLs
  if (pathname.startsWith('/evenements') || 
      pathname.startsWith('/contactez-nous') || 
      pathname.startsWith('/inscription-membres-generaux')) {
    const response = NextResponse.next()
    response.headers.set('x-locale', 'fr')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
