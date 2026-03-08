import { NextResponse } from 'next/server'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  return clearAuthCookies(res)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const redirectTo = searchParams.get('redirect') || '/'
  const res = NextResponse.redirect(new URL(redirectTo, req.url))
  return clearAuthCookies(res)
}

function clearAuthCookies(res: NextResponse) {
  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set(SESSION_COOKIE_ACCESS, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  res.cookies.set(SESSION_COOKIE_REFRESH, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}
