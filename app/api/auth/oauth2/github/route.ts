import { NextResponse } from 'next/server'
import { redirectToLoginWithError } from '@/lib/server/backend'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITHUB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITHUB_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return redirectToLoginWithError(req, 'GitHub OAuth is not configured.')

  const origin = new URL(req.url).origin
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')
  const state = crypto.randomUUID()
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/auth/oauth2/github/callback`)
  authorizeUrl.searchParams.set('scope', 'read:user user:email')
  authorizeUrl.searchParams.set('state', state)

  const res = NextResponse.redirect(authorizeUrl)
  res.cookies.set(OAUTH_STATE_COOKIE, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: STATE_COOKIE_PATH, maxAge: 10 * 60 })
  return res
}
