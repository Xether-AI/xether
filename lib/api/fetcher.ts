import { ApiError } from '@/lib/api/errors'

type ApiFetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

export async function apiFetch<T>(input: RequestInfo | URL, init?: ApiFetchOptions): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
  })

  const contentType = res.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json') ? await res.json().catch(() => null) : await res.text().catch(() => null)

  if (!res.ok) {
    const errorRecord = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : null
    const message =
      errorRecord && 'error' in errorRecord && errorRecord.error
        ? String(errorRecord.error)
        : `Request failed (${res.status})`
    throw new ApiError(message, res.status, data)
  }

  return data as T
}

