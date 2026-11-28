import { createTranslator } from "next-intl";
import { describe, expect, it } from "vitest";

import {
  LOCALE_META,
  defaultLocale,
  isValidLocale,
  locales,
  resolveLocaleFromAcceptLanguage,
} from "@/i18n/config";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import esMessages from "@/messages/es.json";

function collectLeafKeyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectLeafKeyPaths(item, `${prefix}[${index}]`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      collectLeafKeyPaths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

function collectLeafStrings(
  value: unknown,
  prefix = "",
): Array<{ path: string; text: string }> {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectLeafStrings(item, `${prefix}[${index}]`),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      collectLeafStrings(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  if (typeof value === "string") {
    return [{ path: prefix, text: value }];
  }
  return [];
}

describe("i18n locale config", () => {
  it("supports English, French, and Spanish", () => {
    expect(locales).toEqual(["en", "fr", "es"]);
    expect(defaultLocale).toBe("en");
    expect(Object.keys(LOCALE_META)).toEqual(["en", "fr", "es"]);
  });

  it("validates supported locales strictly", () => {
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("fr")).toBe(true);
    expect(isValidLocale("es")).toBe(true);
    expect(isValidLocale("de")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale(null)).toBe(false);
    expect(isValidLocale(undefined)).toBe(false);
  });

  it("resolves preferred supported locale from Accept-Language headers", () => {
    expect(resolveLocaleFromAcceptLanguage("fr-FR,fr;q=0.9,en;q=0.8")).toBe(
      "fr",
    );
    expect(resolveLocaleFromAcceptLanguage("es-MX,es;q=0.9")).toBe("es");
    expect(resolveLocaleFromAcceptLanguage("en;q=0.5,fr;q=0.9")).toBe("fr");
    expect(resolveLocaleFromAcceptLanguage("de-DE,de;q=0.9")).toBe("en");
    expect(resolveLocaleFromAcceptLanguage(null)).toBe("en");
    expect(resolveLocaleFromAcceptLanguage("")).toBe("en");
  });

  it("keeps identical translation key parity across en, fr, and es", () => {
    const enKeys = collectLeafKeyPaths(enMessages).sort();
    const frKeys = collectLeafKeyPaths(frMessages).sort();
    const esKeys = collectLeafKeyPaths(esMessages).sort();

    expect(frKeys).toEqual(enKeys);
    expect(esKeys).toEqual(enKeys);
  });

  it("compiles every message string with next-intl ICU parser without errors", () => {
    const bundles = [
      ["en", enMessages],
      ["fr", frMessages],
      ["es", esMessages],
    ] as const;

    for (const [locale, messages] of bundles) {
      for (const { path, text } of collectLeafStrings(messages)) {
        const translator = createTranslator({
          locale,
          messages: { msg: text },
          onError(error) {
            throw new Error(`Invalid ICU syntax at ${locale}:${path}: ${error.message}`);
          },
        });
        expect(typeof translator("msg")).toBe("string");
      }
    }
  });
});
