"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronUp, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { LOCALE_META, locales, type Locale } from "@/i18n/config";

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
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs hover:border-primary/40 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-60 transition-all cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
        <span className="font-mono text-[11px] font-semibold text-slate-900">
          {current.code}
        </span>
        <span className="text-slate-400" aria-hidden="true">
          ·
        </span>
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
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                      isSelected
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {meta.code}
                  </span>
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
