import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/restful', '/history', '/variables'];
const authRoutes = ['/signin', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  const pathNameWithoutLocale = pathname.replace(/^\/(en|ru)/, '');

  const isProtected = protectedRoutes.some((route) =>
    pathNameWithoutLocale.startsWith(route)
  );
  const isAuthPage = authRoutes.includes(pathNameWithoutLocale);

  const url = new URL(`/`, request.url);

  if ((!token && isProtected) || (token && isAuthPage)) {
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
