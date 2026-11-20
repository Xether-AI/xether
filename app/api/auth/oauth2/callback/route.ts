import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getBackendBaseUrl, getBackendPath, redirectToLoginWithError } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'

export async function GET(req: Request) {
  const baseUrl = getBackendBaseUrl()
  const clientId = process.env.XETHER_OAUTH_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_OAUTH_CLIENT_SECRET || ''

  if (!baseUrl || !clientId) {
    return redirectToLoginWithError(req, 'Enterprise SSO is not configured.')
  }

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null

  if (!code) {
    return redirectToLoginWithError(req, 'Missing OAuth authorization code.')
  }

  if (!state || !storedState || state !== storedState) {
    return redirectToLoginWithError(req, 'Invalid or expired OAuth state. Please try again.')
  }

  const origin = url.origin
  const redirectUri = `${origin}/api/auth/oauth2/callback`

  const tokenPath = getBackendPath('OAUTH_TOKEN', '/oauth/token')
  const tokenUrl = new URL(tokenPath, baseUrl)

  const body = new URLSearchParams()
  body.set('grant_type', 'authorization_code')
  body.set('code', code)
  body.set('redirect_uri', redirectUri)
  body.set('client_id', clientId)
  if (clientSecret) body.set('client_secret', clientSecret)

  const upstreamRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...(process.env.XETHER_BACKEND_API_KEY
        ? { authorization: `Bearer ${process.env.XETHER_BACKEND_API_KEY}` }
        : {}),
    },
    body,
    cache: 'no-store',
  })

  const contentType = upstreamRes.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await upstreamRes.json().catch(() => null)
    : await upstreamRes.text().catch(() => null)

  if (!upstreamRes.ok) {
    const msg =
      typeof data === 'string'
        ? data
        : (data as { error?: string } | null)?.error || 'OAuth token exchange failed.'
    return redirectToLoginWithError(req, msg)
  }

  type TokenResponse = { access_token?: string; refresh_token?: string }
  const tokenData = data as TokenResponse | null
  
  const accessToken = tokenData?.access_token ? String(tokenData.access_token) : null
  const refreshToken = tokenData?.refresh_token ? String(tokenData.refresh_token) : null

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const next = url.searchParams.get('next')

  let redirectTo: string = appUrl || '/'
  if (next) {
    const isAppUrlAbsolute = appUrl.startsWith('http://') || appUrl.startsWith('https://')
    redirectTo = isAppUrlAbsolute ? new URL(next, appUrl).toString() : next.startsWith('/') ? next : '/'
  }

  const res = NextResponse.redirect(redirectTo)
  const secure = process.env.NODE_ENV === 'production'

  // Clear state cookie
  res.cookies.set(OAUTH_STATE_COOKIE, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/oauth2',
    maxAge: 0,
  })

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

