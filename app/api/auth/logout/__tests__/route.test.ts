import { describe, expect, it } from 'vitest'
import { GET } from '@/app/api/auth/logout/route'

describe('GET /api/auth/logout', () => {
  it('allows relative redirect paths', async () => {
    const req = new Request('http://localhost:3000/api/auth/logout?redirect=/login')
    const res = await GET(req)
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost:3000/login')
  })

  it('blocks external/protocol-relative open redirects', async () => {
    const req = new Request('http://localhost:3000/api/auth/logout?redirect=//evil.com')
    const res = await GET(req)
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost:3000/')
  })
})
