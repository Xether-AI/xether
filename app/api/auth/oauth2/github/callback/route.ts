import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirectToLoginWithError, getAppRedirect } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

function fail(req: Request, message: string) {
  const res = redirectToLoginWithError(req, message)
  res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  return res
}

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITHUB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITHUB_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return fail(req, 'GitHub OAuth is not configured.')

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null
  if (!code) return fail(req, 'Missing GitHub authorization code.')
  if (!state || !storedState || state !== storedState) return fail(req, 'Invalid or expired OAuth state.')

  try {
    const body = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code })
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
      body,
      cache: 'no-store',
    })
    const tokenData = await tokenRes.json().catch(() => null) as { access_token?: string; error?: string } | null
    if (!tokenRes.ok || tokenData?.error || !tokenData?.access_token) return fail(req, 'GitHub token exchange failed.')

    const res = NextResponse.redirect(getAppRedirect(req))
    const secure = process.env.NODE_ENV === 'production'
    res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure })
    res.cookies.set(SESSION_COOKIE_ACCESS, tokenData.access_token, { httpOnly: true, secure, sameSite: 'lax', path: '/' })
    return res
  } catch {
    return fail(req, 'GitHub sign-in failed. Please try again.')
  }
}
