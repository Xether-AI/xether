import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE_ACCESS } from '@/lib/server/session'

const OAUTH_STATE_COOKIE = 'xether_oauth_state'

export async function GET(req: Request) {
  const clientId = process.env.XETHER_GITHUB_CLIENT_ID || ''
  const clientSecret = process.env.XETHER_GITHUB_CLIENT_SECRET || ''

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'GitHub OAuth not configured.' },
      { status: 501 },
    )
  }

  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value ?? null

  if (!code) {
    return NextResponse.json({ error: 'Missing OAuth code' }, { status: 400 })
  }

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 })
  }

  const tokenUrl = 'https://github.com/login/oauth/access_token'
  const body = new URLSearchParams()
  body.set('client_id', clientId)
  body.set('client_secret', clientSecret)
  body.set('code', code)

  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
    },
    body,
  })

  const tokenData = await tokenRes.json()

  if (!tokenRes.ok || tokenData.error) {
    return NextResponse.json(
      { error: tokenData.error_description || 'Token exchange failed' },
      { status: tokenRes.status },
    )
  }

  const accessToken = tokenData.access_token

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || '/'
  const redirectTo = appUrl

  const res = NextResponse.redirect(redirectTo)
  const secure = process.env.NODE_ENV === 'production'

  // Clear state cookie
  res.cookies.set(OAUTH_STATE_COOKIE, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/api/auth/oauth2/github',
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

  return res
}
