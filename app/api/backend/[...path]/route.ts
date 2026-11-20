import { NextResponse } from 'next/server'
import { getBackendBaseUrl } from '@/lib/server/backend'
import { getAccessToken } from '@/lib/server/session'

async function handleProxy(
  req: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return NextResponse.json(
      { error: { message: 'Backend not configured. Set XETHER_BACKEND_API_BASE_URL.', code: 'BACKEND_UNCONFIGURED' } },
      { status: 501 },
    )
  }

  const { path } = await context.params
  const joinedPath = path.join('/')
  const isPublicHealth = joinedPath === 'health'

  const token = await getAccessToken()
  if (!isPublicHealth && !token) {
    return NextResponse.json(
      { error: { message: 'Not authenticated', code: 'UNAUTHORIZED' } },
      { status: 401 },
    )
  }

  const reqUrl = new URL(req.url)
  const normalizedBase = baseUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '')
  const targetUrl = new URL(`${normalizedBase}/${joinedPath}${reqUrl.search}`)

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  const body = hasBody ? await req.text().catch(() => undefined) : undefined

  const upstreamRes = await fetch(targetUrl, {
    method: req.method,
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body || undefined,
    cache: 'no-store',
  })

  const contentType = upstreamRes.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await upstreamRes.json().catch(() => null)
    : await upstreamRes.text().catch(() => null)

  return NextResponse.json(data ?? {}, { status: upstreamRes.status })
}

export const GET = handleProxy
export const POST = handleProxy
export const PUT = handleProxy
export const PATCH = handleProxy
export const DELETE = handleProxy
