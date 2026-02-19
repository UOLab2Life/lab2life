import { NextResponse } from 'next/server'
import { parseLocalizedPath, getLocalizedUrl } from './lib/url-localization'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if this is a French URL
  const parsed = parseLocalizedPath(pathname)
  
  // Rewrite French-only slugs that don't exist as physical routes to the EN folder
  if (pathname === '/articles/pouvoir-soutien-clinique') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/power-clinical-support'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite nuclear medicine technologists French slug to EN folder path
  if (pathname === '/articles/technologue-medecine-nucleaire') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/nuclear-medicine-technologists'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite body-mind-psyche French slug to EN folder path
  if (pathname === '/articles/corps-esprit-psyche') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/body-mind-psyche'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite psychometrists-mental-health French slug to EN folder path
  if (pathname === '/articles/psychometriciens-sante-mentale') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/psychometrists-mental-health'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite investigating-cells-crime French slug to EN folder path
  if (pathname === '/articles/enqueteurs-cellules-crimes') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/investigating-cells-crime'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite crisis-intervention-workers French slug to EN folder path
  if (pathname === '/articles/intervenants-situation-crise') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/crisis-intervention-workers'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite forensic-scientists-bring-justice French slug to EN folder path
  if (pathname === '/articles/scientifiques-legistes-mettent-justice') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/forensic-scientists-bring-justice'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite pharmacology French slug to EN folder path
  if (pathname === '/articles/monde-pharmacologie-pharmacie-affaires') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/world-pharmacology-pharmacy-business'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite science-safety-toxicology French slug to EN folder path
  if (pathname === '/articles/science-securite-toxicologie') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/science-safety-toxicology'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite clinical-pharmacometricians French slug to EN folder path
  if (pathname === '/articles/pharmacometriciens-clinique-medecine-moderne') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/clinical-pharmacometricians-modern-medicine'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite field-sports-medicine French slug to EN folder path
  if (pathname === '/articles/domaine-medecine-sport') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/field-sports-medicine'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite work-athletic-therapists French slug to EN folder path
  if (pathname === '/articles/travail-therapeutes-sportifs') {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/work-athletic-therapists'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

  // Rewrite closer-look-forensic-pathology French slug to EN folder path
  if (
    pathname === '/articles/regard-approfondi-pathologie-medico-legale' ||
    pathname === '/articles/regard-approfondi-pathologie-médico-légale'
  ) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/articles/closer-look-forensic-pathology'
    const response = NextResponse.rewrite(rewriteUrl)
    response.headers.set('x-locale', 'fr')
    return response
  }

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
