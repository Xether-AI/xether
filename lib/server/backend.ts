import { NextResponse } from 'next/server'
import { safeRelativeRedirect } from '@/lib/security/redirect'

export function redirectToLoginWithError(req: Request, message: string) {
  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('error', message)
  return NextResponse.redirect(loginUrl)
}

export function getAppRedirect(req: Request, next?: string | null) {
  const requestUrl = new URL(req.url)
  const appBase = new URL(process.env.NEXT_PUBLIC_APP_URL || '/', requestUrl)
  const safeNext = next ? safeRelativeRedirect(next, '') : ''
  return safeNext ? new URL(safeNext, appBase) : new URL('/', appBase)
}

export function getBackendBaseUrl() {
  return process.env.XETHER_BACKEND_API_BASE_URL || process.env.BACKEND_API_BASE_URL || ''
}

export function getBackendPath(key: string, fallback: string) {
  const envKey = `XETHER_${key}_PATH`
  const value = process.env[envKey]
  return value && value.trim().length > 0 ? value : fallback
}

export async function proxyJson(req: Request, upstreamPath: string) {
  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return NextResponse.json({ error: 'Backend not configured. Set XETHER_BACKEND_API_BASE_URL.' }, { status: 501 })
  }
  const url = new URL(upstreamPath, baseUrl)
  const body = await req.json().catch(() => undefined)
  const upstreamRes = await fetch(url, {
    method: req.method,
    headers: {
      'content-type': 'application/json',
      ...(process.env.XETHER_BACKEND_API_KEY ? { authorization: `Bearer ${process.env.XETHER_BACKEND_API_KEY}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  })
  const contentType = upstreamRes.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await upstreamRes.json().catch(() => null)
    : await upstreamRes.text().catch(() => null)
  return NextResponse.json(data ?? {}, { status: upstreamRes.status })
}
