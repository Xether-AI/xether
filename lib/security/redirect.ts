export function safeRelativeRedirect(candidate: string | null | undefined, fallback = '/'): string {
  if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//') || candidate.includes('\\') || /[\u0000-\u001f\u007f]/.test(candidate)) {
    return fallback
  }
  try {
    const parsed = new URL(candidate, 'https://redirect.invalid')
    if (parsed.origin !== 'https://redirect.invalid') return fallback
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  } catch {
    return fallback
  }
}
