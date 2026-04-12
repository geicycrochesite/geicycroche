import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify, type JWTPayload } from 'jose'

const PUBLIC_PATHS = ['/admin/login', '/admin/setup-admin', '/api/auth/login', '/api/auth/logout']

const AUTH_COOKIE_NAME = 'auth_token'
const JWT_SECRET = process.env.AUTH_JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('AUTH_JWT_SECRET não definido em .env')
}

async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  loginUrl.search = ''
  return NextResponse.redirect(loginUrl)
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Não deve bloquear rotas fora de /admin
  if (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api/admin')
  ) {
    return NextResponse.next()
  }

  // Permite login e endpoints de auth
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value
  if (!token) {
    return redirectToLogin(req)
  }

  const payload = await verifyJWT(token)
  if (!payload || payload.role !== 'admin') {
    return redirectToLogin(req)
  }

  // Autorizado: pode acessar /admin/*
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}