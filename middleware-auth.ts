import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Rotas que precisam de autenticação
  const protectedRoutes = ['/admin', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Se for uma rota protegida, verificar se há token de admin
  if (isProtectedRoute) {
    const adminToken = req.cookies.get('admin-token')?.value
    const adminUser = req.cookies.get('admin_user')?.value

    if (!adminToken && !adminUser) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Se estiver na página de login e já estiver autenticado, redirecionar para admin
  if (req.nextUrl.pathname === '/login') {
    const adminToken = req.cookies.get('admin-token')?.value
    const adminUser = req.cookies.get('admin_user')?.value

    if (adminToken || adminUser) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
