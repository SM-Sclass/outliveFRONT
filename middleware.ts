import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Public routes that don't need authentication
    const publicRoutes = ['/auth/login','/auth/signup', '/api/auth/login', '/api/auth/signup', '/api/auth/token'];

    // Allow public routes without token
    if (publicRoutes.includes(pathname)) {
        // Redirect to dashboard if user is already logged in
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Redirect to dashboard if the user is already logged in and tries to visit the root '/'
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Check authentication for protected pages
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};