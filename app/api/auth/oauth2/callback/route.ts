import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getBackendBaseUrl, getBackendPath, redirectToLoginWithError, getAppRedirect } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

function fail(req: Request, message: string) {
  const res = redirectToLoginWithError(req, message)
  res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  return res
}

export async function GET(req: Request) {
  const baseUrl = getBackendBaseUrl()
  const clientId = process.env.XETHER_OAUTH_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_OAUTH_CLIENT_SECRET || ''
  if (!baseUrl || !clientId) return fail(req, 'Enterprise SSO is not configured.')

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null
  if (!code) return fail(req, 'Missing OAuth authorization code.')
  if (!state || !storedState || state !== storedState) return fail(req, 'Invalid or expired OAuth state. Please try again.')

  try {
    const redirectUri = `${url.origin}/api/auth/oauth2/callback`
    const tokenUrl = new URL(getBackendPath('OAUTH_TOKEN', '/oauth/token'), baseUrl)
    const body = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, client_id: clientId })
    if (clientSecret) body.set('client_secret', clientSecret)
    const upstreamRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        ...(process.env.XETHER_BACKEND_API_KEY ? { authorization: `Bearer ${process.env.XETHER_BACKEND_API_KEY}` } : {}),
      },
      body,
      cache: 'no-store',
    })
    const tokenData = await upstreamRes.json().catch(() => null) as { access_token?: string; refresh_token?: string; error?: string } | null
    if (!upstreamRes.ok || !tokenData?.access_token) return fail(req, tokenData?.error || 'OAuth token exchange failed.')

    const res = NextResponse.redirect(getAppRedirect(req, url.searchParams.get('next')))
    const secure = process.env.NODE_ENV === 'production'
    res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure })
    res.cookies.set(SESSION_COOKIE_ACCESS, tokenData.access_token, { httpOnly: true, secure, sameSite: 'lax', path: '/' })
    if (tokenData.refresh_token) res.cookies.set(SESSION_COOKIE_REFRESH, tokenData.refresh_token, { httpOnly: true, secure, sameSite: 'lax', path: '/' })
    return res
  } catch {
    return fail(req, 'Enterprise sign-in failed. Please try again.')
  }
}
