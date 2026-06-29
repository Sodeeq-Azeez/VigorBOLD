import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page itself
    if (request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.next()
    }

    const adminAuth = request.cookies.get('admin_auth')

    if (!adminAuth || adminAuth.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
