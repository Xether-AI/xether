import { NextResponse } from 'next/server'
import { redirectToLoginWithError } from '@/lib/server/backend'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITHUB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITHUB_CLIENT_SECRET || ''

  if (!clientId || !clientSecret) {
    return redirectToLoginWithError(req, 'GitHub OAuth is not configured.')
  }

  const origin = new URL(req.url).origin
  const redirectUri = `${origin}/api/auth/oauth2/github/callback`

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')
  const state = crypto.randomUUID()
  const scope = 'read:user user:email'

  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', scope)
  authorizeUrl.searchParams.set('state', state)

  const res = NextResponse.redirect(authorizeUrl)
  const secure = process.env.NODE_ENV === 'production'
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/oauth2/github',
    maxAge: 10 * 60,
  })
  return res
}
