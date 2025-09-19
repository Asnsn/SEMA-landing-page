import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Se estiver tentando acessar /auth/login, redirecionar para /auth/login-custom
  if (pathname === "/auth/login") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login-custom"
    return NextResponse.redirect(url)
  }

  // Se estiver tentando acessar /login, redirecionar para /auth/login-custom
  if (pathname === "/login") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login-custom"
    return NextResponse.redirect(url)
  }

  // Para rotas admin, verificar se há sessão no localStorage (isso será feito no cliente)
  if (pathname.startsWith("/admin")) {
    // Permitir acesso - a verificação de autenticação será feita no cliente
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
