import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirectToLoginWithError } from '@/lib/server/backend'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITLAB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITLAB_CLIENT_SECRET || ''
  const gitlabUrl = process.env.XETHER_GITLAB_URL || 'https://gitlab.com'

  if (!clientId || !clientSecret) {
    return redirectToLoginWithError(req, 'GitLab OAuth is not configured.')
  }

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null

  if (!code) {
    return redirectToLoginWithError(req, 'Missing GitLab authorization code.')
  }

  if (!state || !storedState || state !== storedState) {
    return redirectToLoginWithError(req, 'Invalid or expired OAuth state.')
  }

  const origin = url.origin
  const redirectUri = `${origin}/api/auth/oauth2/gitlab/callback`

  const tokenUrl = `${gitlabUrl}/oauth/token`
  const body = new URLSearchParams()
  body.set('grant_type', 'authorization_code')
  body.set('code', code)
  body.set('redirect_uri', redirectUri)
  body.set('client_id', clientId)
  body.set('client_secret', clientSecret)

  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })

  const tokenData = await tokenRes.json()

  if (!tokenRes.ok) {
    return redirectToLoginWithError(
      req,
      tokenData.error_description || 'GitLab token exchange failed.',
    )
  }

  const accessToken = tokenData.access_token
  const refreshToken = tokenData.refresh_token

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '/'
  const redirectTo = appUrl

  const res = NextResponse.redirect(redirectTo)
  const secure = process.env.NODE_ENV === 'production'

  // Clear state cookie
  res.cookies.set(OAUTH_STATE_COOKIE, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/oauth2/gitlab',
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
