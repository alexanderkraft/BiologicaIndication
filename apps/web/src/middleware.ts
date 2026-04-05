import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js middleware to protect authenticated routes.
 * All routes under /app/(auth)/ require a valid Auth0 session.
 * Sessions use JWT with 60-minute expiry and refresh token rotation.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();

  // Public routes that don't require authentication
  const publicPaths = ['/', '/api/auth', '/login', '/api/health'];
  const isPublic = publicPaths.some(
    (path) => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(path + '/'),
  );

  if (isPublic) {
    return res;
  }

  try {
    const session = await getSession(req, res);

    if (!session) {
      const loginUrl = new URL('/api/auth/login', req.url);
      loginUrl.searchParams.set('returnTo', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return res;
  } catch {
    const loginUrl = new URL('/api/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/health|login|$).*)',
  ],
};
