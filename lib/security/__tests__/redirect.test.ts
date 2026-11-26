import { describe, expect, it } from 'vitest'
import { safeRelativeRedirect } from '@/lib/security/redirect'

describe('safeRelativeRedirect', () => {
  it('accepts same-origin relative paths and preserves query/hash', () => {
    expect(safeRelativeRedirect('/dashboard?tab=data#recent')).toBe('/dashboard?tab=data#recent')
  })

  it.each(['https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)', '\n/login'])('falls back for unsafe redirect %s', (value) => {
    expect(safeRelativeRedirect(value, '/')).toBe('/')
  })
})
