"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronUp, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { LOCALE_META, locales, type Locale } from "@/i18n/config";

function LocaleFlag({ locale }: { locale: Locale }) {
  if (locale === "fr") {
    return (
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        aria-hidden="true"
        className="shrink-0 rounded-[3px] ring-1 ring-slate-900/10"
      >
        <rect x="0" y="0" width="6" height="13" fill="#002395" />
        <rect x="6" y="0" width="6" height="13" fill="#FFFFFF" />
        <rect x="12" y="0" width="6" height="13" fill="#ED2939" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        aria-hidden="true"
        className="shrink-0 rounded-[3px] ring-1 ring-slate-900/10"
      >
        <rect x="0" y="0" width="18" height="3.25" fill="#AA151B" />
        <rect x="0" y="3.25" width="18" height="6.5" fill="#F1BF00" />
        <rect x="0" y="9.75" width="18" height="3.25" fill="#AA151B" />
        <rect x="4" y="4.5" width="2.4" height="3.6" rx="0.6" fill="#AD1519" />
        <circle cx="5.2" cy="6.1" r="0.6" fill="#F1BF00" />
      </svg>
    );
  }

  // English (United States)
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 18 13"
      aria-hidden="true"
      className="shrink-0 rounded-[3px] ring-1 ring-slate-900/10"
    >
      <rect width="18" height="13" fill="#FFFFFF" />
      <rect y="0" width="18" height="1.86" fill="#B22234" />
      <rect y="3.71" width="18" height="1.86" fill="#B22234" />
      <rect y="7.43" width="18" height="1.86" fill="#B22234" />
      <rect y="11.14" width="18" height="1.86" fill="#B22234" />
      <rect width="8.2" height="7" fill="#1E3A8A" />
      <circle cx="2" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="4.1" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="6.2" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="3" cy="3.5" r="0.5" fill="#FFFFFF" />
      <circle cx="5.2" cy="3.5" r="0.5" fill="#FFFFFF" />
      <circle cx="2" cy="5" r="0.5" fill="#FFFFFF" />
      <circle cx="4.1" cy="5" r="0.5" fill="#FFFFFF" />
      <circle cx="6.2" cy="5" r="0.5" fill="#FFFFFF" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Footer");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LOCALE_META[locale] ?? LOCALE_META.en;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = async (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale === locale) return;

    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: nextLocale }),
      });

      if (response.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch {
      // Keep current locale cleanly if network request fails
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        data-testid="language-switcher"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("languageSwitcherLabel")}
        disabled={isPending}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-primary/40 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-60 transition-all cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
        <LocaleFlag locale={locale} />
        <span>{current.nativeLabel}</span>
        <ChevronUp
          className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("selectLanguage")}
          className="absolute bottom-full right-0 mb-2 w-44 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1.5 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.16)] z-50"
        >
          <p className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {t("selectLanguage")}
          </p>
          {locales.map((code) => {
            const meta = LOCALE_META[code];
            const isSelected = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-800 font-semibold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <LocaleFlag locale={code} />
                  <span>{meta.nativeLabel}</span>
                </span>
                {isSelected && (
                  <Check
                    className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
