import { NextResponse } from 'next/server'
import { redirectToLoginWithError } from '@/lib/server/backend'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITLAB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITLAB_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return redirectToLoginWithError(req, 'GitLab OAuth is not configured.')

  let providerUrl: URL
  try {
    providerUrl = new URL(process.env.XETHER_GITLAB_URL || 'https://gitlab.com')
    if (providerUrl.protocol !== 'https:' && process.env.NODE_ENV === 'production') throw new Error('HTTPS required')
  } catch {
    return redirectToLoginWithError(req, 'GitLab OAuth provider URL is invalid.')
  }
  const origin = new URL(req.url).origin
  const authorizeUrl = new URL('/oauth/authorize', providerUrl)
  const state = crypto.randomUUID()
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/auth/oauth2/gitlab/callback`)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('scope', 'read_user')
  authorizeUrl.searchParams.set('state', state)

  const res = NextResponse.redirect(authorizeUrl)
  res.cookies.set(OAUTH_STATE_COOKIE, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: STATE_COOKIE_PATH, maxAge: 10 * 60 })
  return res
}
