import { describe, expect, it, vi, afterEach } from 'vitest'
import { apiFetch } from '@/lib/api/fetcher'
import { ApiError } from '@/lib/api/errors'

describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses JSON response when content-type is application/json', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      }),
    )

    const result = await apiFetch<{ ok: boolean }>('/api/health')
    expect(result).toEqual({ ok: true })
  })

  it('throws ApiError with backend error message on non-ok JSON response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }),
    )

    await expect(apiFetch('/api/auth/login', { method: 'POST', body: {} })).rejects.toThrowError(
      new ApiError('Invalid credentials', 401),
    )
  })
})
