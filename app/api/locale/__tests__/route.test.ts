import { describe, expect, it } from "vitest";

import { LOCALE_COOKIE } from "@/i18n/config";
import { POST } from "@/app/api/locale/route";

describe("POST /api/locale", () => {
  it("sets locale cookie for supported locales", async () => {
    for (const locale of ["fr", "es", "en"] as const) {
      const request = new Request("http://localhost/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      const response = await POST(request);
      expect(response.status).toBe(200);
      await expect(response.json()).resolves.toEqual({ ok: true, locale });

      const setCookie = response.headers.get("set-cookie");
      expect(setCookie).toContain(`${LOCALE_COOKIE}=${locale}`);
    }
  });

  it("rejects unsupported locales with 400", async () => {
    const request = new Request("http://localhost/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: "de" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Unsupported locale",
    });
  });
});
