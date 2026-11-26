import { NextResponse } from 'next/server'
import { SESSION_COOKIE_ACCESS, SESSION_COOKIE_REFRESH } from '@/lib/server/session'
import { getBackendPath, getBackendBaseUrl } from '@/lib/server/backend'
import { safeRelativeRedirect } from '@/lib/security/redirect'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'
const STATE_COOKIE_PATH = '/api/auth/oauth2'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const baseUrl = getBackendBaseUrl()
  const clientId = process.env.XETHER_OAUTH_CLIENT_ID || ''
  if (!baseUrl || !clientId) return errorRedirect(req, 'Enterprise SSO is not configured.')

  const authorizeUrl = new URL(getBackendPath('OAUTH_AUTHORIZE', '/oauth/authorize'), baseUrl)
  const state = crypto.randomUUID()
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', `${url.origin}/api/auth/oauth2/callback`)
  authorizeUrl.searchParams.set('response_type', process.env.XETHER_OAUTH_RESPONSE_TYPE || 'code')
  authorizeUrl.searchParams.set('scope', process.env.XETHER_OAUTH_SCOPES || 'openid profile email')
  authorizeUrl.searchParams.set('state', state)
  const next = url.searchParams.get('next')
  const safeNext = next ? safeRelativeRedirect(next, '') : ''
  if (safeNext) authorizeUrl.searchParams.set('next', safeNext)

  const res = NextResponse.redirect(authorizeUrl)
  res.cookies.set(OAUTH_STATE_COOKIE, state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: STATE_COOKIE_PATH, maxAge: 10 * 60 })
  return res
}

function errorRedirect(req: Request, message: string) {
  const target = new URL('/login', req.url)
  target.searchParams.set('error', message)
  const res = NextResponse.redirect(target)
  res.cookies.set(OAUTH_STATE_COOKIE, '', { path: STATE_COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  return res
}
