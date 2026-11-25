import { NextResponse } from 'next/server'
import { getBackendBaseUrl, getBackendPath, redirectToLoginWithError } from '@/lib/server/backend'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'

export async function GET(req: Request) {
  const baseUrl = getBackendBaseUrl()
  const clientId = process.env.XETHER_OAUTH_CLIENT_ID || ''

  if (!baseUrl || !clientId) {
    return redirectToLoginWithError(
      req,
      'Enterprise SSO is not configured. Please sign in with email.',
    )
  }

  const origin = new URL(req.url).origin
  const redirectUri = `${origin}/api/auth/oauth2/callback`

  const authorizePath = getBackendPath('OAUTH_AUTHORIZE', '/oauth/authorize')
  const authorizeUrl = new URL(authorizePath, baseUrl)

  const state = crypto.randomUUID()
  const scope = process.env.XETHER_OAUTH_SCOPES || 'openid profile email'
  const responseType = process.env.XETHER_OAUTH_RESPONSE_TYPE || 'code'

  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('response_type', responseType)
  authorizeUrl.searchParams.set('scope', scope)
  authorizeUrl.searchParams.set('state', state)

  // Preserve an optional next= param (where to go after auth)
  const next = new URL(req.url).searchParams.get('next')
  if (next) authorizeUrl.searchParams.set('next', next)

  const res = NextResponse.redirect(authorizeUrl)
  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/oauth2',
    maxAge: 10 * 60,
  })
  return res
}

