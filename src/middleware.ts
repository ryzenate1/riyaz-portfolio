import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PREFERENCE_COOKIE = 'ryzen-view-preference';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle root path
  if (pathname === '/') {
    // Check for view query parameter first
    const viewParam = request.nextUrl.searchParams.get('view');
    if (viewParam === 'pro') {
      const response = NextResponse.redirect(new URL('/pro', request.url));
      response.cookies.set(PREFERENCE_COOKIE, 'pro', { maxAge: 60 * 60 * 24 * 365 }); // 1 year
      return response;
    }
    if (viewParam === 'casual') {
      const response = NextResponse.redirect(new URL('/casual', request.url));
      response.cookies.set(PREFERENCE_COOKIE, 'casual', { maxAge: 60 * 60 * 24 * 365 });
      return response;
    }

    // Check for stored preference in cookie
    const preference = request.cookies.get(PREFERENCE_COOKIE)?.value;
    
    if (preference === 'pro') {
      return NextResponse.redirect(new URL('/pro', request.url));
    }

    // Default to casual view
    return NextResponse.redirect(new URL('/casual', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
