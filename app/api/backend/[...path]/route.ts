import { NextResponse } from 'next/server'
import { getBackendBaseUrl } from '@/lib/server/backend'
import { getAccessToken } from '@/lib/server/session'

async function handleProxy(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return NextResponse.json(
      { error: { message: 'Backend not configured. Set XETHER_BACKEND_API_BASE_URL.', code: 'BACKEND_UNCONFIGURED' } },
      { status: 501 },
    )
  }

  const { path = [] } = await context.params
  if (path.some((segment) => !segment || segment === '.' || segment === '..' || segment.includes('\\'))) {
    return NextResponse.json({ error: { message: 'Invalid backend path', code: 'INVALID_PATH' } }, { status: 400 })
  }
  const joinedPath = path.map((segment) => encodeURIComponent(segment)).join('/')
  const isPublicHealth = joinedPath === 'health'
  const token = await getAccessToken()
  if (!isPublicHealth && !token) {
    return NextResponse.json({ error: { message: 'Not authenticated', code: 'UNAUTHORIZED' } }, { status: 401 })
  }

  const normalizedBase = baseUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '')
  const targetUrl = new URL(`${normalizedBase}/${joinedPath}${new URL(req.url).search}`)
  const contentType = req.headers.get('content-type')
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'

  const upstreamRes = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...(contentType ? { 'content-type': contentType } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: hasBody ? await req.arrayBuffer() : undefined,
    cache: 'no-store',
  })

  const headers = new Headers()
  const upstreamType = upstreamRes.headers.get('content-type')
  if (upstreamType) headers.set('content-type', upstreamType)
  const body = upstreamRes.status === 204 || upstreamRes.status === 304
    ? null
    : await upstreamRes.arrayBuffer()
  return new Response(body, { status: upstreamRes.status, statusText: upstreamRes.statusText, headers })
}

export const GET = handleProxy
export const POST = handleProxy
export const PUT = handleProxy
export const PATCH = handleProxy
export const DELETE = handleProxy
