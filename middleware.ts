import { type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { updateSession } from './utils/supabase/middleware'

// Authentication middleware for protecting routes and managing sessions

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/auth/confirm', '/auth/error']

export async function middleware(request: NextRequest) {
  // Update the session
  const response = await updateSession(request)

  // Get the pathname
  const { pathname } = request.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return response
  }

  // Check auth status
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // This is handled by the updateSession response
        },
        remove(name: string, options: any) {
          // This is handled by the updateSession response
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // If no user and not on a public route, redirect to login
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return Response.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
