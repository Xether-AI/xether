import { NextResponse } from "next/server";

import { LOCALE_COOKIE, isValidLocale } from "@/i18n/config";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const locale =
    payload && typeof payload === "object" && "locale" in payload
      ? (payload as { locale?: unknown }).locale
      : undefined;

  if (typeof locale !== "string" || !isValidLocale(locale)) {
    return NextResponse.json(
      { error: "Unsupported locale" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true, locale });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
