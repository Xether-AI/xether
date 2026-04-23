import { NextResponse } from 'next/server'
import { getBackendBaseUrl, getBackendPath } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

export async function POST(req: Request) {
  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return NextResponse.json(
      { error: 'Backend not configured. Set XETHER_BACKEND_API_BASE_URL.' },
      { status: 501 },
    )
  }

  const path = getBackendPath('AUTH_REGISTER', '/api/v1/auth/register')
  const body = await req.json().catch(() => ({}))

  const upstreamRes = await fetch(new URL(path, baseUrl), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.XETHER_BACKEND_API_KEY
        ? { authorization: `Bearer ${process.env.XETHER_BACKEND_API_KEY}` }
        : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const contentType = upstreamRes.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await upstreamRes.json().catch(() => null)
    : await upstreamRes.text().catch(() => null)

  if (!upstreamRes.ok) {
    return NextResponse.json(
      typeof data === 'string' ? { error: data } : (data ?? { error: 'Registration failed' }),
      { status: upstreamRes.status },
    )
  }

  const res = NextResponse.json({ ok: true })
  
  type TokenResponse = { access_token?: string; refresh_token?: string }
  const tokenData = data as TokenResponse | null
  
  const accessToken = tokenData?.access_token ? String(tokenData.access_token) : null
  const refreshToken = tokenData?.refresh_token ? String(tokenData.refresh_token) : null

  const secure = process.env.NODE_ENV === 'production'
  if (accessToken) {
    res.cookies.set(SESSION_COOKIE_ACCESS, accessToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
    })
  }
  if (refreshToken) {
    res.cookies.set(SESSION_COOKIE_REFRESH, refreshToken, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
    })
  }

  return res
}

