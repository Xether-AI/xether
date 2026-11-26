import { safeRelativeRedirect } from '@/lib/security/redirect'

import { apiFetch } from '@/lib/api/fetcher'
import type {
  ApiOk,
  AuthLoginPayload,
  AuthRegisterPayload,
  ContactFormPayload,
  DemoRequestPayload,
  EmailCapturePayload,
  ForgotPasswordPayload,
} from '@/lib/api/types'

export const api = {
  submitContactForm(payload: ContactFormPayload) {
    return apiFetch<ApiOk>('/api/forms/contact', { method: 'POST', body: payload })
  },
  submitDemoRequest(payload: DemoRequestPayload) {
    return apiFetch<ApiOk>('/api/forms/demo', { method: 'POST', body: payload })
  },
  submitEmailCapture(payload: EmailCapturePayload) {
    return apiFetch<ApiOk>('/api/forms/cta', { method: 'POST', body: payload })
  },
  login(payload: AuthLoginPayload) {
    return apiFetch<ApiOk>('/api/auth/login', { method: 'POST', body: payload })
  },
  register(payload: AuthRegisterPayload) {
    return apiFetch<ApiOk>('/api/auth/register', { method: 'POST', body: payload })
  },
  forgotPassword(payload: ForgotPasswordPayload) {
    return apiFetch<ApiOk>('/api/auth/forgot-password', { method: 'POST', body: payload })
  },
  logout() {
    return apiFetch<ApiOk>('/api/auth/logout', { method: 'POST' })
  },
}

export { safeRelativeRedirect }
