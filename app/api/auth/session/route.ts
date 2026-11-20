import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/server/session'

export async function GET() {
  const authenticated = await isAuthenticated()
  return NextResponse.json({ authenticated }, { status: 200 })
}
