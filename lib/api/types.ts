export type ContactFormPayload = {
  name: string
  email: string
  company?: string
  message: string
}

export type DemoRequestPayload = {
  name: string
  email: string
  company?: string
  role?: string
  teamSize?: string
  notes?: string
}

export type EmailCapturePayload = {
  email: string
}

export type AuthLoginPayload = {
  email: string
  password: string
}

export type AuthRegisterPayload = {
  full_name?: string
  username?: string
  email: string
  password: string
  phone_number?: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type LogoutPayload = Record<string, never>

export type ApiOk = { ok: true }

