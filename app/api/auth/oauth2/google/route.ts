import { NextResponse } from 'next/server'
import { redirectToLoginWithError } from '@/lib/server/backend'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GOOGLE_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GOOGLE_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return redirectToLoginWithError(req, 'Google OAuth is not configured.')

  const origin = new URL(req.url).origin
  const authorizeUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  const state = crypto.randomUUID()
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', `${origin}/api/auth/oauth2/google/callback`)
  authorizeUrl.searchParams.set('response_type', 'code')
  authorizeUrl.searchParams.set('scope', 'openid profile email')
  authorizeUrl.searchParams.set('state', state)
  authorizeUrl.searchParams.set('access_type', 'offline')
  authorizeUrl.searchParams.set('prompt', 'consent')

  const res = NextResponse.redirect(authorizeUrl)
  res.cookies.set(OAUTH_STATE_COOKIE, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: STATE_COOKIE_PATH, maxAge: 10 * 60 })
  return res
}
