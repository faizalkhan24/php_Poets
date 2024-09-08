import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log("Middleware is running!");
  const token = req.cookies.get('authToken');

  if (!token) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL('login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*'], 
}
