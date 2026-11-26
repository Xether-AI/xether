import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirectToLoginWithError, getAppRedirect } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

function fail(req: Request, message: string) {
  const res = redirectToLoginWithError(req, message)
  res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  return res
}

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITLAB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITLAB_CLIENT_SECRET || ''
  let gitlabUrl: URL
  try {
    gitlabUrl = new URL(process.env.XETHER_GITLAB_URL || 'https://gitlab.com')
    if (gitlabUrl.protocol !== 'https:' && process.env.NODE_ENV === 'production') throw new Error('GitLab URL must use HTTPS')
  } catch {
    return fail(req, 'GitLab OAuth provider URL is invalid.')
  }
  if (!clientId || !clientSecret) return fail(req, 'GitLab OAuth is not configured.')

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null
  if (!code) return fail(req, 'Missing GitLab authorization code.')
  if (!state || !storedState || state !== storedState) return fail(req, 'Invalid or expired OAuth state.')

  try {
    const redirectUri = `${url.origin}/api/auth/oauth2/gitlab/callback`
    const body = new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, client_id: clientId, client_secret: clientSecret })
    const tokenRes = await fetch(new URL('/oauth/token', gitlabUrl), {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body, cache: 'no-store',
    })
    const tokenData = await tokenRes.json().catch(() => null) as { access_token?: string; refresh_token?: string; error_description?: string } | null
    if (!tokenRes.ok || !tokenData?.access_token) return fail(req, tokenData?.error_description || 'GitLab token exchange failed.')

    const res = NextResponse.redirect(getAppRedirect(req))
    const secure = process.env.NODE_ENV === 'production'
    res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure })
    res.cookies.set(SESSION_COOKIE_ACCESS, tokenData.access_token, { httpOnly: true, secure, sameSite: 'lax', path: '/' })
    if (tokenData.refresh_token) res.cookies.set(SESSION_COOKIE_REFRESH, tokenData.refresh_token, { httpOnly: true, secure, sameSite: 'lax', path: '/' })
    return res
  } catch {
    return fail(req, 'GitLab sign-in failed. Please try again.')
  }
}
