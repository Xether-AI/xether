export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "XETHER_LOCALE";

export const LOCALE_META: Record<
  Locale,
  { code: string; label: string; nativeLabel: string }
> = {
  en: { code: "EN", label: "English", nativeLabel: "English" },
  fr: { code: "FR", label: "French", nativeLabel: "Français" },
  es: { code: "ES", label: "Spanish", nativeLabel: "Español" },
};

export function isValidLocale(value?: string | null): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function resolveLocaleFromAcceptLanguage(
  acceptLanguage?: string | null,
): Locale {
  if (!acceptLanguage) return defaultLocale;

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const lang = rawTag?.trim().toLowerCase().split("-")[0] ?? "";
      let q = 1;
      for (const param of params) {
        const [k, v] = param.trim().split("=");
        if (k === "q" && v) {
          const parsed = Number.parseFloat(v);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { lang, q };
    })
    .filter((entry) => entry.lang.length > 0 && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const candidate of candidates) {
    if (isValidLocale(candidate.lang)) {
      return candidate.lang;
    }
  }

  return defaultLocale;
}
