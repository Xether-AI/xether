import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import {
  LOCALE_COOKIE,
  isValidLocale,
  resolveLocaleFromAcceptLanguage,
  type Locale,
} from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;

  let locale: Locale;
  if (isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headerStore = await headers();
    locale = resolveLocaleFromAcceptLanguage(headerStore.get("accept-language"));
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
