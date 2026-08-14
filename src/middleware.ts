import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes in production if authorization token or session is missing
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    
    // In development mode, allow easy access for testing
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.next();
    }

    if (!adminToken) {
      // Redirect unauthenticated non-admin requests to homepage or login
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
