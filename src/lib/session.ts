import jwt from 'jsonwebtoken'
import { AdminUserPayload } from '@/lib/auth'

const JWT_SECRET = process.env.AUTH_JWT_SECRET || 'change_me_securely'
const JWT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export function createAuthToken(payload: AdminUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_MAX_AGE_SECONDS
  })
}

export function verifyAuthToken(token: string): AdminUserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded as AdminUserPayload
  } catch (error) {
    return null
  }
}

export function createAuthCookie(token: string) {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: JWT_MAX_AGE_SECONDS
  }
}

